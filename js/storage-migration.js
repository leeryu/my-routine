(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StorageMigration = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const CURRENT_SCHEMA_VERSION = 10;
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

  function isIdentityDataKey(key) {
    return (
      key.startsWith('rec:') ||
      key.startsWith('pr:') ||
      key.startsWith('done:') ||
      key.startsWith('corr:') ||
      key.startsWith('readiness:') ||
      key === 'wh' ||
      key === 'swimLogs' ||
      key === 'streak'
    );
  }

  function convertBackupPayload(payload) {
    if (!payload || !payload.data || typeof payload.data !== 'object')
      throw new Error('invalid backup payload');
    if (payload.schemaVersion === CURRENT_SCHEMA_VERSION) return clone(payload.data);
    if (payload.schemaVersion !== 9)
      throw new Error(`unsupported backup schema version: ${payload.schemaVersion}`);
    const converted = transformV9ToV10(payload.data);
    if (!converted.ok) {
      const error = new Error('version 9 backup has conflicting B routine keys');
      error.conflicts = converted.conflicts;
      throw error;
    }
    converted.result.storageSchemaVersion = CURRENT_SCHEMA_VERSION;
    converted.result.migrV10 = true;
    return converted.result;
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
        for (const key of changed) {
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
    transformV9ToV10,
  };
});
