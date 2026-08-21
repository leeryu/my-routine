'use strict';
const sessionDates = { pilates: null, 'home-core': null };
function mergedClinicalProfile(saved) {
  return {
    ...CLINICAL_PROFILE,
    ...(saved || {}),
    medicalRecommendation: {
      ...CLINICAL_PROFILE.medicalRecommendation,
      ...(saved?.medicalRecommendation || {}),
    },
  };
}
function seedClinicalData() {
  const profile = mergedClinicalProfile(gls('clinicalProfile'));
  if (JSON.stringify(profile) !== JSON.stringify(gls('clinicalProfile'))) sls('clinicalProfile', profile);
  if (!gls('weeklyGoals')) sls('weeklyGoals', WEEKLY_GOALS);
}
function sessionKey(id, date = todayStr()) { return `session:${id}:${date}`; }
function sessionRecord(id, date = todayStr()) { return gls(sessionKey(id, date)) || {}; }
function valueOf(id, fallback = '') { const el = document.getElementById(id); return el ? el.value : fallback; }
function selectedSessionDate(id) {
  const value = valueOf(`${id}Date`, sessionDates[id] || todayStr());
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : todayStr();
}
function comparableSession(record) { const copy = { ...(record || {}) }; delete copy.savedAt; return copy; }
async function saveSessionRoutine(id) {
  const date = selectedSessionDate(id);
  const key = sessionKey(id, date);
  const previous = gls(key);
  const record = id === 'pilates' ? {
    routineId: id, date, minutes: +valueOf('pilatesMinutes', 50) || 50,
    intensity: valueOf('pilatesIntensity'), neck: valueOf('pilatesNeck'), back: valueOf('pilatesBack'),
    rightQl: valueOf('pilatesQl'), hip: valueOf('pilatesHip'), coreFeel: valueOf('pilatesCore'),
    nextDay: valueOf('pilatesNextDay'), note: valueOf('pilatesNote'), savedAt: new Date().toISOString(),
  } : {
    routineId: id, date, completed: HOME_CORE_EXERCISES.map((_, i) => !!document.getElementById(`hc_${i}`)?.checked),
    pain: valueOf('homeCorePain'), nextDay: valueOf('homeCoreNextDay'), note: valueOf('homeCoreNote'), savedAt: new Date().toISOString(),
  };
  const changed = previous && JSON.stringify(comparableSession(previous)) !== JSON.stringify(comparableSession(record));
  const summary = id === 'pilates' ? `${record.minutes}분 · ${record.intensity || '강도 미입력'}` : `${record.completed.filter(Boolean).length}/${HOME_CORE_EXERCISES.length}종목`;
  const history = getHistory().filter(h => !(h.date === date && h.routine === SESSION_ROUTINES[id].name));
  history.unshift({ date, routine: SESSION_ROUTINES[id].name, summary });
  try {
    if (changed) {
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      await persistSet(`sessionRevision:${id}:${date}:${stamp}`, { replacedAt: new Date().toISOString(), data: previous });
    }
    await persistSet(key, record);
    await persistSet('wh', history.slice(0, 400));
    showToast(`${SESSION_ROUTINES[id].name} ${previous ? '기존 기록 수정' : '신규 기록 저장'}됨`);
  } catch (error) {
    markStorageSyncPending(key, error);
    showToast('⚠️ 로컬 저장됨 · 보조 저장소 동기화 대기');
  }
  renderWeeklyGoals();
  showSessionRoutine(id, document.querySelector(`.session-tab[data-session="${id}"]`), date);
}
function renderClinicalProfile() {
  const el = document.getElementById('clinicalSummary'); if (!el) return;
  const p = mergedClinicalProfile(gls('clinicalProfile'));
  el.innerHTML = `<div class="clinical-head"><span class="source-badge doctor">의사 진료</span><strong>검사 결과 요약</strong></div><p>${p.summary.replace(/\n/g, '<br>')}</p><div class="clinical-facts"><span>구조·정렬 이상 없음</span><span>거북목 경미</span><span>코어 안정성 부족</span><span>전방경사 경미·기능성</span></div><div class="medical-rec"><span class="source-badge doctor">의사 권고</span>필라테스 주 1회 · 8주</div><small>핵심 목표: ${p.goals.join(' · ')} · 평가일 ${p.assessedAt}</small>`;
}
function countSessions(id) { const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 6); return Object.keys(_cache).filter(k => k.startsWith(`session:${id}:`) && /^\d{4}-\d{2}-\d{2}$/.test(k.slice(-10)) && new Date(k.slice(-10)) >= cutoff).length; }
function renderWeeklyGoals() {
  const el = document.getElementById('weeklyGoals'); if (!el) return;
  el.innerHTML = `<strong>주간 목표</strong><div class="goal-grid"><span>헬스 A 주 1회</span><span>헬스 B 주 1회</span><span>필라테스 ${countSessions('pilates')}/1</span><span>홈코어 ${countSessions('home-core')}/2</span><span>수영 주 1회</span><span>걷기·회복 선택</span></div><p>필라테스 요일은 고정하지 않습니다. 강도가 중간 이상이거나 복부·둔근 근육통이 있으면 다음 날 하체 고강도 운동에 주의하세요. 같은 부위 피로·통증이 있으면 상태에 따라 48시간 회복을 권장합니다.</p>`;
}
function changeSessionDate(id, date) { sessionDates[id] = date; showSessionRoutine(id, document.querySelector(`.session-tab[data-session="${id}"]`), date); }
function showSessionRoutine(id, button, requestedDate) {
  document.querySelectorAll('.session-tab').forEach(b => {
    const active = b === button;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  const date = requestedDate || sessionDates[id] || todayStr(); sessionDates[id] = date;
  const el = document.getElementById('sessionRoutineContent'); if (!el) return; const rec = sessionRecord(id, date);
  const mode = rec.savedAt ? `<div class="session-mode edit">기존 기록 수정 · 저장 전 자동 백업</div>` : `<div class="session-mode">신규 기록 · 하루 1세션</div>`;
  const dateField = `<label class="full">세션 날짜<input id="${id}Date" type="date" value="${date}" onchange="changeSessionDate('${id}',this.value)"></label>`;
  if (id === 'pilates') {
    const discomforts = [['Neck','neck','목 불편감'],['Back','back','허리 불편감'],['Ql','rightQl','오른쪽 QL 불편감'],['Hip','hip','고관절 불편감'],['Core','coreFeel','코어 사용감'],['NextDay','nextDay','다음 날 통증 또는 피로']];
    el.innerHTML = `<div class="session-card"><div class="session-head"><div><span class="source-badge doctor">의사 권고</span><h3>필라테스</h3></div><b>주 1회 · 8주 · 기본 50분</b></div>${mode}<p>저강도~중강도 세션</p><div class="session-form">${dateField}<label>수업 시간<input id="pilatesMinutes" type="number" inputmode="numeric" value="${rec.minutes || 50}"></label><label>운동 강도<select id="pilatesIntensity"><option value="">선택</option>${['낮음','중간','높음'].map(v => `<option${rec.intensity === v ? ' selected' : ''}>${v}</option>`).join('')}</select></label>${discomforts.map(([id2,key,label]) => `<label>${label}<input id="pilates${id2}" value="${rec[key] || ''}" placeholder="없음 / 0~10 / 메모"></label>`).join('')}<label class="full">메모<textarea id="pilatesNote">${rec.note || ''}</textarea></label></div><button class="session-save" onclick="saveSessionRoutine('pilates')">${rec.savedAt ? '기존 기록 수정 저장' : '새 세션 기록 저장'}</button></div>`;
  } else {
    el.innerHTML = `<div class="session-card"><div class="session-head"><div><span class="source-badge app">앱 제안</span><h3>홈코어</h3></div><b>주 2회 · 8~10분</b></div>${mode}<div class="session-form">${dateField}</div>${HOME_CORE_EXERCISES.map((x,i) => `<label class="home-core-item"><input id="hc_${i}" type="checkbox" ${rec.completed?.[i] ? 'checked' : ''}><span><strong>${i+1}. ${x[0]}</strong><b>${x[1]}</b><small>${x[2]}</small></span></label>`).join('')}<div class="session-form"><label>현재 불편감<input id="homeCorePain" value="${rec.pain || ''}"></label><label>다음 날 통증·피로<input id="homeCoreNextDay" value="${rec.nextDay || ''}"></label><label class="full">메모<textarea id="homeCoreNote">${rec.note || ''}</textarea></label></div><button class="session-save" onclick="saveSessionRoutine('home-core')">${rec.savedAt ? '기존 기록 수정 저장' : '새 세션 기록 저장'}</button></div>`;
  }
}
function renderLowerBodyStatus() {
  const el = document.getElementById('lowerBodyStatus'); if (!el) return;
  el.innerHTML = `<span class="source-badge app">앱 제안</span><h3>하체 운동 · ${LOWER_BODY_REINTRODUCTION.status}</h3>${LOWER_BODY_REINTRODUCTION.stages.map(x => `<p>${x}</p>`).join('')}<b>진행 조건</b><p>${LOWER_BODY_REINTRODUCTION.progress}</p><b>중단 조건</b><p>${LOWER_BODY_REINTRODUCTION.stop}</p><hr><h3>수트케이스 캐리 · ${SUITCASE_CARRY.status}</h3><p>${SUITCASE_CARRY.activation}</p><p>${SUITCASE_CARRY.dose} · ${SUITCASE_CARRY.stop}</p>`;
}
function buildRehab() { renderClinicalProfile(); renderWeeklyGoals(); showSessionRoutine('pilates', document.querySelector('.session-tab[data-session="pilates"]')); renderLowerBodyStatus(); }