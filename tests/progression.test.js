'use strict';
const assert = require('assert');
const Progression = require('../js/progression.js');

function ok(name, value) {
  assert.ok(value, name);
  console.log(`ok - ${name}`);
}

ok('isoWeekKey returns ISO week for a Monday and for New Year edge case',
  Progression.isoWeekKey('2026-09-21') === '2026-W39' &&
  Progression.isoWeekKey('2026-01-01') === '2026-W01');

ok('isSessionPassed requires all four checks true',
  Progression.isSessionPassed({ painOk: true, noIncrease: true, noNextDayFlare: true, symmetryOk: true }) === true &&
  Progression.isSessionPassed({ painOk: true, noIncrease: true, noNextDayFlare: false, symmetryOk: true }) === false &&
  Progression.isSessionPassed(null) === false);

{
  const passChecks = { painOk: true, noIncrease: true, noNextDayFlare: true, symmetryOk: true };
  const failChecks = { painOk: false, noIncrease: true, noNextDayFlare: true, symmetryOk: true };
  const sessions = [
    { stage: 1, checks: passChecks },
    { stage: 1, checks: failChecks },
    { stage: 1, checks: passChecks },
    { stage: 1, checks: passChecks },
  ];
  ok('consecutivePassedAtStage stops counting at the first failed session from the end',
    Progression.consecutivePassedAtStage(sessions, 1) === 2);
  ok('canAdvanceStage requires the streak to meet the threshold and caps at stage 5',
    Progression.canAdvanceStage(sessions, 1, 2) === true &&
    Progression.canAdvanceStage(sessions, 1, 3) === false &&
    Progression.canAdvanceStage(sessions, 5, 1) === false);
  ok('a stage change resets the streak because older sessions belong to a different stage',
    Progression.consecutivePassedAtStage([...sessions, { stage: 2, checks: passChecks }], 2) === 1);
}

ok('shouldRegress triggers on pain >= 3 or radiating symptoms',
  Progression.shouldRegress({ painScore: 3 }) === true &&
  Progression.shouldRegress({ painScore: 1, radiating: true }) === true &&
  Progression.shouldRegress({ painScore: 1 }) === false);

ok('nextStage/prevStage clamp to the 1-5 range',
  Progression.nextStage(5) === 5 &&
  Progression.prevStage(1) === 1 &&
  Progression.nextStage(2) === 3 &&
  Progression.prevStage(3) === 2);

{
  const exercise = { sets: 3, repMax: 12 };
  const record = (kg, reps, lastRir) => ({ kg_0: kg, kg_1: kg, kg_2: kg, reps_0: reps, reps_1: reps, reps_2: reps, lastRir, allDone: true, summary: `${kg}kg` });
  ok('double progression requires two consecutive top-range sessions at the same weight with RIR 1 or more',
    Progression.evaluateDoubleProgression(exercise, [
      { rec: record(40, 12, '1') }, { rec: record(40, 12, '2') },
    ]).state === 'increase' &&
    Progression.evaluateDoubleProgression(exercise, [
      { rec: record(40, 12, '0') }, { rec: record(40, 12, '2') },
    ]).state !== 'increase');
  ok('RIR 3+ at the top of the range is an immediate increase signal, RIR 3 counts toward the streak',
    Progression.evaluateDoubleProgression(exercise, [{ rec: record(40, 12, '3+') }]).state === 'increase' &&
    Progression.evaluateDoubleProgression(exercise, [{ rec: record(40, 12, '3') }, { rec: record(40, 12, '3') }]).state === 'increase');
  ok('missing RIR never counts as a top-range session',
    Progression.evaluateDoubleProgression(exercise, [{ rec: record(40, 12, '') }, { rec: record(40, 12, '') }]).state === 'maintain');
  ok('a higher working weight is reported as an adaptation session',
    Progression.evaluateDoubleProgression(exercise, [
      { rec: record(42.5, 8, '2') }, { rec: record(40, 12, '2') },
    ]).state === 'adapting');
  ok('nextWeight adds the exercise increment without float noise',
    Progression.nextWeight(6, 1) === 7 && Progression.nextWeight(40, 2.5) === 42.5 && Progression.nextWeight(12.5, 1.25) === 13.75);
  ok('plateau needs three completed sessions with the same top weight and no rep gain',
    Progression.isPlateau(exercise, [{ rec: record(40, 10, '2') }, { rec: record(40, 10, '2') }, { rec: record(40, 10, '2') }]) === true &&
    Progression.isPlateau(exercise, [{ rec: record(40, 11, '2') }, { rec: record(40, 10, '2') }, { rec: record(40, 10, '2') }]) === false &&
    Progression.isPlateau(exercise, [{ rec: record(40, 10, '2') }, { rec: record(40, 10, '2') }]) === false &&
    Progression.isPlateau(exercise, [{ rec: record(42.5, 8, '2') }, { rec: record(40, 10, '2') }, { rec: record(40, 10, '2') }]) === false);
}

{
  const rec = (exerciseId, summary = 'x') => ({ exerciseId, summary });
  const entries = [
    { key: 'rec:A_0_2026-09-15', rec: rec('chest-press') },
    { key: 'rec:B_0_2026-09-17', rec: rec('chest-press') },
    { key: 'rec:A_0_2026-09-22', rec: rec('chest-press') },
    { key: 'rec:A_0_2026-09-08', rec: { summary: 'legacy' } },
    { key: 'rec:A_0_2026-09-01', rec: rec('dumbbell-bench-press') },
    { key: 'rec:A_1_2026-09-15', rec: { exerciseId: 'chest-press' } },
  ];
  const routineScope = Progression.selectHistory(entries, { routineKey: 'A', exerciseId: 'chest-press', legacyIdx: 0, excludeDate: '2026-09-22' });
  ok('routine-scoped history keeps only the same routine and exercise, excluding today and empty records',
    routineScope.map((x) => x.date).join(',') === '2026-09-15,2026-09-08');
  const exerciseScope = Progression.selectHistory(entries, { routineKey: 'A', exerciseId: 'chest-press', scope: 'exercise' });
  ok('exercise-scoped history crosses routines but never mixes a variant exercise or unmatched legacy slots',
    exerciseScope.map((x) => `${x.routineKey}${x.date}`).join(',') === 'A2026-09-22,B2026-09-17,A2026-09-15');
  const variantScope = Progression.selectHistory(entries, { routineKey: 'A', exerciseId: 'dumbbell-bench-press' });
  ok('variant history does not pick up legacy records of the base slot', variantScope.length === 1);
}

{
  const base = {
    mon: { key: 'mon', label: '홈코어 또는 휴식', kind: 'core' },
    tue: { key: 'tue', label: '헬스 A', kind: 'gym', rk: 'A' },
    wed: { key: 'wed', label: '홈코어 또는 휴식', kind: 'core' },
    thu: { key: 'thu', label: '헬스 B', kind: 'gym', rk: 'B' },
    fri: { key: 'fri', label: '휴식', kind: 'rest' },
    sat: { key: 'sat', label: '메인 수영', kind: 'swim' },
    sun: { key: 'sun', label: '기술 수영 또는 휴식', kind: 'swim' },
  };
  const { schedule, droppedDay } = Progression.shiftScheduleForRecovery(base, 'tue', { label: '회복', kind: 'rest' });
  ok('recovery shift moves A one day and the Friday rest day absorbs the cascade',
    schedule.mon.label === '홈코어 또는 휴식' &&
    schedule.tue.label === '회복' &&
    schedule.wed.label === '헬스 A' &&
    schedule.thu.label === '홈코어 또는 휴식' &&
    schedule.fri.label === '헬스 B' &&
    schedule.sat.label === '메인 수영' &&
    schedule.sun.label === '기술 수영 또는 휴식' &&
    droppedDay === null);
  const noRest = Progression.shiftScheduleForRecovery(base, 'sat', { label: '회복', kind: 'rest' });
  ok('without a rest day after the shift the last pushed day is dropped',
    noRest.schedule.sun.label === '메인 수영' && noRest.droppedDay.label === '기술 수영 또는 휴식');
}

ok('goalStreak ignores an unfinished current week and stops at the first missed past week',
  Progression.goalStreak([false, true, true, false, true]) === 2 &&
  Progression.goalStreak([true, true, false]) === 2 &&
  Progression.goalStreak([false, false, true]) === 0);

{
  const entries = [
    { date: '2026-09-08', value: 71.0 },
    { date: '2026-09-09', value: 70.8 },
    { date: '2026-09-14', value: 70.2 },
    { date: '2026-09-15', value: 70.0 },
    { date: '2026-09-18', value: 69.8 },
    { date: '2026-09-19', value: 69.6 },
  ];
  const delta = Progression.weeklyAverageDelta(entries, '2026-09-19');
  ok('weeklyAverageDelta compares the trailing 7-day window against the prior 7 days',
    delta.thisCount === 4 && delta.lastCount === 2 &&
    delta.thisAvg === 69.9 && delta.lastAvg === 70.9 && delta.delta === -1);
  const empty = Progression.weeklyAverageDelta([], '2026-09-19');
  ok('weeklyAverageDelta returns nulls when there is no data in either window',
    empty.thisAvg === null && empty.lastAvg === null && empty.delta === null);
}
