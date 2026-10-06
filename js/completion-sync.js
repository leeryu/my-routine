(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CompletionSync = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function buildWorkoutCompletion(input) {
    const completedAt = input.completedAt || new Date().toISOString();
    const id = `gym:${input.routineKey}:${input.date}`;
    return {
      id,
      type: 'gym',
      date: input.date,
      routineKey: input.routineKey,
      routineLabel: input.routineLabel,
      completedAt,
      volumeKg: Number(input.volumeKg) || 0,
      totalSets: Number(input.totalSets) || 0,
      readiness: clone(input.readiness || {}),
      exercises: clone(input.exercises || []),
    };
  }

  function buildNotionEvent(completion) {
    const workout = clone(completion);
    const exerciseLines = workout.exercises.map((exercise) => {
      const details = [
        exercise.summary || '세트 상세 없음',
        exercise.lastRir !== '' && exercise.lastRir !== undefined && exercise.lastRir !== '?' ? `마지막 세트 RIR ${exercise.lastRir}` : '',
        exercise.pain ? `통증 ${exercise.pain}` : '',
        exercise.stopped ? '통증으로 중단' : '',
        exercise.note ? `메모 ${exercise.note}` : '',
        exercise.next ? `다음 ${exercise.next}` : '',
      ].filter(Boolean).join(' / ');
      return `- ${exercise.name}: ${details}`;
    });
    const readiness = workout.readiness || {};
    const prompt = [
      `${workout.routineLabel} 운동 완료 결과입니다.`,
      `날짜: ${workout.date}`,
      `총 볼륨: ${workout.volumeKg}kg / 총 ${workout.totalSets}세트`,
      readiness.score === null || readiness.score === undefined
        ? '컨디션: 미입력'
        : `컨디션: 수면 ${readiness.sleep}/5 / 피로 ${readiness.fatigue}/5 / 통증 ${readiness.pain}/5 / 회복 ${readiness.score}점`,
      '',
      ...exerciseLines,
      '',
      '이 기록을 바탕으로 다음 세션의 중량·볼륨·회복 계획을 짧게 코칭해 주세요.',
    ].join('\n');
    const markdown = [
      `# ${workout.date} ${workout.routineLabel}`,
      '',
      `- **총 볼륨:** ${workout.volumeKg}kg`,
      `- **총 세트:** ${workout.totalSets}세트`,
      `- **회복 점수:** ${readiness.score === null || readiness.score === undefined ? '미입력' : readiness.score + '점'}`,
      `- **컨디션:** 수면 ${readiness.sleep ?? '-'} / 피로 ${readiness.fatigue ?? '-'} / 통증 ${readiness.pain ?? '-'}`,
      '',
      '## 운동 기록',
      ...exerciseLines,
      '',
      '## AI 코칭용 컨텍스트',
      prompt,
      '',
      '```json',
      JSON.stringify(workout, null, 2),
      '```',
    ].join('\n');
    return {
      schemaVersion: 1,
      event: 'workout.completed',
      eventId: workout.id,
      createdAt: workout.completedAt,
      destination: { type: 'notion' },
      notion: {
        title: `${workout.date} ${workout.routineLabel}`,
        markdown,
      },
      workout,
      prompt,
    };
  }

  /* ── AI(Claude·ChatGPT)에 그대로 붙여넣는 하루 운동 프롬프트 ──
     day: { date, weekday, gym, swim, core, body, context[] }
     gym: { routineLabel, volumeKg, totalSets, readiness, exercises[] } | null
     exercise: { name, summary, lastRir, pain, note, stopped, prev, next } */
  function has(v) {
    return v !== undefined && v !== null && v !== '' && v !== '?';
  }

  function exerciseLine(ex) {
    if (!ex.summary) return `- ${ex.name}: 미실시`;
    const extra = [
      has(ex.lastRir) ? `마지막 세트 RIR ${ex.lastRir}` : '',
      ex.pain ? `통증 ${ex.pain}` : '',
      ex.stopped ? '통증으로 중단' : '',
      ex.note ? `메모 ${ex.note}` : '',
    ].filter(Boolean);
    const head = `- ${ex.name}: ${ex.summary}${extra.length ? ` (${extra.join(' / ')})` : ''}`;
    return ex.prev ? `${head}\n  · 지난번: ${ex.prev}` : head;
  }

  function readinessLine(r) {
    if (!r || r.score === null || r.score === undefined) return '컨디션: 미입력';
    return `컨디션: 수면 ${r.sleep}/5 · 피로 ${r.fatigue}/5 · 통증 ${r.pain}/5 (회복 ${r.score}/100 · 수면은 높을수록 좋음, 피로·통증은 높을수록 심함)`;
  }

  function buildDayPrompt(input) {
    const day = input || {};
    const sections = [];
    const head = `# ${day.date}${day.weekday ? ` (${day.weekday})` : ''} 운동 기록`;
    const context = Array.isArray(day.context) ? day.context.filter(Boolean) : [];
    if (context.length) sections.push(['## 내 상황', ...context.map((line) => `- ${line}`)].join('\n'));

    if (day.gym) {
      const g = day.gym;
      const exercises = g.exercises || [];
      const done = exercises.filter((ex) => ex.summary).length;
      const lines = [`## ${g.routineLabel}${done < exercises.length ? ` (${done}/${exercises.length}종목 진행)` : ''}`];
      lines.push(`총 볼륨 ${g.volumeKg}kg / 총 ${g.totalSets}세트`);
      lines.push(readinessLine(g.readiness));
      lines.push('', ...exercises.map(exerciseLine));
      const nexts = exercises.filter((ex) => ex.summary && ex.next);
      if (nexts.length) lines.push('', '앱이 계산한 다음 세션 제안(더블 프로그레션):', ...nexts.map((ex) => `- ${ex.name}: ${ex.next}`));
      sections.push(lines.join('\n'));
    }

    if (day.swim) {
      const w = day.swim;
      const parts = [
        w.distanceM ? `${w.distanceM}m` : '',
        w.minutes ? `${w.minutes}분` : '',
        w.rpe ? `힘든 정도 ${w.rpe}/5` : '',
        w.avgSwolf ? `SWOLF ${w.avgSwolf}` : '',
        w.strokeCount ? `스트로크 ${w.strokeCount}` : '',
      ].filter(Boolean);
      sections.push(`## 수영\n${parts.join(' · ') || '완료 (상세 기록 없음)'}`);
    }

    if (day.core) {
      sections.push(`## 홈코어\n${day.core.doneCount}/${day.core.total}종목${day.core.names?.length ? ` — ${day.core.names.join(', ')}` : ''}`);
    }

    if (day.body) {
      const b = day.body;
      const parts = [
        has(b.bodyweightKg) ? `공복체중 ${b.bodyweightKg}kg` : '',
        has(b.kcal) ? `${b.kcal}kcal` : '',
        has(b.proteinG) ? `단백질 ${b.proteinG}g` : '',
        has(b.sodiumMg) ? `나트륨 ${b.sodiumMg}mg` : '',
      ].filter(Boolean);
      if (parts.length) sections.push(`## 몸·영양\n${parts.join(' · ')}`);
    }

    const asks = ['오늘 운동의 볼륨·강도가 적절했는지 평가'];
    if (day.gym) asks.push('다음 헬스 세션의 종목별 중량·반복 수 제안 (위 앱 제안이 타당한지 검토 포함)');
    asks.push('회복(식사·수면·활동량)에서 챙길 점', '통증·폼에서 주의할 점');
    const request = ['## 요청', ...asks.map((a, i) => `${i + 1}. ${a}`), '', '결론부터 짧게, 근거가 부족하면 필요한 추가 정보를 먼저 물어봐 줘.'].join('\n');

    return [head, '', ...sections.flatMap((section) => [section, '']), request].join('\n');
  }

  function enqueue(outbox, event) {
    const next = Array.isArray(outbox) ? clone(outbox) : [];
    if (!next.some((item) => item.eventId === event.eventId)) next.push(clone(event));
    return next;
  }

  function markDelivered(outbox, eventId) {
    return (Array.isArray(outbox) ? outbox : []).filter((item) => item.eventId !== eventId);
  }

  return { buildWorkoutCompletion, buildNotionEvent, buildDayPrompt, enqueue, markDelivered };
});
