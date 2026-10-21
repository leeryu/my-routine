'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

/* app.js 전체를 가짜 DOM·시계로 실행해 요일 스케줄을 검증한다.
   now: Asia/Seoul 기준 'YYYY-MM-DDTHH:mm' (KST = UTC+9) */
function boot(nowKst, store) {
  const el = new Proxy(function () {}, {
    get: (t, k) => (k === 'classList' ? { add() {}, remove() {}, toggle() {} } : k === 'style' || k === 'dataset' ? {} : el),
    apply: () => el,
    set: () => true,
  });
  const ls = { ...store };
  const localStorage = {
    get length() { return Object.keys(ls).length; },
    key: (i) => Object.keys(ls)[i],
    getItem: (k) => (k in ls ? ls[k] : null),
    setItem: (k, v) => { ls[k] = String(v); },
    removeItem: (k) => { delete ls[k]; },
  };
  const fixed = Date.parse(nowKst + ':00+09:00');
  const ctx = vm.createContext({
    console, localStorage, setTimeout, clearTimeout,
    document: { getElementById: () => el, querySelectorAll: () => [], querySelector: () => el, documentElement: el, body: el, addEventListener() {} },
    window: { addEventListener() {} },
    navigator: {}, location: { protocol: 'http:' },
  });
  vm.runInContext(`globalThis.Date = class extends Date { constructor(...a) { a.length ? super(...a) : super(${fixed}); } static now() { return ${fixed}; } };`, ctx);
  ['storage-migration', 'completion-sync', 'progression'].forEach((f) => {
    const m = { exports: {} };
    vm.runInContext(`(function(module){${fs.readFileSync(`js/${f}.js`, 'utf8')}\n})`, ctx)(m);
    ctx[{ 'storage-migration': 'StorageMigration', 'completion-sync': 'CompletionSync', progression: 'Progression' }[f]] = m.exports;
  });
  vm.runInContext(fs.readFileSync('js/app.js', 'utf8'), ctx);
  const run = (code) => vm.runInContext(code, ctx);
  Object.entries(store || {}).forEach(([k, v]) => run(`_cache[${JSON.stringify(k.replace(/^routine:/, ''))}] = ${v}`));
  return run;
}

const done = (rk, date) => ({ [`routine:workout:${rk}:${date}`]: JSON.stringify({ routineKey: rk, date }) });
const plan = (run) => JSON.parse(run('JSON.stringify((() => { const p = todayPlan(); return { rk: p.rk, kind: p.kind, type: p.type, plan: p.plan, fallbackB: !!p.fallbackB, suggestCore: !!p.suggestCore }; })())'));
let n = 0;
function test(name, fn) { fn(); n++; console.log(`ok - ${name}`); }

/* 2026-10-19 월 · 20 화 · 21 수 · 22 목 · 23 금 · 24 토 · 25 일 */
test('Tuesday stays Health A', () => {
  const p = plan(boot('2026-10-20T10:00', {}));
  assert.equal(p.rk, 'A');
});
test('Thursday default is swimming with the B fallback flag', () => {
  const p = plan(boot('2026-10-22T10:00', {}));
  assert.deepEqual([p.rk, p.kind, p.fallbackB], [null, 'swim', true]);
});
test('Thursday: default day mode is the swim card, switchToBToday starts B dated today', () => {
  const run = boot('2026-10-22T10:00', {});
  assert.deepEqual(JSON.parse(run('JSON.stringify(resolveDayMode())')), { mode: 'X', sub: 'swim' });
  run('switchToBToday()');
  assert.equal(run('dayMode'), 'B');
  assert.equal(run('currentRoutine'), 'B');
  const saved = JSON.parse(run('JSON.stringify(gls("dayMode"))'));
  assert.deepEqual([saved.date, saved.mode], ['2026-10-22', 'B']);
});
test('Friday with no B record this week is Health B', () => {
  const p = plan(boot('2026-10-23T10:00', {}));
  assert.equal(p.rk, 'B');
  assert.equal(p.kind, 'gym');
});
test('Friday after Thursday B conversion/completion suggests rest or core', () => {
  const run = boot('2026-10-23T10:00', done('B', '2026-10-22'));
  const p = plan(run);
  assert.deepEqual([p.rk, p.kind, p.suggestCore], [null, 'rest', true]);
  assert.deepEqual(JSON.parse(run('JSON.stringify(resolveDayMode())')), { mode: 'X', sub: 'rest' });
});
test('Friday after Thursday swim (no B record) stays Health B', () => {
  const p = plan(boot('2026-10-23T10:00', { 'routine:swimLogs': JSON.stringify({ '2026-10-22': { done: true } }) }));
  assert.equal(p.rk, 'B');
});
test('Friday: B finished today does not flip today to rest', () => {
  const p = plan(boot('2026-10-23T18:00', done('B', '2026-10-23')));
  assert.equal(p.rk, 'B');
});
test('Friday: B done earlier (Mon) in legacy "wh" history only is also recognized', () => {
  const store = { 'routine:wh': JSON.stringify([{ id: 'x', date: '2026-10-19', routine: '헬스 B', summary: '' }]) };
  assert.equal(plan(boot('2026-10-23T10:00', store)).suggestCore, true);
});
test('Friday: B record from LAST week does not count', () => {
  const p = plan(boot('2026-10-23T10:00', done('B', '2026-10-18')));
  assert.equal(p.rk, 'B');
});
test('week boundary: Sunday 23:00 KST still belongs to the old week (B Thursday counted, Sunday = swim)', () => {
  const run = boot('2026-10-25T23:00', done('B', '2026-10-22'));
  assert.equal(run('todayStr()'), '2026-10-25');
  assert.equal(run('weekIndex()'), 6);
  assert.deepEqual(JSON.parse(run('JSON.stringify(weekDates(0))')).slice(0, 1).concat(JSON.parse(run('JSON.stringify(weekDates(0))')).slice(-1)), ['2026-10-19', '2026-10-25']);
  assert.equal(plan(run).kind, 'swim');
});
test('week boundary: Monday 00:00 KST starts a new week with no carry-over B', () => {
  const run = boot('2026-10-26T00:00', done('B', '2026-10-22'));
  assert.equal(run('todayStr()'), '2026-10-26');
  assert.equal(run('weekIndex()'), 0);
  assert.equal(JSON.parse(run('JSON.stringify(weekDates(0))'))[0], '2026-10-26');
  assert.equal(run('bDoneEarlierThisWeek()'), false);
});
test('Asia/Seoul is fixed even when the UTC date differs (Mon 00:30 KST = Sun 15:30 UTC)', () => {
  const run = boot('2026-10-26T00:30', {});
  assert.equal(run('todayStr()'), '2026-10-26');
  assert.equal(run('weekIndex()'), 0);
});
test('recovery shift keeps the old outcome: A→Wed, core→Thu, B stays Fri, nothing dropped', () => {
  const entry = { flags: {}, shifted: true, fromKey: 'tue', answeredAt: 'x', version: 2 };
  const run = boot('2026-10-20T10:00', { 'routine:weeklyRecovery': JSON.stringify({ '2026-W43': entry }) });
  const r = JSON.parse(run('JSON.stringify((() => { const e = getEffectiveWeeklySchedule(); return { d: e.droppedDay, s: Progression.WEEK_ORDER.map((k) => e.schedule[k].plan) }; })())'));
  assert.equal(r.d, null);
  assert.deepEqual(r.s, ['홈코어 또는 휴식', '회복 (헬스 A는 다음 날로)', '헬스 A', '홈코어 또는 휴식', '헬스 B', '메인 수영', '기술 수영 또는 휴식']);
});
console.log(`${n} weekly schedule tests passed`);
