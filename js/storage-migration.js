(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StorageMigration = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CURRENT_SCHEMA_VERSION = 14;
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

  /*
   * v12 -> v13: B루틴이 (덤벨로우, 체스트프레스, 레터럴레이즈, 숄더프레스,
   * 리버스펙덱, 랫풀다운, 레그익스텐션) 순서·구성으로 재편된다. 리버스펙덱은
   * B에 새로 들어오는 종목이라 과거 기록이 없고, 팔로프프레스는 B에서
   * 빠지므로 기존 크런치/사이드플랭크 archive 패턴과 동일하게 기록을
   * 삭제하지 않고 archivedRec:/archivedPr:로 옮겨 보존한다.
   *
   * 같은 개편에서 C루틴(일요일 웨이트)이 주간 스케줄에서 완전히 빠지고
   * 수영으로 대체되므로, C의 모든 rec:/pr:/prExerciseId: 기록도 인덱스와
   * 무관하게 전부 archivedRec:C_.../archivedPr:C_.../archivedPrExerciseId:C_...
   * 로 보존한다(삭제 아님).
   */
  const B_V13_INDEX_MAP = { 0: 1, 1: 5, 2: 3, 3: 0, 4: 2, 5: 6 };
  const B_V13_ARCHIVE_TAG = { 6: 'pallof-press' };

  function bV13TargetForIdx(idx) {
    if (Object.prototype.hasOwnProperty.call(B_V13_ARCHIVE_TAG, idx))
      return { kind: 'archive', tag: B_V13_ARCHIVE_TAG[idx] };
    if (Object.prototype.hasOwnProperty.call(B_V13_INDEX_MAP, idx))
      return { kind: 'shift', newIdx: B_V13_INDEX_MAP[idx] };
    return { kind: 'keep' };
  }

  function transformV12ToV13(source) {
    const original = clone(source || {});
    const result = clone(original);
    const moves = [];
    const KEY_KINDS = [
      { re: /^rec:B_(\d+)_(\d{4}-\d{2}-\d{2})$/, archive: (tag, m) => `archivedRec:B_${tag}_${m[2]}`, shift: (newIdx, m) => `rec:B_${newIdx}_${m[2]}` },
      { re: /^pr:B_(\d+)$/, archive: (tag) => `archivedPr:B_${tag}`, shift: (newIdx) => `pr:B_${newIdx}` },
      { re: /^prExerciseId:B_(\d+)$/, archive: (tag) => `archivedPrExerciseId:B_${tag}`, shift: (newIdx) => `prExerciseId:B_${newIdx}` },
    ];
    const C_KEY_KINDS = [
      { re: /^rec:C_(\d+)_(\d{4}-\d{2}-\d{2})$/, archive: (m) => `archivedRec:C_${m[1]}_${m[2]}` },
      { re: /^pr:C_(\d+)$/, archive: (m) => `archivedPr:C_${m[1]}` },
      { re: /^prExerciseId:C_(\d+)$/, archive: (m) => `archivedPrExerciseId:C_${m[1]}` },
    ];
    Object.keys(original).forEach((key) => {
      for (const { re, archive } of C_KEY_KINDS) {
        const m = key.match(re);
        if (!m) continue;
        moves.push({ from: key, to: archive(m), value: clone(original[key]) });
        return;
      }
      for (const { re, archive, shift } of KEY_KINDS) {
        const m = key.match(re);
        if (!m) continue;
        const idx = Number(m[1]);
        const target = bV13TargetForIdx(idx);
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
        const target = bV13TargetForIdx(Number(idxStr));
        if (target.kind === 'keep') nextOverrides[idxStr] = oldOverrides[idxStr];
        else if (target.kind === 'shift') nextOverrides[String(target.newIdx)] = oldOverrides[idxStr];
        // archived (old 팔로프프레스) override is a default-weight
        // preference, not workout history — it is dropped, not moved.
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

  /* v13 -> v14: 화/목 상체 근비대 루틴으로 재배치한다. 기록에는 영구
     exerciseId를 새겨 이후 루틴 간 같은 종목 이력을 안전하게 공유한다.
     v13에서 보관 처리했던 C루틴 기록은 선택 루틴으로 복원한다. */
  const V14_MAP = {
    A: { 0: [2, 'lat-pulldown'], 1: [1, 'dumbbell-row'], 2: [4, 'reverse-pec-deck'], 3: [3, 'lateral-raise'], 4: [null, 'crunch'], 5: [null, 'side-plank'], 6: [7, 'leg-extension'] },
    B: { 0: [2, 'dumbbell-row'], 1: [0, 'chest-press'], 2: [4, 'lateral-raise'], 3: [3, 'shoulder-press-supported'], 4: [5, 'reverse-pec-deck'], 5: [1, 'lat-pulldown'], 6: [7, 'leg-extension'] },
  };
  const C_V14_IDS = ['chest-press', 'shoulder-press-legacy', 'reverse-pec-deck', 'lateral-raise', 'triceps-pushdown'];

  function transformV13ToV14(source) {
    const original = clone(source || {});
    const result = clone(original);
    const moves = [];
    const archive = (rk, idx, suffix, value, kind) => {
      const tag = V14_MAP[rk][idx][1];
      const prefix = kind === 'rec' ? 'archivedRec' : kind === 'pr' ? 'archivedPr' : 'archivedPrExerciseId';
      return `${prefix}:${rk}_${tag}${suffix || ''}`;
    };
    Object.keys(original).forEach((key) => {
      let m = key.match(/^(rec):([AB])_(\d+)_(\d{4}-\d{2}-\d{2})$/);
      if (!m) m = key.match(/^(pr|prExerciseId):([AB])_(\d+)$/);
      if (m) {
        const kind = m[1], rk = m[2], idx = Number(m[3]);
        const mapped = V14_MAP[rk][idx] || (idx >= 7 ? [idx + 1, original[key]?.exerciseId || null] : null);
        if (!mapped) return;
        const suffix = kind === 'rec' ? `_${m[4]}` : '';
        const to = mapped[0] === null ? archive(rk, idx, suffix, original[key], kind) : `${kind}:${rk}_${mapped[0]}${suffix}`;
        const value = clone(original[key]);
        if (kind === 'rec' && value && mapped[1]) value.exerciseId = mapped[1];
        moves.push({ from: key, to, value });
        return;
      }
      m = key.match(/^archived(Rec|Pr|PrExerciseId):C_(\d+)(?:_(\d{4}-\d{2}-\d{2}))?$/);
      if (m) {
        const kind = m[1] === 'Rec' ? 'rec' : m[1] === 'Pr' ? 'pr' : 'prExerciseId';
        const idx = Number(m[2]);
        const suffix = kind === 'rec' ? `_${m[3]}` : '';
        const value = clone(original[key]);
        if (kind === 'rec' && value && C_V14_IDS[idx]) value.exerciseId = C_V14_IDS[idx];
        moves.push({ from: key, to: `${kind}:C_${idx}${suffix}`, value });
      }
    });

    const moveSources = new Set(moves.map((move) => move.from));
    const conflicts = moves.filter((move) => Object.prototype.hasOwnProperty.call(original, move.to) && !moveSources.has(move.to))
      .map((move) => ({ from: move.from, to: move.to, sourceValue: clone(move.value), targetValue: clone(original[move.to]) }));
    if (conflicts.length) return { ok: false, original, result: original, moves, conflicts };
    moves.forEach((move) => delete result[move.from]);
    moves.forEach((move) => { result[move.to] = clone(move.value); });
    ['A', 'B'].forEach((rk) => {
      const key = `weightOverrides:${rk}`;
      if (!Object.prototype.hasOwnProperty.call(original, key)) return;
      const next = {};
      Object.entries(original[key] || {}).forEach(([idxText, value]) => {
        const idx = Number(idxText);
        const mapped = V14_MAP[rk][idx] || (idx >= 7 ? [idx + 1] : null);
        if (mapped && mapped[0] !== null) next[mapped[0]] = value;
      });
      result[key] = next;
    });
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
      key === 'coreLogs' ||
      key === 'streak' ||
      key === 'dailyLog' ||
      key === 'lowerBodyProgress' ||
      key === 'weeklyRecovery'
    );
  }

  function convertBackupPayload(payload) {
    if (!payload || !payload.data || typeof payload.data !== 'object')
      throw new Error('invalid backup payload');
    const startVersion = payload.schemaVersion;
    if (startVersion === CURRENT_SCHEMA_VERSION) return clone(payload.data);
    if (![9, 10, 11, 12, 13].includes(startVersion))
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
    // straight through to the v11 -> v12 B-routine reindex below. A v12
    // backup is already in that shape, so it skips straight to v12 -> v13.
    if (startVersion < 12) {
      const converted12 = transformV11ToV12(data);
      if (!converted12.ok) {
        const error = new Error('backup has conflicting B routine keys');
        error.conflicts = converted12.conflicts;
        throw error;
      }
      data = converted12.result;
    }
    if (startVersion < 13) {
      const converted13 = transformV12ToV13(data);
      if (!converted13.ok) {
        const error = new Error('backup has conflicting B routine keys');
        error.conflicts = converted13.conflicts;
        throw error;
      }
      data = converted13.result;
    }
    const converted14 = transformV13ToV14(data);
    if (!converted14.ok) {
      const error = new Error('backup has conflicting routine keys');
      error.conflicts = converted14.conflicts;
      throw error;
    }
    data = converted14.result;
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
    transformV12ToV13,
    transformV13ToV14,
  };
});
