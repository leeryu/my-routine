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
        exercise.rpe ? `RPE ${exercise.rpe}` : '',
        exercise.pain ? `통증 ${exercise.pain}` : '',
        exercise.note ? `메모 ${exercise.note}` : '',
      ].filter(Boolean).join(' / ');
      return `- ${exercise.name}: ${details}`;
    });
    const readiness = workout.readiness || {};
    const prompt = [
      `${workout.routineLabel} 운동 완료 결과입니다.`,
      `날짜: ${workout.date}`,
      `총 볼륨: ${workout.volumeKg}kg / 총 ${workout.totalSets}세트`,
      `컨디션: 수면 ${readiness.sleep ?? '-'} / 피로 ${readiness.fatigue ?? '-'} / 통증 ${readiness.pain ?? '-'} / 회복 ${readiness.score ?? '-'}점`,
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
      `- **회복 점수:** ${readiness.score ?? '-'}점`,
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

  function enqueue(outbox, event) {
    const next = Array.isArray(outbox) ? clone(outbox) : [];
    if (!next.some((item) => item.eventId === event.eventId)) next.push(clone(event));
    return next;
  }

  function markDelivered(outbox, eventId) {
    return (Array.isArray(outbox) ? outbox : []).filter((item) => item.eventId !== eventId);
  }

  return { buildWorkoutCompletion, buildNotionEvent, enqueue, markDelivered };
});
