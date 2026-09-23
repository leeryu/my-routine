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
  function topWeight(record, setCount) {
    return Math.max(0, ...setValues(record, setCount).map((set) => set.kg));
  }
  /* 상한 반복을 채운 마지막 세트 RIR: 0(실패)은 증량 근거로 쓰지 않고, 1 이상이면 인정한다.
     3+는 "너무 가벼움"이라 한 번만으로도 증량 신호다. 미입력은 판단 보류. */
  const TOP_RIR_VALUES = ['1', '2', '3', '3+'];
  function isStableTop(record, exercise) {
    const sets = setValues(record, exercise.sets);
    const rir = String(record?.lastRir ?? '');
    return sets.every((set) => set.kg > 0 && set.reps >= exercise.repMax) && workingWeight(record, exercise.sets) > 0 && TOP_RIR_VALUES.includes(rir);
  }
  function isEasyTop(record, exercise) {
    return isStableTop(record, exercise) && String(record?.lastRir ?? '').startsWith('3');
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
    const currentTop = isStableTop(current, exercise);
    if (currentTop && isEasyTop(current, exercise)) return { state: 'increase', reason: 'easy', label: '증량 조건 달성 (RIR 3+)', topStreak: 1, currentWeight, reps, repsDelta };
    if (previousWeight > 0 && currentWeight > previousWeight) return { state: 'adapting', label: '새 중량 적응 중', topStreak: currentTop ? 1 : 0, currentWeight, reps, repsDelta };
    const previousTop = !!previous && isStableTop(previous, exercise) && previousWeight === currentWeight;
    if (currentTop && previousTop) return { state: 'increase', reason: 'streak', label: '증량 조건 달성', topStreak: 2, currentWeight, reps, repsDelta };
    if (currentTop) return { state: 'top-once', label: '증량 조건 1/2', topStreak: 1, currentWeight, reps, repsDelta };
    const state = repsDelta === null ? 'insufficient' : repsDelta > 0 ? 'up' : repsDelta < 0 ? 'down' : 'maintain';
    return { state, label: state === 'up' ? '상승' : state === 'down' ? '하락' : state === 'maintain' ? '유지' : '데이터 부족', topStreak: 0, currentWeight, reps, repsDelta };
  }
  function nextWeight(kg, increment) {
    return Math.round(((Number(kg) || 0) + (Number(increment) || 0)) * 100) / 100;
  }
  /* 정체: 완료 세션 3회 동안 최고 중량이 그대로이고 총반복도 늘지 않았을 때만.
     같은 중량으로 반복을 쌓는 더블 프로그레션 구간은 정체가 아니다. */
  function isPlateau(exercise, history, minSessions) {
    const need = minSessions || 3;
    const completed = (history || []).filter((item) => item?.rec?.allDone).slice(0, need);
    if (completed.length < need) return false;
    const weights = completed.map((item) => topWeight(item.rec, exercise.sets));
    if (weights.some((kg) => !kg) || Math.max(...weights) !== Math.min(...weights)) return false;
    return totalReps(completed[0].rec, exercise.sets) <= totalReps(completed[need - 1].rec, exercise.sets);
  }

  /* 종목 이력 선택. scope 'routine'은 같은 루틴의 같은 종목만(진행 판정·정체용),
     'exercise'는 루틴 무관 같은 종목(PR·차트·첫 기록 프리필용).
     exerciseId가 없는 옛 기록은 legacyIdx가 주어졌을 때 같은 루틴·같은 칸만 인정한다. */
  const REC_KEY = /^rec:([ABC])_(\d+)_(\d{4}-\d{2}-\d{2})$/;
  function selectHistory(entries, opts) {
    const o = opts || {};
    return (entries || [])
      .map((entry) => ({ m: String(entry.key).match(REC_KEY), rec: entry.rec }))
      .filter((x) => x.m && x.rec && x.rec.summary && x.m[3] !== o.excludeDate)
      .filter((x) => {
        const sameRoutine = x.m[1] === o.routineKey;
        if (x.rec.exerciseId) return x.rec.exerciseId === o.exerciseId && (o.scope === 'exercise' || sameRoutine);
        return o.legacyIdx !== undefined && o.legacyIdx !== null && sameRoutine && Number(x.m[2]) === o.legacyIdx;
      })
      .map((x) => ({ date: x.m[3], routineKey: x.m[1], idx: Number(x.m[2]), rec: x.rec }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  /* ── 주간 스케줄: 회복 체크에 걸린 날부터 하루씩 밀고, 첫 휴식일(kind 'rest')이 밀린 하루를 흡수한다.
     휴식일이 없으면 마지막으로 밀려난 일정이 droppedDay가 된다. ── */
  const WEEK_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  function shiftScheduleForRecovery(baseSchedule, fromKey, recoveryDay) {
    const shifted = {};
    WEEK_ORDER.forEach((k) => { shifted[k] = baseSchedule[k]; });
    const start = WEEK_ORDER.indexOf(fromKey);
    if (start < 0) return { schedule: shifted, droppedDay: null };
    let carry = baseSchedule[fromKey];
    shifted[fromKey] = recoveryDay;
    for (let i = start + 1; i < WEEK_ORDER.length && carry; i++) {
      const key = WEEK_ORDER[i];
      const current = baseSchedule[key];
      shifted[key] = carry;
      carry = current && current.kind === 'rest' ? null : current;
    }
    return { schedule: shifted, droppedDay: carry || null };
  }

  /* 주간 목표 연속 달성 주. weeksNewestFirst[0]은 이번 주(진행 중)라 미달이어도 끊지 않는다. */
  function goalStreak(weeksNewestFirst) {
    const list = Array.isArray(weeksNewestFirst) ? weeksNewestFirst : [];
    let streak = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i]) streak++;
      else if (i > 0) break;
    }
    return streak;
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
    topWeight,
    isStableTop,
    isEasyTop,
    evaluateDoubleProgression,
    nextWeight,
    isPlateau,
    selectHistory,
    WEEK_ORDER,
    shiftScheduleForRecovery,
    goalStreak,
  };
});
