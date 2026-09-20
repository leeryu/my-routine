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
  const base = {
    mon: { key: 'mon', dayLabel: '월', label: '헬스A + 홈코어' },
    tue: { key: 'tue', dayLabel: '화', label: '홈코어' },
    wed: { key: 'wed', dayLabel: '수', label: '헬스B' },
    thu: { key: 'thu', dayLabel: '목', label: '홈코어 또는 휴식' },
    fri: { key: 'fri', dayLabel: '금', label: '휴식' },
    sat: { key: 'sat', dayLabel: '토', label: '수영 45~60분' },
    sun: { key: 'sun', dayLabel: '일', label: '수영 60~90분' },
  };
  const { schedule, droppedDay } = Progression.shiftScheduleForRecovery(base, { label: '홈코어 (헬스A는 화요일로 이동)' });
  ok('shiftScheduleForRecovery moves Monday to home-core and cascades the rest by one day',
    schedule.mon.label === '홈코어 (헬스A는 화요일로 이동)' &&
    schedule.tue.label === '헬스A + 홈코어' &&
    schedule.wed.label === '홈코어' &&
    schedule.thu.label === '헬스B' &&
    schedule.fri.label === '홈코어 또는 휴식' &&
    schedule.sat.label === '휴식' &&
    schedule.sun.label === '수영 45~60분' &&
    droppedDay.label === '수영 60~90분');
}

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
