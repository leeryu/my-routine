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
ok('workout tab uses a sticky top bar, one-line set rows and a single dock timer',
  /id="topbar"/.test(html) && /\.topbar\{position:sticky/.test(css) &&
  /class="set-row/.test(app) && /\.set-row\{/.test(css) &&
  !/class="rest-bar"/.test(html) && /id="bottomRestBar"/.test(html));
ok('focus mode and floating action bar are removed',
  !/id="focusOverlay"/.test(html) && !/id="actionBar"/.test(html) &&
  !/function openFocusMode/.test(app) && !/\.focus-overlay/.test(css));
ok('set completion gives immediate visible feedback and asks for the last-set RIR',
  /btn\.classList\.toggle\('checked'\)/.test(app) &&
  /세트 완료 · 휴식/.test(app) && /마지막 세트 RIR 고르면 다음 종목으로/.test(app));
ok('Notion webhook uses a local outbox and completion event',
  /NOTION_WEBHOOK_OUTBOX/.test(app) && /buildNotionEvent/.test(app) &&
  /id="notionWebhookUrl"/.test(html));
ok('browser bundle contains no Notion token', !/NOTION_TOKEN/.test(app + html));
ok('calendar no longer renders rehabilitation markers',
  !/corrDoneCount/.test(app) && !/교정 전체 수행일/.test(html));
ok('C routine remains optional while weekly schedule uses Sat/Sun swimming',
  /day: '선택 루틴'/.test(app) && /id="tab-daily"/.test(html) &&
  /js\/progression\.js/.test(html) && /js\/progression\.js/.test(sw));
ok('weekly schedule has a single source and legacy duplicates are gone',
  /const WEEK_PLAN = \[/.test(app) && !/WEEKLY_SCHEDULE_BASE/.test(app) && !/const DAY_INFO/.test(app));
ok('plate calculator, day-streak box, tonnage muscle coaching and duplicate coach surfaces are removed',
  !/calcPlates|pcKg/.test(app + html) && !/streakNum/.test(app + html) &&
  !/getMuscleCoachText|muscleGrid/.test(app + html) && !/coachNudge|getAiFeedback/.test(app + html));
ok('Notion receives only the workout summary and can carry the relay secret',
  !/buildExerciseNotionEvent|enqueueExerciseNotionCompletion/.test(app) &&
  /id="notionWebhookSecret"/.test(html) && /searchParams\.set\('secret'/.test(app));
ok('readiness is never faked when the check-in is missing',
  /if \(!hasReadinessToday\(\)\) return null;/.test(app));
ok('daily tab exposes lower-body progression and weekly schedule storage',
  /function getLowerBodyProgress/.test(app) &&
  /function getEffectiveWeeklySchedule/.test(app) &&
  /LOWER_BODY_STAGES/.test(app) && /CALORIE_TABLE/.test(app));
