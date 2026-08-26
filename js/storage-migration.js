(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StorageMigration = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CURRENT_SCHEMA_VERSION = 12;
  const B_RECORD_RE = /^rec:B_([1-6])_(\d{4}-\d{2}-\d{2})$/;
  const B_PR_RE = /^pr:B_([1-6])$/;

  function clone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  function isBExerciseKey(key) {
    return /^rec:B_\d+_\d{4}-\d{2}-\d{2}$/.test(key) || /^pr:B_\d+$/.test(key);
  }

  function getV10Target(key) {
    let match = key.match(B_RECORD_RE);
    if (match) return `rec:B_${Number(match[1]) + 1}_${match[2]}`;
    match = key.match(B_PR_RE);
    if (match) return `pr:B_${Number(match[1]) + 1}`;
    return null;
  }

  /*
   * Pure v9 -> v10 conversion. Exercise-indexed storage is currently limited
   * to rec:<routine>_<index>_<date> and pr:<routine>_<index>.
   * TODO: replace array indexes with permanent exercise IDs (lat_pulldown,
   * shoulder_press, dumbbell_row, lateral_raise, crunch, side_plank,
   * leg_extension) so routine reordering never changes record identity.
   */
  function transformV9ToV10(source) {
    const original = clone(source || {});
    const result = clone(original);
    const moves = Object.keys(original)
      .map((from) => ({ from, to: getV10Target(from), value: clone(original[from]) }))
      .filter((move) => move.to);
    const sourceKeys = new Set(moves.map((move) => move.from));
    const moveTargets = new Set(moves.map((move) => move.to));
    const conflicts = moves
      .filter(
        (move) =>
          Object.prototype.hasOwnProperty.call(original, move.to) &&
          !sourceKeys.has(move.to),
      )
      .map((move) => ({
        from: move.from,
        to: move.to,
        sourceValue: clone(move.value),
        targetValue: clone(original[move.to]),
      }));
    Object.keys(original)
      .filter(
        (key) =>
          (/^rec:B_7_\d{4}-\d{2}-\d{2}$/.test(key) || key === 'pr:B_7') &&
          !moveTargets.has(key),
      )
      .forEach((key) => {
        conflicts.push({
          from: null,
          to: key,
          sourceValue: null,
          targetValue: clone(original[key]),
          reason: 'v9 data cannot contain a B_7 key',
        });
      });

    if (conflicts.length) {
      return { ok: false, original, result: original, moves, conflicts };
    }

    moves.forEach((move) => delete result[move.from]);
    moves.forEach((move) => {
      result[move.to] = clone(move.value);
    });
    return { ok: true, original, result, moves, conflicts: [] };
  }

  /*
   * v11 -> v12: B routine drops 크런치 (old index 5) and 사이드 플랭크 (old
   * index 6) — the two exercises stay removed from the live routine, but
   * their history is never deleted, only moved off the live rec:/pr: index
   * space so it can't be misread as belonging to whichever exercise now
   * occupies that index. 레그 익스텐션 (old 7) and 팔로프프레스 (old 8) shift
   * down by two so their history/PRs keep tracking the same exercise.
   */
  const B_V12_KEEP_MAX = 4;
  const B_V12_ARCHIVE_TAG = { 5: 'crunch', 6: 'sideplank' };
  const B_V12_SHIFT_FROM = 7;

  function bV12TargetForIdx(idx) {
    if (idx <= B_V12_KEEP_MAX) return { kind: 'keep' };
    if (Object.prototype.hasOwnProperty.call(B_V12_ARCHIVE_TAG, idx))
      return { kind: 'archive', tag: B_V12_ARCHIVE_TAG[idx] };
    return { kind: 'shift', newIdx: idx - (B_V12_SHIFT_FROM - 5) };
  }

  function transformV11ToV12(source) {
    const original = clone(source || {});
    const result = clone(original);
    const moves = [];
    const KEY_KINDS = [
      { re: /^rec:B_(\d+)_(\d{4}-\d{2}-\d{2})$/, archive: (tag, m) => `archivedRec:B_${tag}_${m[2]}`, shift: (newIdx, m) => `rec:B_${newIdx}_${m[2]}` },
      { re: /^pr:B_(\d+)$/, archive: (tag) => `archivedPr:B_${tag}`, shift: (newIdx) => `pr:B_${newIdx}` },
      { re: /^prExerciseId:B_(\d+)$/, archive: (tag) => `archivedPrExerciseId:B_${tag}`, shift: (newIdx) => `prExerciseId:B_${newIdx}` },
    ];
    Object.keys(original).forEach((key) => {
      for (const { re, archive, shift } of KEY_KINDS) {
        const m = key.match(re);
        if (!m) continue;
        const idx = Number(m[1]);
        const target = bV12TargetForIdx(idx);
        if (target.kind === 'keep') return;
        const to = target.kind === 'archive' ? archive(target.tag, m) : shift(target.newIdx, m);
        moves.push({ from: key, to, value: clone(original[key]) });
        return;
      }
    });

    const wKey = 'weightOverrides:B';
    let overridesMove = null;
    if (Object.prototype.hasOwnProperty.call(original, wKey)) {
      const oldOverrides = original[wKey] || {};
      const nextOverrides = {};
      Object.keys(oldOverrides).forEach((idxStr) => {
        const target = bV12TargetForIdx(Number(idxStr));
        if (target.kind === 'keep') nextOverrides[idxStr] = oldOverrides[idxStr];
        else if (target.kind === 'shift') nextOverrides[String(target.newIdx)] = oldOverrides[idxStr];
        // archived (old crunch/side-plank) overrides are a default-weight
        // preference, not workout history — they are dropped, not moved.
      });
      overridesMove = { key: wKey, value: nextOverrides };
    }

    const moveSources = new Set(moves.map((mv) => mv.from));
    const conflicts = moves
      .filter((mv) => Object.prototype.hasOwnProperty.call(original, mv.to) && !moveSources.has(mv.to))
      .map((mv) => ({ from: mv.from, to: mv.to, sourceValue: clone(mv.value), targetValue: clone(original[mv.to]) }));

    if (conflicts.length) {
      return { ok: false, original, result: original, moves, conflicts };
    }

    moves.forEach((move) => delete result[move.from]);
    moves.forEach((move) => {
      result[move.to] = clone(move.value);
    });
    if (overridesMove) result[overridesMove.key] = overridesMove.value;
    return { ok: true, original, result, moves, conflicts: [] };
  }

  function classifyStorage(source) {
    const snapshot = source || {};
    const version = Number(snapshot.storageSchemaVersion) || null;
    const bKeys = Object.keys(snapshot).filter(isBExerciseKey);
    const hasMigrationBackup = Object.prototype.hasOwnProperty.call(
      snapshot,
      'migrationBackup:v10',
    );

    if (version === CURRENT_SCHEMA_VERSION) {
      return { type: 'current', version, bKeys };
    }
    if (version === 10) return { type: 'v10', version, bKeys };
    if (version === 9) return { type: 'v9', version, bKeys };
    if (
      !version &&
      snapshot['migrationBackup:v10']?.sourceSchemaVersion === 9
    ) {
      return { type: 'v9', version: 9, bKeys };
    }
    // The previously deployed v10 flag prevents a second shift, but it does
    // not prove the first migration was correct.
    if (!version && snapshot.migrV10 === true) {
      return { type: 'legacy-migration-detected', version, bKeys };
    }
    if (!version && bKeys.length === 0 && !hasMigrationBackup) {
      return { type: 'fresh', version: null, bKeys };
    }
    return { type: 'ambiguous', version, bKeys };
  }

  function buildHoldStatus(classification, keys, detectedAt) {
    const legacy = classification.type === 'legacy-migration-detected';
    return {
      status: legacy ? 'completed-unverified' : 'pending',
      reason: legacy
        ? 'legacy migrV10 flag found without an explicit schema version'
        : 'B routine data exists without an explicit schema version',
      detectedAt,
      keys: [...keys],
    };
  }


  function isProtectedBackupKey(key) {
    return key.startsWith('migrationBackup:') || key.startsWith('importBackup:') || key.startsWith('autoBackup:');
  }
  function isIdentityDataKey(key) {
    return (
      key.startsWith('rec:') ||
      key.startsWith('pr:') ||
      key.startsWith('prExerciseId:') ||
      key.startsWith('done:') ||
      key.startsWith('corr:') ||
      key.startsWith('readiness:') ||
      key.startsWith('session:') ||
      key.startsWith('sessionRevision:') ||
      key === 'wh' ||
      key === 'swimLogs' ||
      key === 'streak'
    );
  }

  function convertBackupPayload(payload) {
    if (!payload || !payload.data || typeof payload.data !== 'object')
      throw new Error('invalid backup payload');
    const startVersion = payload.schemaVersion;
    if (startVersion === CURRENT_SCHEMA_VERSION) return clone(payload.data);
    if (![9, 10, 11].includes(startVersion))
      throw new Error(`unsupported backup schema version: ${startVersion}`);

    let data = clone(payload.data);
    if (startVersion === 9) {
      const converted = transformV9ToV10(data);
      if (!converted.ok) {
        const error = new Error('version 9 backup has conflicting B routine keys');
        error.conflicts = converted.conflicts;
        throw error;
      }
      data = converted.result;
      data.migrV10 = true;
    }
    // v10 -> v11 never renamed identity keys, so v9/v10 backups fall
    // straight through to the v11 -> v12 B-routine reindex below.
    const converted12 = transformV11ToV12(data);
    if (!converted12.ok) {
      const error = new Error('backup has conflicting B routine keys');
      error.conflicts = converted12.conflicts;
      throw error;
    }
    data = converted12.result;
    data.storageSchemaVersion = CURRENT_SCHEMA_VERSION;
    return data;
  }


  function reconcileStorageSnapshots(localSource, remoteSource) {
    const local = clone(localSource || {});
    const remote = clone(remoteSource || {});
    const merged = { ...remote, ...local };
    const localWrites = {};
    const remoteWrites = {};
    Object.keys(merged).forEach((key) => {
      if (JSON.stringify(local[key]) !== JSON.stringify(merged[key]))
        localWrites[key] = clone(merged[key]);
      if (JSON.stringify(remote[key]) !== JSON.stringify(merged[key]))
        remoteWrites[key] = clone(merged[key]);
    });
    return { merged, localWrites, remoteWrites, authority: 'localStorage' };
  }
  async function commitSnapshot(adapter, before, after, finalKeys) {
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
    let changed = keys.filter(
      (key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]),
    );
    const last = new Set(finalKeys || []);
    changed = [
      ...changed.filter((key) => !last.has(key)),
      ...changed.filter((key) => last.has(key)),
    ];
    try {
      for (const key of changed) {
        if (Object.prototype.hasOwnProperty.call(after, key))
          await adapter.set(key, clone(after[key]));
        else await adapter.delete(key);
      }
    } catch (error) {
      try {
        for (const key of [...changed].reverse()) {
          if (Object.prototype.hasOwnProperty.call(before, key))
            await adapter.set(key, clone(before[key]));
          else await adapter.delete(key);
        }
      } catch (rollbackError) {
        error.rollbackError = rollbackError;
      }
      throw error;
    }
    return changed;
  }

  return {
    CURRENT_SCHEMA_VERSION,
    buildHoldStatus,
    classifyStorage,
    commitSnapshot,
    convertBackupPayload,
    getV10Target,
    isBExerciseKey,
    isIdentityDataKey,
    transformV11ToV12,
    isProtectedBackupKey,
    reconcileStorageSnapshots,
    transformV9ToV10,
  };
});
