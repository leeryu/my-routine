'use strict';

const assert = require('assert');
const migration = require('../js/storage-migration.js');

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

test('new install is classified as fresh', () => {
  assert.equal(migration.classifyStorage({}).type, 'fresh');
});

test('version 9 records and PRs move one index and leave B_1 empty', () => {
  const input = {
    storageSchemaVersion: 9,
    'rec:B_1_2026-07-10': { name: 'shoulder' },
    'rec:B_2_2026-07-10': { name: 'row' },
    'pr:B_1': 20,
    'pr:B_2': 30,
  };
  const output = migration.transformV9ToV10(input);
  assert.equal(output.ok, true);
  assert.deepEqual(output.result['rec:B_2_2026-07-10'], { name: 'shoulder' });
  assert.deepEqual(output.result['rec:B_3_2026-07-10'], { name: 'row' });
  assert.equal(output.result['pr:B_2'], 20);
  assert.equal(output.result['pr:B_3'], 30);
  assert.equal(output.result['rec:B_1_2026-07-10'], undefined);
  assert.equal(output.result['pr:B_1'], undefined);
});

test('version 10 data is selected for metadata-only v11 migration', () => {
  const input = {
    storageSchemaVersion: 10,
    'rec:B_1_2026-07-23': { name: 'lat pulldown' },
  };
  assert.equal(migration.classifyStorage(input).type, 'v10');
  assert.deepEqual(input['rec:B_1_2026-07-23'], { name: 'lat pulldown' });
});

test('legacy migrV10 data is held as completed-unverified without moving records', () => {
  const input = { migrV10: true };
  for (let index = 1; index <= 7; index++)
    input[`rec:B_${index}_2026-07-23`] = { index };
  const classification = migration.classifyStorage(input);
  assert.equal(classification.type, 'legacy-migration-detected');
  const status = migration.buildHoldStatus(
    classification,
    classification.bKeys,
    '2026-07-23T00:00:00.000Z',
  );
  const result = JSON.parse(JSON.stringify(input));
  result['migrationStatus:v10'] = status;
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(result).filter(([key]) => key.startsWith('rec:B_')),
    ),
    Object.fromEntries(
      Object.entries(input).filter(([key]) => key.startsWith('rec:B_')),
    ),
  );
  assert.equal(result.storageSchemaVersion, undefined);
  assert.equal(status.status, 'completed-unverified');
});

test('record target collision preserves both original values', () => {
  const input = {
    storageSchemaVersion: 9,
    'rec:B_6_2026-07-23': { name: 'old leg extension' },
    'rec:B_7_2026-07-23': { name: 'new leg extension' },
  };
  const output = migration.transformV9ToV10(input);
  assert.equal(output.ok, false);
  assert.deepEqual(output.result, input);
  assert.equal(output.conflicts[0].from, 'rec:B_6_2026-07-23');
  assert.equal(output.conflicts[0].to, 'rec:B_7_2026-07-23');
});

test('PR chain moves without Math.max merging', () => {
  const output = migration.transformV9ToV10({
    storageSchemaVersion: 9,
    'pr:B_1': 40,
    'pr:B_2': 20,
  });
  assert.equal(output.ok, true);
  assert.equal(output.result['pr:B_2'], 40);
  assert.equal(output.result['pr:B_3'], 20);
});

test('PR target collision blocks conversion and preserves originals', () => {
  const input = { storageSchemaVersion: 9, 'pr:B_6': 40, 'pr:B_7': 20 };
  const output = migration.transformV9ToV10(input);
  assert.equal(output.ok, false);
  assert.deepEqual(output.result, input);
  assert.equal(output.conflicts[0].sourceValue, 40);
  assert.equal(output.conflicts[0].targetValue, 20);
});

test('ambiguous unversioned B data is held for review', () => {
  assert.equal(
    migration.classifyStorage({ 'rec:B_1_2026-07-23': {} }).type,
    'ambiguous',
  );
});

test('an existing migration backup can explicitly identify schema 9', () => {
  assert.equal(
    migration.classifyStorage({
      'migrationBackup:v10': { sourceSchemaVersion: 9, keys: {} },
      'rec:B_1_2026-07-10': {},
    }).type,
    'v9',
  );
});

test('an orphan B_7 key makes claimed version 9 data conflict', () => {
  const input = {
    storageSchemaVersion: 9,
    'rec:B_7_2026-07-23': { name: 'new leg extension' },
  };
  const output = migration.transformV9ToV10(input);
  assert.equal(output.ok, false);
  assert.deepEqual(output.result, input);
  assert.match(output.conflicts[0].reason, /cannot contain/);
});

test('version 9 backup conversion ignores the current browser flags', () => {
  const result = migration.convertBackupPayload({
    schemaVersion: 9,
    data: {
      migrV10: false,
      'rec:B_1_2026-07-10': { name: 'shoulder' },
    },
  });
  assert.equal(result.storageSchemaVersion, migration.CURRENT_SCHEMA_VERSION);
  assert.equal(result.migrV10, true);
  assert.deepEqual(result['rec:B_2_2026-07-10'], { name: 'shoulder' });
  assert.equal(result['rec:B_1_2026-07-10'], undefined);
});

test('unknown backup schema version is rejected', () => {
  assert.throws(
    () => migration.convertBackupPayload({ schemaVersion: 8, data: {} }),
    /unsupported backup schema version/,
  );
});

test('import identity keys and simple settings use different conflict policies', () => {
  assert.equal(migration.isIdentityDataKey('rec:B_1_2026-07-23'), true);
  assert.equal(migration.isIdentityDataKey('pr:B_1'), true);
  assert.equal(migration.isIdentityDataKey('session:pilates:2026-07-31'), true);
  assert.equal(migration.isIdentityDataKey('theme'), false);
  assert.equal(migration.isIdentityDataKey('soundOn'), false);
});

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

(async () => {
  await asyncTest('new install commit sets current schema without moving records', async () => {
    const state = {};
    const adapter = {
      async set(key, value) {
        state[key] = value;
      },
      async delete(key) {
        delete state[key];
      },
    };
    await migration.commitSnapshot(
      adapter,
      {},
      { storageSchemaVersion: migration.CURRENT_SCHEMA_VERSION },
      ['storageSchemaVersion'],
    );
    assert.deepEqual(state, { storageSchemaVersion: migration.CURRENT_SCHEMA_VERSION });
  });

  await asyncTest('write failure rolls records and schema back', async () => {
    const state = {
      storageSchemaVersion: 9,
      'rec:B_1_2026-07-10': { name: 'shoulder' },
    };
    const original = JSON.parse(JSON.stringify(state));
    let operations = 0;
    let failed = false;
    const adapter = {
      async set(key, value) {
        operations++;
        if (!failed && operations === 2) {
          failed = true;
          throw new Error('simulated set failure');
        }
        state[key] = value;
      },
      async delete(key) {
        operations++;
        if (!failed && operations === 2) {
          failed = true;
          throw new Error('simulated delete failure');
        }
        delete state[key];
      },
    };
    const after = {
      storageSchemaVersion: 10,
      migrV10: true,
      'rec:B_2_2026-07-10': { name: 'shoulder' },
    };
    await assert.rejects(
      migration.commitSnapshot(adapter, original, after, [
        'storageSchemaVersion',
        'migrV10',
      ]),
    );
    assert.deepEqual(state, original);
  });
})().catch(() => {
  process.exitCode = 1;
});

test('version 10 backup upgrades metadata without changing records', () => {
  const original = { 'rec:A_0_2026-07-31': { kg_0: 35, reps_0: 10 }, 'pr:B_1': 40 };
  const result = migration.convertBackupPayload({ schemaVersion: 10, data: original });
  assert.equal(result.storageSchemaVersion, migration.CURRENT_SCHEMA_VERSION);
  assert.deepEqual(result['rec:A_0_2026-07-31'], original['rec:A_0_2026-07-31']);
  assert.equal(result['pr:B_1'], 40);
});

test('current backup round trip preserves session and legacy records', () => {
  const data = { storageSchemaVersion: migration.CURRENT_SCHEMA_VERSION, 'rec:A_0_2026-07-31': { kg_0: 35 }, 'rec:B_6_2026-07-31': { exerciseId: 'pallof-press', kg_0: 5 }, 'rec:C_0_2026-07-31': { kg_0: 20 }, 'prExerciseId:B_6': 'pallof-press', 'session:pilates:2026-07-31': { minutes: 50 }, 'session:home-core:2026-07-31': { completed: [true] }, clinicalProfile: { version: 1 }, 'migrationStatus:v12': { status: 'completed' }, 'migrationBackup:v12': { sourceSchemaVersion: 11, keys: { storageSchemaVersion: 11 } } };
  assert.deepEqual(migration.convertBackupPayload({ schemaVersion: migration.CURRENT_SCHEMA_VERSION, data }), data);
});

test('v11 -> v12: leg extension and pallof shift down while crunch/side-plank are archived, not deleted', () => {
  const input = {
    storageSchemaVersion: 11,
    'rec:B_5_2026-08-01': { name: 'crunch' },
    'pr:B_5': 0,
    'rec:B_6_2026-08-01': { name: 'side plank' },
    'pr:B_6': 0,
    'rec:B_7_2026-08-01': { name: 'leg extension' },
    'pr:B_7': 15,
    'rec:B_8_2026-08-01': { exerciseId: 'pallof-press', kg_0: 5 },
    'pr:B_8': 5,
    'prExerciseId:B_8': 'pallof-press',
  };
  const output = migration.transformV11ToV12(input);
  assert.equal(output.ok, true);
  // leg extension and pallof keep tracking history under their new indexes
  assert.deepEqual(output.result['rec:B_5_2026-08-01'], { name: 'leg extension' });
  assert.equal(output.result['pr:B_5'], 15);
  assert.deepEqual(output.result['rec:B_6_2026-08-01'], { exerciseId: 'pallof-press', kg_0: 5 });
  assert.equal(output.result['pr:B_6'], 5);
  assert.equal(output.result['prExerciseId:B_6'], 'pallof-press');
  // crunch/side-plank history is preserved, not deleted, but off the live index space
  assert.deepEqual(output.result['archivedRec:B_crunch_2026-08-01'], { name: 'crunch' });
  assert.equal(output.result['archivedPr:B_crunch'], 0);
  assert.deepEqual(output.result['archivedRec:B_sideplank_2026-08-01'], { name: 'side plank' });
  assert.equal(output.result['archivedPr:B_sideplank'], 0);
  // nothing is readable at the old B_7/B_8 keys or the live B_5/B_6 rec:/pr: prefixes for the removed exercises
  assert.equal(output.result['rec:B_7_2026-08-01'], undefined);
  assert.equal(output.result['pr:B_8'], undefined);
  assert.equal(output.result['prExerciseId:B_8'], undefined);
});

test('v11 -> v12: exercises before the removed pair are untouched', () => {
  const output = migration.transformV11ToV12({
    storageSchemaVersion: 11,
    'rec:B_0_2026-08-01': { name: 'chest press' },
    'pr:B_4_2026-08-01': 12,
  });
  assert.equal(output.ok, true);
  assert.deepEqual(output.result['rec:B_0_2026-08-01'], { name: 'chest press' });
  assert.equal(output.result['pr:B_4_2026-08-01'], 12);
});

test('v11 -> v12: weightOverrides:B keeps overrides for shifted exercises and drops removed ones', () => {
  const output = migration.transformV11ToV12({
    storageSchemaVersion: 11,
    'weightOverrides:B': { 0: 10, 5: 0, 6: 0, 7: 20, 8: 2 },
  });
  assert.equal(output.ok, true);
  assert.deepEqual(output.result['weightOverrides:B'], { 0: 10, 5: 20, 6: 2 });
});

test('internal recovery backups are protected from overwrite on import', () => {
  assert.equal(migration.isProtectedBackupKey('migrationBackup:v11'), true);
  assert.equal(migration.isProtectedBackupKey('importBackup:now'), true);
  assert.equal(migration.isProtectedBackupKey('clinicalProfile'), false);
});
