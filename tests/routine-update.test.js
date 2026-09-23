'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('js/app.js', 'utf8');
const start = source.indexOf('const ROUTINES =');
const end = source.indexOf('const CLINICAL_PROFILE');
const routineSource = source.slice(start, end).replace('const ROUTINES =', 'globalThis.ROUTINES =');
const context = {};
vm.runInNewContext(routineSource, context);
const { A, B, C } = context.ROUTINES;

assert.equal(A.day, '화요일');
assert.equal(B.day, '목요일');
assert.equal(C.day, '선택 루틴');
assert.deepEqual(Array.from(A.exercises.slice(0, 7), (ex) => [ex.id, ex.sets, ex.reps]), [
  ['chest-press', 4, '6~10'],
  ['dumbbell-row', 4, '8~12'],
  ['lat-pulldown', 3, '8~12'],
  ['lateral-raise', 3, '12~20'],
  ['reverse-pec-deck', 3, '12~20'],
  ['biceps-curl', 2, '10~15'],
  ['triceps-pushdown', 2, '10~15'],
]);
assert.deepEqual(Array.from(B.exercises.slice(0, 7), (ex) => [ex.id, ex.sets, ex.reps]), [
  ['chest-press', 3, '8~12'],
  ['lat-pulldown', 2, '8~12'],
  ['dumbbell-row', 2, '8~12'],
  ['shoulder-press-supported', 2, '8~12'],
  ['lateral-raise', 4, '12~20'],
  ['reverse-pec-deck', 2, '12~20'],
  ['biceps-curl', 2, '10~15'],
]);

const totals = {};
[A, B].forEach((routine) => routine.exercises.forEach((ex) => {
  if (ex.directMuscle) totals[ex.directMuscle] = (totals[ex.directMuscle] || 0) + ex.sets;
}));
assert.deepEqual(totals, { '가슴': 7, '등/광배': 11, '측면삼각근': 7, '후면삼각근': 5, '이두': 4, '삼두': 2 });
assert.match(source, /\{ key: 'tue', label: '화', type: 'A', rk: 'A', kind: 'gym'/);
assert.match(source, /\{ key: 'thu', label: '목', type: 'B', rk: 'B', kind: 'gym'/);
assert.match(source, /\{ key: 'sat', label: '토', type: '메인수영', rk: null, kind: 'swim'/);
assert.match(source, /\{ key: 'sun', label: '일', type: '기술수영\/휴식', rk: null, kind: 'swim'/);
[A, B].forEach((routine) => routine.exercises.forEach((ex) => {
  assert.ok(ex.increment > 0 && ex.restSecs > 0, `${ex.id} needs increment and restSecs`);
}));
console.log('ok - Tuesday/Thursday routines and weekly direct sets match the requested plan');
