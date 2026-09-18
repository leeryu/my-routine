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
