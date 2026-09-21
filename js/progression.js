(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Progression = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function average(nums) {
    if (!nums || !nums.length) return null;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }

  /* ISO 8601 주차: "2026-W38" 형태 */
  function isoWeekKey(dateStr) {
    const d = new Date(dateStr);
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  }

  /* 7일 이동평균: 이번주(asOf 포함 최근 7일) vs 직전 7일 비교 */
  function weeklyAverageDelta(entries, asOfDateStr, windowDays) {
    const window = windowDays || 7;
    const list = Array.isArray(entries) ? entries : [];
    const asOf = new Date(asOfDateStr);
    const bucket = (from, to) =>
      list
        .filter((e) => {
          const d = new Date(e.date);
          return d >= from && d <= to;
        })
        .map((e) => Number(e.value))
        .filter((v) => !Number.isNaN(v));
    const thisStart = new Date(asOf);
    thisStart.setDate(thisStart.getDate() - (window - 1));
    const lastEnd = new Date(thisStart);
    lastEnd.setDate(lastEnd.getDate() - 1);
    const lastStart = new Date(lastEnd);
    lastStart.setDate(lastStart.getDate() - (window - 1));
    const thisVals = bucket(thisStart, asOf);
    const lastVals = bucket(lastStart, lastEnd);
    const thisAvg = thisVals.length ? average(thisVals) : null;
    const lastAvg = lastVals.length ? average(lastVals) : null;
    const delta =
      thisAvg !== null && lastAvg !== null
        ? Math.round((thisAvg - lastAvg) * 100) / 100
        : null;
    return { thisAvg, lastAvg, delta, thisCount: thisVals.length, lastCount: lastVals.length };
  }

  /* ── 하체 재도입 progression ── */
  function isSessionPassed(checks) {
    return !!(
      checks &&
      checks.painOk &&
      checks.noIncrease &&
      checks.noNextDayFlare &&
      checks.symmetryOk
    );
  }
  function consecutivePassedAtStage(sessions, stage) {
    const list = Array.isArray(sessions) ? sessions : [];
    let streak = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      const s = list[i];
      if (!s || s.stage !== stage) break;
      if (!isSessionPassed(s.checks)) break;
      streak++;
    }
    return streak;
  }
  function canAdvanceStage(sessions, stage, requiredStreak) {
    const req = requiredStreak || 2;
    return stage < 5 && consecutivePassedAtStage(sessions, stage) >= req;
  }
  function shouldRegress(entry) {
    const pain = Number(entry && entry.painScore);
    return pain >= 3 || !!(entry && entry.radiating);
  }
  function clampStage(stage) {
    return Math.min(5, Math.max(1, Number(stage) || 1));
  }
  function nextStage(stage) {
    return clampStage(clampStage(stage) + 1);
  }
  function prevStage(stage) {
    return clampStage(clampStage(stage) - 1);
  }

  function setValues(record, setCount) {
    return Array.from({ length: setCount }, (_, index) => ({ kg: Number(record?.['kg_' + index]) || 0, reps: Number(record?.['reps_' + index]) || 0 }));
  }
  function totalReps(record, setCount) {
    return setValues(record, setCount).reduce((sum, set) => sum + set.reps, 0);
  }
  function workingWeight(record, setCount) {
    const weights = setValues(record, setCount).map((set) => set.kg).filter((kg) => kg > 0);
    return weights.length && weights.every((kg) => kg === weights[0]) ? weights[0] : 0;
  }
  function isStableTop(record, exercise) {
    const sets = setValues(record, exercise.sets);
    const rir = String(record?.lastRir ?? '');
    return sets.every((set) => set.kg > 0 && set.reps >= exercise.repMax) && workingWeight(record, exercise.sets) > 0 && (rir === '1' || rir === '2');
  }
  function evaluateDoubleProgression(exercise, history) {
    const completed = (history || []).filter((item) => item?.rec?.allDone || totalReps(item?.rec, exercise.sets) > 0);
    if (!completed.length) return { state: 'insufficient', label: '데이터 부족', topStreak: 0, repsDelta: null };
    const current = completed[0].rec;
    const previous = completed[1]?.rec;
    const currentWeight = workingWeight(current, exercise.sets);
    const previousWeight = previous ? workingWeight(previous, exercise.sets) : 0;
    const reps = totalReps(current, exercise.sets);
    const previousReps = previous ? totalReps(previous, exercise.sets) : null;
    const repsDelta = previousReps === null ? null : reps - previousReps;
    if (previousWeight > 0 && currentWeight > previousWeight) return { state: 'adapting', label: '새 중량 적응 중', topStreak: 0, currentWeight, reps, repsDelta };
    const currentTop = isStableTop(current, exercise);
    const previousTop = !!previous && isStableTop(previous, exercise) && previousWeight === currentWeight;
    if (currentTop && previousTop) return { state: 'increase', label: '증량 조건 달성', topStreak: 2, currentWeight, reps, repsDelta };
    if (currentTop) return { state: 'top-once', label: '증량 조건 1/2', topStreak: 1, currentWeight, reps, repsDelta };
    const state = repsDelta === null ? 'insufficient' : repsDelta > 0 ? 'up' : repsDelta < 0 ? 'down' : 'maintain';
    return { state, label: state === 'up' ? '상승' : state === 'down' ? '하락' : state === 'maintain' ? '유지' : '데이터 부족', topStreak: 0, currentWeight, reps, repsDelta };
  }

  /* ── 주간 스케줄: 월요일 회복 체크에 걸리면 월→화 순연, 이하 순차 하루씩 밀림 ── */
  const WEEK_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  function shiftScheduleForRecovery(baseSchedule, homeCoreDay) {
    const shifted = {};
    for (let i = WEEK_ORDER.length - 1; i >= 1; i--) {
      shifted[WEEK_ORDER[i]] = baseSchedule[WEEK_ORDER[i - 1]];
    }
    shifted.mon = homeCoreDay || { type: 'home-core', label: '홈코어' };
    const droppedDay = baseSchedule[WEEK_ORDER[WEEK_ORDER.length - 1]];
    return { schedule: shifted, droppedDay };
  }

  return {
    average,
    isoWeekKey,
    weeklyAverageDelta,
    isSessionPassed,
    consecutivePassedAtStage,
    canAdvanceStage,
    shouldRegress,
    clampStage,
    nextStage,
    prevStage,
    setValues,
    totalReps,
    workingWeight,
    isStableTop,
    evaluateDoubleProgression,
    WEEK_ORDER,
    shiftScheduleForRecovery,
  };
});
