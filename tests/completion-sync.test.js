'use strict';
const assert = require('assert');
const sync = require('../js/completion-sync.js');

const completion = sync.buildWorkoutCompletion({
  routineKey: 'A', routineLabel: 'A루틴', date: '2026-09-18',
  completedAt: '2026-09-18T10:00:00.000Z', volumeKg: 1234, totalSets: 3,
  readiness: { sleep: 4, fatigue: 2, pain: 1, score: 84 },
  exercises: [{ name: '랫풀다운', summary: '40kg×10', rpe: '8', pain: '', note: '좋음' }],
});
assert.equal(completion.id, 'gym:A:2026-09-18');
assert.equal(completion.volumeKg, 1234);

const event = sync.buildNotionEvent(completion);
assert.equal(event.event, 'workout.completed');
assert.equal(event.destination.type, 'notion');
assert.match(event.prompt, /다음 세션의 중량·볼륨·회복 계획/);
assert.match(event.prompt, /랫풀다운/);
assert.match(event.notion.markdown, /```json/);
assert.match(event.notion.markdown, /총 볼륨/);

let outbox = sync.enqueue([], event);
outbox = sync.enqueue(outbox, event);
assert.equal(outbox.length, 1, 'same completion must not be queued twice');
assert.equal(sync.markDelivered(outbox, event.eventId).length, 0);
console.log('ok - completion snapshot and Notion webhook event are deterministic');

const prompt = sync.buildDayPrompt({
  date: '2026-09-18', weekday: '금',
  context: ['단백질 130~140g'],
  gym: {
    routineLabel: 'A루틴', volumeKg: 1234, totalSets: 3,
    readiness: { sleep: 4, fatigue: 2, pain: 1, score: 84 },
    exercises: [
      { name: '랫풀다운', summary: '40kg×10/10/9', lastRir: '2', pain: '', note: '좋음', stopped: false, prev: '9/11 40kg×10/9/8', next: '42.5kg 증량' },
      { name: '벤치프레스', summary: '', lastRir: '', pain: '', note: '', stopped: false, prev: '', next: '' },
    ],
  },
  swim: { distanceM: 1000, minutes: 40, rpe: 3 },
  core: { doneCount: 2, total: 5, names: ['데드버그', '버드독'] },
  body: { bodyweightKg: 70.5, kcal: 2250, proteinG: 135 },
});
assert.match(prompt, /^# 2026-09-18 \(금\) 운동 기록/);
assert.match(prompt, /## A루틴 \(1\/2종목 진행\)/);
assert.match(prompt, /- 랫풀다운: 40kg×10\/10\/9 \(마지막 세트 RIR 2 \/ 메모 좋음\)/);
assert.match(prompt, /지난번: 9\/11/);
assert.match(prompt, /- 벤치프레스: 미실시/);
assert.match(prompt, /1000m · 40분 · 힘든 정도 3\/5/);
assert.match(prompt, /2\/5종목 — 데드버그, 버드독/);
assert.match(prompt, /공복체중 70\.5kg · 2250kcal · 단백질 135g/);
assert.match(prompt, /## 요청/);
const swimOnly = sync.buildDayPrompt({ date: '2026-09-19', swim: { distanceM: 1500 } });
assert.ok(!/헬스/.test(swimOnly) && /1500m/.test(swimOnly), 'non-gym days omit the gym section');
assert.ok(!/다음 헬스 세션/.test(swimOnly));
console.log('ok - day prompt covers gym, swim, core, body and omits empty sections');
