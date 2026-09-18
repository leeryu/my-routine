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

ok('navigation is reduced to workout, history, and settings',
  /const tabs = \['gym', 'history', 'settings'\]/.test(app) &&
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
