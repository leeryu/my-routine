'use strict';
const assert = require('assert');
const fs = require('fs');
const app = fs.readFileSync('js/app.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const sw = fs.readFileSync('sw.js', 'utf8');

function ok(name, value) {
  assert.ok(value, name);
  console.log(`ok - ${name}`);
}

ok('navigation is workout, history, daily, and settings',
  /const tabs = \['gym', 'history', 'daily', 'settings'\]/.test(app) &&
  !/id="tab-(rehab|swim|rules)"/.test(html));
ok('removed feature modules are not loaded or cached',
  !/js\/rehab\.js/.test(html) && !/js\/rehab\.js/.test(sw));
ok('beginner start action and prominent timer exist',
  /id="beginnerTitle"/.test(html) && /function startTodayWorkout/.test(app) &&
  /\.rest-timer\{font-size:56px/.test(css));
ok('Notion webhook uses a local outbox and completion event',
  /NOTION_WEBHOOK_OUTBOX/.test(app) && /buildNotionEvent/.test(app) &&
  /id="notionWebhookUrl"/.test(html));
ok('browser bundle contains no Notion token', !/NOTION_TOKEN/.test(app + html));
ok('calendar no longer renders rehabilitation markers',
  !/corrDoneCount/.test(app) && !/교정 전체 수행일/.test(html));
ok('C routine is removed and weekly schedule replaces Sat/Sun gym day',
  !/^\s*C: \{/m.test(app) && /id="tab-daily"/.test(html) &&
  /js\/progression\.js/.test(html) && /js\/progression\.js/.test(sw));
{
  const bBlock = app.slice(app.indexOf('\n  B: {'), app.indexOf('\n};'));
  const order = ['덤벨 로우', '체스트 프레스', '레터럴 레이즈', '숄더 프레스', '리버스 펙덱', '랫풀다운', '레그 익스텐션']
    .map((name) => bBlock.indexOf(`name: '${name}'`));
  ok('B routine follows the new exercise order and drops 팔로프프레스',
    order.every((idx, i) => idx !== -1 && (i === 0 || idx > order[i - 1])) &&
    !bBlock.includes("팔로프프레스"));
}
ok('daily tab exposes lower-body progression and weekly schedule storage',
  /function getLowerBodyProgress/.test(app) &&
  /function getEffectiveWeeklySchedule/.test(app) &&
  /LOWER_BODY_STAGES/.test(app) && /CALORIE_TABLE/.test(app));
