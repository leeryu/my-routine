'use strict';
const assert = require('assert');
const migration = require('../js/storage-migration.js');
let passed = 0;
async function test(name, fn) { try { await fn(); passed++; console.log(`ok - ${name}`); } catch (e) { console.error(`not ok - ${name}`); throw e; } }
function mirroredState(initial, failAt = Infinity, rollbackFails = false) {
  const local = JSON.parse(JSON.stringify(initial));
  const remote = JSON.parse(JSON.stringify(initial));
  let writes = 0; let failed = false;
  const adapter = {
    async set(key, value) {
      local[key] = JSON.parse(JSON.stringify(value)); writes++;
      if ((!failed && writes === failAt) || (failed && rollbackFails)) { failed = true; throw new Error('remote set failed'); }
      remote[key] = JSON.parse(JSON.stringify(value));
    },
    async delete(key) {
      delete local[key]; writes++;
      if ((!failed && writes === failAt) || (failed && rollbackFails)) { failed = true; throw new Error('remote delete failed'); }
      delete remote[key];
    },
  };
  return { local, remote, adapter };
}
(async () => {
  await test('scenario A: first mirrored write failure rolls local and remote back', async () => {
    const original = { storageSchemaVersion: 10, 'rec:A_0_2026-07-31': { kg_0: 35 } };
    const state = mirroredState(original, 1);
    await assert.rejects(migration.commitSnapshot(state.adapter, original, { ...original, storageSchemaVersion: 11 }, ['storageSchemaVersion']));
    assert.deepEqual(state.local, original); assert.deepEqual(state.remote, original);
  });
  await test('scenario B: later mirrored write failure rolls every prior key back', async () => {
    const original = { storageSchemaVersion: 10, 'rec:B_1_2026-07-31': { kg_0: 30 } };
    const after = { ...original, clinicalProfile: { version: 1 }, migrationStatus: { status: 'completed' }, storageSchemaVersion: 11 };
    const state = mirroredState(original, 2);
    await assert.rejects(migration.commitSnapshot(state.adapter, original, after, ['migrationStatus','storageSchemaVersion']));
    assert.deepEqual(state.local, original); assert.deepEqual(state.remote, original);
  });
  await test('scenario C: durable pre-migration backup survives body failure and restart keeps v10', async () => {
    const original = { storageSchemaVersion: 10, 'rec:C_0_2026-07-31': { kg_0: 20 } };
    const withBackup = { ...original, 'migrationBackup:v11': { sourceSchemaVersion: 10, keys: original } };
    const state = mirroredState(withBackup, 1);
    await assert.rejects(migration.commitSnapshot(state.adapter, withBackup, { ...withBackup, storageSchemaVersion: 11 }, ['storageSchemaVersion']));
    const restart = migration.reconcileStorageSnapshots(state.local, state.remote);
    assert.equal(restart.merged.storageSchemaVersion, 10);
    assert.deepEqual(restart.merged['migrationBackup:v11'].keys, original);
  });
  await test('scenario D: local v11 is authoritative and repairs remote v10 plan', async () => {
    const result = migration.reconcileStorageSnapshots({ storageSchemaVersion: 11, 'rec:A_0_x': { a: 1 } }, { storageSchemaVersion: 10, 'rec:A_0_x': { a: 2 }, remoteOnly: true });
    assert.equal(result.authority, 'localStorage'); assert.equal(result.merged.storageSchemaVersion, 11);
    assert.equal(result.remoteWrites.storageSchemaVersion, 11); assert.deepEqual(result.merged['rec:A_0_x'], { a: 1 }); assert.equal(result.merged.remoteOnly, true);
  });
  await test('rollback failure is surfaced while the external safety backup remains', async () => {
    const original = { storageSchemaVersion: 10, 'migrationBackup:v11': { sourceSchemaVersion: 10, keys: { storageSchemaVersion: 10 } } };
    const state = mirroredState(original, 1, true);
    let error; try { await migration.commitSnapshot(state.adapter, original, { ...original, storageSchemaVersion: 11 }, ['storageSchemaVersion']); } catch (e) { error = e; }
    assert.ok(error?.rollbackError); assert.deepEqual(original['migrationBackup:v11'].keys, { storageSchemaVersion: 10 });
  });
  await test('reconciliation never nests or rewrites an existing migration backup', async () => {
    const backup = { sourceSchemaVersion: 10, keys: { storageSchemaVersion: 10 } };
    const result = migration.reconcileStorageSnapshots({ storageSchemaVersion: 10, 'migrationBackup:v11': backup }, {});
    assert.deepEqual(result.merged['migrationBackup:v11'], backup);
    assert.equal(Object.prototype.hasOwnProperty.call(result.merged['migrationBackup:v11'].keys, 'migrationBackup:v11'), false);
  });
  console.log(`# ${passed} storage safety tests passed`);
})().catch(() => { process.exitCode = 1; });