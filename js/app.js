/* ═══ DATA ═══ */
const ROUTINES = {
  A: {
    label: 'A루틴',
    day: '월요일',
    tag: 'Push-Pull · 8종목',
    exercises: [
      {
        name: '랫풀다운',
        target: '광배근 · 대원근 · 이두',
        sets: 3,
        reps: '10/10/6',
        weight: '35/35/30kg',
        defKg: 35,
        con: '팔꿈치를 뒷주머니로. 등으로 당기기. 2초.',
        ecc: '광배근 완전 스트레칭 3초.',
        tip: '팔 먼저 피로 → 팔로 당기는 것. 팔꿈치 드라이브 큐.',
        warn: null,
      },
      {
        name: '덤벨 벤치프레스',
        target: '대흉근 · 삼두 · 전면삼각',
        sets: 3,
        reps: '10/10/10',
        weight: '현재 중량',
        defKg: 0,
        con: '가슴 조임. 정수리 위에서 살짝 모아주는 느낌. 1초.',
        ecc: '팔꿈치 90도. 어깨 아래 내려가지 않게. 3초.',
        tip: '어깨 앞쪽 당기면 그립 넓거나 깊이 과한 것.',
        warn: null,
      },
      {
        name: '덤벨 로우',
        target: '광배근 · 승모 중하부 · 능형근',
        sets: 3,
        reps: '10/10/10',
        weight: '14kg × 3',
        defKg: 14,
        con: '팔꿈치를 엉덩이 방향으로. 배꼽 옆. 어깨뼈 조임.',
        ecc: '어깨뼈 완전히 열며 광배 스트레칭. 3초.',
        tip: '반대 손 벤치 짚어 허리 회전 최소화.',
        warn: null,
      },
      {
        name: '리버스 펙덱',
        target: '후면삼각 · 능형근 · 승모 중부',
        sets: 3,
        reps: '12/12/12',
        weight: '가볍게',
        defKg: 0,
        con: '팔꿈치 살짝 굽힌 채 양옆으로. 후면 어깨 조임. 2초.',
        ecc: '천천히 2초.',
        tip: '중량보다 자세. 후면 어깨 쥐어짜는 느낌.',
        warn: null,
      },
      {
        name: '레터럴 레이즈',
        target: '측면삼각근',
        sets: 3,
        reps: '12/12/12',
        weight: '매우 가볍게',
        defKg: 0,
        con: '새끼손가락이 엄지보다 살짝 높게. 2초.',
        ecc: '천천히 완전히 3초.',
        tip: '90도 이상 올리면 승모 개입. 중량 욕심 금물.',
        warn: null,
      },
      {
        name: '크런치',
        target: '복직근',
        sets: 3,
        reps: '15/15/15',
        weight: '자중',
        defKg: 0,
        con: '배꼽을 척추 쪽으로. 복근으로 일어나기.',
        ecc: '완전히 눕지 않고 긴장 유지. 2초.',
        tip: '처방 운동. 무릎 90도. 목으로 당기지 말 것.',
        warn: null,
      },
      {
        name: '사이드 플랭크',
        target: '복사근 · 중둔근 · 왼쪽만',
        sets: 3,
        reps: '30초×3',
        weight: '자중',
        defKg: 0,
        con: '왼쪽을 아래로. 골반 들어올려 몸 일직선.',
        ecc: '30초 버티기.',
        tip: '처방 운동. 골반 전방경사 교정.',
        warn: '⚠️ 오른쪽 절대 금지. 왼쪽 아래로만.',
      },
      {
        name: '레그 익스텐션',
        target: '대퇴사두 · 오른쪽만 · 재활',
        sets: 3,
        reps: '15/15/15',
        weight: '가볍게',
        defKg: 0,
        con: '무릎 90% 지점까지만. 완전 신전 금지. 1~2초.',
        ecc: '천천히 버티며 2~3초.',
        tip: '재활 처방. 대퇴직근 단축 교정.',
        warn: '⚠️ 오른쪽만. 통증 오면 즉시 중단.',
      },
    ],
  },
  B: {
    label: 'B루틴',
    day: '목요일',
    tag: 'Pull 위주 · 5종목',
    exercises: [
      {
        name: '랫풀다운',
        target: '광배근 · 대원근 · 이두',
        sets: 3,
        reps: '10/10/6',
        weight: '35/35/30kg',
        defKg: 35,
        con: '팔꿈치를 뒷주머니로. 등으로 당기기.',
        ecc: '3초. 광배 완전 스트레칭.',
        tip: '팔 피로 먼저 → 팔로 당기는 것.',
        warn: null,
      },
      {
        name: '덤벨 로우',
        target: '광배근 · 승모 중하부 · 능형근',
        sets: 3,
        reps: '10/10/10',
        weight: '14kg × 3',
        defKg: 14,
        con: '팔꿈치 엉덩이 방향. 어깨뼈 조임.',
        ecc: '3초. 광배 스트레칭.',
        tip: '허리 회전 최소화.',
        warn: null,
      },
      {
        name: '크런치',
        target: '복직근',
        sets: 3,
        reps: '15/15/15',
        weight: '자중',
        defKg: 0,
        con: '복근으로 일어나기.',
        ecc: '긴장 유지 2초.',
        tip: '처방. 무릎 90도.',
        warn: null,
      },
      {
        name: '사이드 플랭크',
        target: '복사근 · 중둔근 · 왼쪽만',
        sets: 3,
        reps: '30초×3',
        weight: '자중',
        defKg: 0,
        con: '왼쪽 아래. 골반 일직선.',
        ecc: '30초 유지.',
        tip: '처방.',
        warn: '⚠️ 오른쪽 절대 금지.',
      },
      {
        name: '레그 익스텐션',
        target: '대퇴사두 · 오른쪽만 · 재활',
        sets: 3,
        reps: '15/15/15',
        weight: '가볍게',
        defKg: 0,
        con: '90% 지점까지.',
        ecc: '2~3초.',
        tip: '재활.',
        warn: '⚠️ 오른쪽만. 통증 시 즉시 중단.',
      },
    ],
  },
  C: {
    label: 'C루틴',
    day: '선택일 (일)',
    tag: '상체 Push · 5종목',
    exercises: [
      {
        name: '체스트 프레스',
        target: '대흉근 · 삼두 · 전면삼각',
        sets: 3,
        reps: '10/10/10',
        weight: '조절',
        defKg: 0,
        con: '가슴 조임 1초.',
        ecc: '가슴 스트레칭 3초.',
        tip: '견갑골 등받이 고정.',
        warn: null,
      },
      {
        name: '숄더 프레스',
        target: '삼각근 · 삼두',
        sets: 3,
        reps: '10/10/10',
        weight: '조절',
        defKg: 0,
        con: '자연스럽게 밀어올리기 1초.',
        ecc: '어깨 높이 아래로 3초.',
        tip: '허리 과신전 주의.',
        warn: null,
      },
      {
        name: '리버스 펙덱',
        target: '후면삼각 · 능형근',
        sets: 3,
        reps: '12/12/12',
        weight: '가볍게',
        defKg: 0,
        con: '후면 어깨 쥐어짜기 2초.',
        ecc: '2초.',
        tip: '자세 우선.',
        warn: null,
      },
      {
        name: '레터럴 레이즈',
        target: '측면삼각근',
        sets: 3,
        reps: '12/12/12',
        weight: '매우 가볍게',
        defKg: 0,
        con: '새끼손가락 높이 2초.',
        ecc: '천천히 3초.',
        tip: '어깨 높이 이상 금지.',
        warn: null,
      },
      {
        name: '케이블 푸쉬다운',
        target: '삼두박근',
        sets: 3,
        reps: '12/12/12',
        weight: '조절',
        defKg: 0,
        con: '팔꿈치 고정. 삼두로 밀기 1초.',
        ecc: '스트레칭 2초.',
        tip: '팔꿈치 앞뒤 흔들림 = 무효.',
        warn: null,
      },
    ],
  },
};
const CORRECTIONS = [
  {
    name: 'QL 이완',
    dur: '60초',
    detail:
      '옆으로 누운 상태에서 오른쪽 허리 위로 폼롤러 대고 천천히 체중 실기.\n\n목적: 오른쪽 QL 과긴장 완화 — 골반 교정의 전제 조건.',
  },
  {
    name: '클램쉘',
    dur: '15회 × 3세트',
    detail:
      '옆으로 누워 무릎 굽히고, 발 붙인 채 위쪽 무릎만 천장 향해 벌리기. 골반은 뒤로 굴리지 않음.\n\n목적: 중둔근 활성화. 이상근 보상 패턴 차단.\n\n💡 복귀 기준: 30회 무통증 → 레그프레스·런지 복귀 조건 절반.',
  },
  {
    name: '한발 브릿지',
    dur: '15초 × 3세트',
    detail:
      '누워서 한쪽 발만 바닥에 놓고 골반 들어올리기.\n\n목적: 대둔근 편측 활성화.\n\n💡 복귀 기준: 오른발 15초 안정 → 레그프레스·런지 복귀 조건 절반.',
  },
  {
    name: '데드버그',
    dur: '10회 × 2세트',
    detail:
      '누운 상태에서 팔과 반대쪽 다리를 동시에 천천히 내리며 허리가 바닥에서 뜨지 않게.\n\n목적: 코어 안정화 — 다열근·횡복근 활성화.',
  },
  {
    name: '왼쪽 대퇴직근 스트레칭',
    dur: '30초 × 3',
    detail:
      '서서 왼발을 뒤로 잡아 스트레칭.\n\n⚠️ 가설: 왼쪽 대퇴직근+중둔근 단축 → 오른쪽 QL·고관절 과부하 패턴. 진료 시 담당의에게 보고.',
  },
];
const SWIM_DRILLS = [
  {
    name: '외팔 드릴 (왼팔)',
    ratio: '5비율',
    detail:
      '오른팔 앞으로 뻗어 고정, 왼팔만 스트로크.\n\n목적: 왼팔 캐치 감각 단독 발달.\n\n💡 큐: ① 입수 시 팔꿈치가 손보다 높게 ② 전완으로 물 걸기 (손목 스냅 X)',
  },
  {
    name: '외팔 드릴 (오른팔)',
    ratio: '3비율',
    detail:
      '왼팔 고정, 오른팔만 스트로크.\n\n목적: 오른팔 팔꿈치 수면 유지 교정.',
  },
  {
    name: '캐치업 드릴',
    ratio: '2비율',
    detail:
      '한쪽 팔이 완전히 앞 도달 전까지 다른 팔 입수 안 함.\n\n목적: 양팔 타이밍 정렬.',
  },
  {
    name: '풀스트로크',
    ratio: '확인',
    detail:
      '드릴 감각을 풀스트로크에서 유지 가능한지 체크.\n\n⚠️ CO₂ 주의: 물속 호기를 완전히 내뱉지 않으면 CO₂ 축적으로 먼저 힘들어짐.',
  },
];
const SWIM_CONCEPTS = [
  {
    name: '캐치 = 앵커',
    detail: '손·전완을 물에 고정(앵커)하고 몸통이 앞으로 지나가는 것.',
  },
  {
    name: '피니쉬 오해 주의',
    detail:
      '피니쉬는 광배 수축이 끝나는 지점에서 자연스럽게 이탈. "손목 스냅으로 물을 찬다"는 틀린 개념.',
  },
  {
    name: 'CO₂ 호흡 패턴',
    detail:
      '숨이 빨리 차는 건 CO₂ 축적. 물속 호기 완전히 내뱉어야. 바디롤 부족 → 흡기 창구 좁음 → 악순환.',
  },
];
const RULES = [
  {
    num: '01',
    text: '마지막 세트가 쉬우면 다음번 5% 증량 — 자극 없으면 성장 없음.',
  },
  {
    num: '02',
    text: '세트 간 휴식 60~90초 — 더 짧으면 젖산 피로, 더 길면 온도 떨어짐.',
  },
  { num: '03', text: '같은 부위 48시간 회복 — 월 헬스 후 화 헬스 절대 금지.' },
  { num: '04', text: '헬스 + 수영 같은 날 금지 — 회복 자원 충돌.' },
  {
    num: '05',
    text: '통증 부위 직접 자극 금지 — 근육 자극 vs 관절 통증 구분 필수.',
  },
  { num: '06', text: 'RDL은 이상근 통증 0 상태 1주 유지 후에만.' },
  {
    num: '07',
    text: '기구 고장 시 동작 패턴 동일한 것 1순위: 프레스→프레스, 풀→풀.',
  },
];
const RECOVERY_CHECKS = [
  { move: '클램쉘', pass: '30회 무통증', unlock: '레그프레스·런지 복귀' },
  {
    move: '한발 브릿지',
    pass: '오른발 15초 안정',
    unlock: '레그프레스·런지 복귀',
  },
  { move: '이상근 통증', pass: '0 상태 1주 유지', unlock: 'RDL 복귀' },
];
const PAIN_GUIDE = [
  {
    type: '근육 자극',
    color: 'var(--green)',
    desc: '타겟 부위 화끈·뻐근. 정상 — 계속 진행.',
  },
  {
    type: '관절 통증',
    color: 'var(--yellow)',
    desc: '관절 라인·움직일 때 시큰. 즉시 중단.',
  },
  {
    type: '신경 증상',
    color: 'var(--red)',
    desc: '저림·찌릿·방사통. 즉시 중단 + 진료 검토.',
  },
];
const DAY_INFO = [
  { label: '월', type: 'A', rk: 'A' },
  { label: '화', type: '걷기', rk: null },
  { label: '수', type: '휴식', rk: null },
  { label: '목', type: 'B', rk: 'B' },
  { label: '금', type: '걷기', rk: null },
  { label: '토', type: '수영', rk: null },
  { label: '일', type: 'C?', rk: 'C' },
];
const BAR_WEIGHTS = [
  { label: '바벨 20kg', kg: 20 },
  { label: 'EZ바 10kg', kg: 10 },
  { label: '덤벨', kg: 0 },
];
const MUSCLE_MAP = {
  랫풀다운: ['등', '광배'],
  '덤벨 로우': ['등', '광배'],
  '덤벨 벤치프레스': ['가슴'],
  '체스트 프레스': ['가슴'],
  '리버스 펙덱': ['후면어깨', '등'],
  '레터럴 레이즈': ['측면어깨'],
  '숄더 프레스': ['어깨'],
  '케이블 푸쉬다운': ['삼두'],
  크런치: ['코어'],
  '사이드 플랭크': ['코어'],
  '레그 익스텐션': ['하체'],
};
let selectedBar = 0;

/* ═══ STORAGE ═══ */
const _cache = {};
function gls(k) {
  return _cache[k] ?? null;
}
function sls(k, v) {
  _cache[k] = v;
  try {
    localStorage.setItem('routine:' + k, JSON.stringify(v));
  } catch {}
  if (window.storage) window.storage.set(k, JSON.stringify(v)).catch(() => {});
}
async function initStorage() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('routine:')) {
        const k = key.replace('routine:', '');
        try {
          _cache[k] = JSON.parse(localStorage.getItem(key));
        } catch {}
      }
    }
  } catch {}
  if (!window.storage) return;
  try {
    const keys = await window.storage.list('');
    if (keys?.keys)
      await Promise.all(
        keys.keys.map(async (k) => {
          try {
            const r = await window.storage.get(k);
            if (r) _cache[k] = JSON.parse(r.value);
          } catch {}
        }),
      );
  } catch {}
}
function getRecord(k) {
  return gls('rec:' + k) || {};
}
function saveRecord(k, v) {
  sls('rec:' + k, v);
}
function getHistory() {
  return gls('wh') || [];
}
function addHistory(e) {
  const h = getHistory();
  h.unshift(e);
  sls('wh', h.slice(0, 90));
}
function fmtDate(d) {
  const y = d.getFullYear(),
    m = String(d.getMonth() + 1).padStart(2, '0'),
    day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function todayStr() {
  return fmtDate(new Date());
}

/* ═══ STREAK ═══ */
function getStreak() {
  return gls('streak') || { count: 0, lastDate: null };
}
function checkStreak() {
  const s = getStreak();
  if (s.lastDate === todayStr()) return s.count;
  const y = new Date(todayStr());
  y.setDate(y.getDate() - 1);
  return s.lastDate === fmtDate(y) ? s.count : 0;
}
function markWorkoutDay() {
  const today = todayStr();
  const s = getStreak();
  if (s.lastDate === today) return s.count;
  const y = new Date(today);
  y.setDate(y.getDate() - 1);
  const nc = s.lastDate === fmtDate(y) ? s.count + 1 : 1;
  sls('streak', { count: nc, lastDate: today });
  return nc;
}

/* ═══ HEADER + WEEK STRIP ═══ */
function buildHeader() {
  const now = new Date();
  const h = now.getHours();
  document.getElementById('greeting').textContent =
    h < 12
      ? '좋은 아침이에요 ☀️'
      : h < 18
        ? '좋은 오후예요 🌤'
        : '좋은 저녁이에요 🌙';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  document.getElementById('todayLabel').textContent =
    `${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
  document.getElementById('streakNum').textContent = checkStreak();
}
function buildWeekStrip() {
  const strip = document.getElementById('weekStrip');
  const jsMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIdx = jsMap[new Date().getDay()];
  DAY_INFO.forEach((d, i) => {
    const pill = document.createElement('div');
    const isDone = gls('done:' + getDateForDayIdx(i));
    pill.className =
      'day-pill' +
      (i === todayIdx ? ' today' : '') +
      (isDone ? ' done' : '') +
      (d.rk ? ' clickable' : '');
    if (d.rk)
      pill.onclick = () => {
        switchTabById('gym');
        showRoutine(d.rk);
      };
    pill.innerHTML = `<span class="dp-label">${d.label}</span><span class="dp-type">${d.type}</span>${isDone ? '<span class="dp-check">✓</span>' : ''}`;
    strip.appendChild(pill);
  });
}
function getDateForDayIdx(idx) {
  const jsMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIdx = jsMap[new Date().getDay()];
  const d = new Date();
  d.setDate(d.getDate() + (idx - todayIdx));
  return fmtDate(d);
}

/* ═══ COACHING ENGINE ═══ */
function getExHistory(rk, idx) {
  const prefix = `rec:${rk}_${idx}_`;
  return Object.keys(_cache)
    .filter((k) => k.startsWith(prefix))
    .map((k) => ({ date: k.replace(prefix, ''), rec: gls(k) }))
    .filter((x) => x.rec?.summary)
    .sort((a, b) => b.date.localeCompare(a.date));
}
function maxKgRec(rec, sets) {
  let m = 0;
  for (let s = 0; s < sets; s++) m = Math.max(m, +rec['kg_' + s] || 0);
  return m;
}
function bestE1RM(rec, sets) {
  let m = 0;
  for (let s = 0; s < sets; s++) {
    const k = +rec['kg_' + s] || 0,
      r = +rec['reps_' + s] || 0;
    if (k && r) m = Math.max(m, k * (1 + r / 30));
  }
  return m;
}
function roundHalf(v) {
  return Math.round(v * 2) / 2;
}

/* ── PLATEAU DETECTION ── */
function detectPlateau(rk, idx) {
  const ex = ROUTINES[rk].exercises[idx];
  const hist = getExHistory(rk, idx).slice(0, 4);
  if (hist.length < 3) return null;
  const kgs = hist.map((h) => maxKgRec(h.rec, ex.sets)).filter((v) => v > 0);
  if (kgs.length < 3) return null;
  const diff = Math.max(...kgs) - Math.min(...kgs);
  if (diff < 2.5 && hist.every((h) => h.rec.allDone)) {
    return `정체 ${hist.length}회 감지. 볼륨(세트 수) 늘리거나 휴식 단축 시도.`;
  }
  return null;
}

/* ── SMART RECOMMENDATION (NEW) ── */
function getSmartRec(rk, idx) {
  const ex = ROUTINES[rk].exercises[idx];
  const hist = getExHistory(rk, idx);
  if (!hist.length)
    return {
      action: 'START',
      kg: ex.defKg || 0,
      msg: `첫 기록 — ${ex.weight} 기준으로 시작. RPE 8 목표.`,
      restSecs: 90,
    };
  const last = hist[0].rec;
  const lastKg = maxKgRec(last, ex.sets);
  const lastRpe = +last.rpe || 0;
  const lastPain = last.pain || '';
  const done = last.allDone;
  if (lastPain === 'joint' || lastPain === 'nerve')
    return {
      action: 'REDUCE',
      kg: roundHalf(lastKg * 0.85),
      msg: `통증 기록 → 중량 15% 감량 (${roundHalf(lastKg * 0.85)}kg). 자세 집중.`,
      restSecs: 90,
    };
  if (!done)
    return {
      action: 'RETRY',
      kg: lastKg,
      msg: `미완료 → ${lastKg}kg 동일 중량 재시도. 마지막 세트 1~2회 여유.`,
      restSecs: 90,
    };
  if (lastRpe >= 9)
    return {
      action: 'MAINTAIN',
      kg: lastKg,
      msg: `RPE ${lastRpe} — ${lastKg}kg 유지. 형태 우선. 증량 금지.`,
      restSecs: 120,
    };
  if (lastRpe >= 1 && lastRpe <= 7)
    return {
      action: 'INCREASE',
      kg: roundHalf(lastKg * 1.05),
      msg: `RPE ${lastRpe} — +5% 증량 시도: ${roundHalf(lastKg * 1.05)}kg. 자세 무너지면 원중량.`,
      restSecs: 75,
    };
  return {
    action: 'MAINTAIN',
    kg: lastKg,
    msg: `${lastKg}kg 유지 또는 마지막 세트만 +1~2회.`,
    restSecs: 90,
  };
}

/* ── ADAPTIVE REST ── */
let lastRestSecs = 90;
function setRestDuration(secs) {
  lastRestSecs = secs;
  restTotal = secs;
  const hint = document.getElementById('restHint');
  if (hint)
    hint.textContent =
      secs === 120
        ? '💪 고강도 세트 — 120초 자동 설정'
        : secs === 75
          ? '😊 여유 있음 — 75초로 단축'
          : '⏱ 표준 90초';
}

/* ═══ PROGRESS ═══ */
let currentRoutine = 'A';
function updateProgress() {
  const r = ROUTINES[currentRoutine];
  const today = todayStr();
  let done = 0;
  r.exercises.forEach((_, i) => {
    const rec = getRecord(`${currentRoutine}_${i}_${today}`);
    if (rec.allDone) done++;
  });
  const total = r.exercises.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const circ = 2 * Math.PI * 19;
  document.getElementById('progFill').style.strokeDashoffset =
    circ * (1 - pct / 100);
  document.getElementById('progLabel').textContent = pct + '%';
  document.getElementById('progTitle').textContent =
    done === 0
      ? '오늘 운동 시작해봐'
      : done === total
        ? '🎉 모두 완료!'
        : `${done}/${total} 종목 완료`;
  document.getElementById('progSub').textContent =
    done > 0
      ? `총 볼륨 ${computeVolume(currentRoutine)}kg`
      : `${r.label} · ${r.tag}`;
  const banner = document.getElementById('completeBanner');
  if (done === total && total > 0) {
    if (!banner.classList.contains('show')) {
      banner.classList.add('show');
      document.getElementById('completeExCount').textContent = total;
      document.getElementById('completeVolume').textContent =
        computeVolume(currentRoutine);
      let ts = 0;
      r.exercises.forEach((e) => (ts += e.sets));
      document.getElementById('completeSets').textContent = ts;
      const now = new Date();
      document.getElementById('completeTime').textContent =
        `${now.getHours()}시 ${String(now.getMinutes()).padStart(2, '0')}분 완료`;
      sls('done:' + todayStr(), true);
      const nc = markWorkoutDay();
      document.getElementById('streakNum').textContent = nc;
      addHistory({
        date: todayStr(),
        routine: r.label,
        summary: `${computeVolume(currentRoutine)}kg · ${ts}세트`,
      });
      renderEnhancedDone();
    }
  } else banner.classList.remove('show');
  updateCoachPanel();
  updateTodaySummary();
  updateStickyProgress();
  updateCoachNudge();
}

function computeVolume(rk) {
  const today = todayStr();
  const r = ROUTINES[rk];
  let vol = 0;
  r.exercises.forEach((ex, i) => {
    const rec = getRecord(`${rk}_${i}_${today}`);
    for (let s = 0; s < ex.sets; s++)
      vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
  });
  return Math.round(vol);
}

/* ═══ ROUTINE RENDERING ═══ */
function buildSelector() {
  const sel = document.getElementById('routineSelector');
  ['A', 'B', 'C'].forEach((k) => {
    const c = document.createElement('button');
    c.className = 'routine-chip' + (k === currentRoutine ? ' active' : '');
    c.dataset.rk = k;
    c.onclick = () => showRoutine(k);
    c.innerHTML = `<strong>${ROUTINES[k].label}</strong> ${ROUTINES[k].day}`;
    sel.appendChild(c);
  });
}
function showRoutine(key) {
  currentRoutine = key;
  document
    .querySelectorAll('.routine-chip')
    .forEach((c) => c.classList.toggle('active', c.dataset.rk === key));
  const r = ROUTINES[key];
  const today = todayStr();
  const content = document.getElementById('routineContent');
  content.innerHTML = `<div class="sec-hdr"><div class="sec-icon">🏋️</div><div class="sec-title">${r.label} — ${r.day}</div><div class="sec-badge">${r.tag}</div></div>`;
  r.exercises.forEach((ex, idx) => {
    const rec = getRecord(`${key}_${idx}_${today}`);
    const isDone = !!rec.allDone;
    const prKey = `pr:${key}_${idx}`;
    const pr = gls(prKey) || 0;

    /* ── SMART REC (NEW) ── */
    const smartRec = getSmartRec(key, idx);
    const plateau = detectPlateau(key, idx);

    /* Previous session data for pre-fill */
    const hist = getExHistory(key, idx);
    const prevRec = hist[0]?.rec || {};

    let setRowsHtml = '';
    for (let s = 0; s < ex.sets; s++) {
      /* Pre-fill: today > previous session > default */
      const todayKg = rec['kg_' + s];
      const todayRp = rec['reps_' + s];
      const prevKg = prevRec['kg_' + s];
      const prevRp = prevRec['reps_' + s];
      const kgVal =
        todayKg !== undefined ? todayKg : prevKg !== undefined ? prevKg : '';
      const rpVal =
        todayRp !== undefined ? todayRp : prevRp !== undefined ? prevRp : '';
      const isPrefilled = todayKg === undefined && prevKg !== undefined;
      const checked = !!rec['checked_' + s];
      const e1 =
        kgVal && rpVal
          ? `<div class="set-1rm show" id="orm_${idx}_${s}">추정 1RM: ${(parseFloat(kgVal) * (1 + parseInt(rpVal) / 30)).toFixed(1)}kg</div>`
          : '<div class="set-1rm" id="orm_${idx}_${s}"></div>';
      setRowsHtml += `
<div class="rec-set-row">
  <div class="set-card-head">
    <span class="set-title">SET ${s + 1}</span>
    <button class="set-check-btn${checked ? ' checked' : ''}" id="chk_${idx}_${s}" onclick="toggleSetCheck(${idx},${s})" type="button">✓ 완료</button>
  </div>
  <div class="rec-inputs">
    <div class="rec-fw">
      <div class="rec-flbl">중량 KG</div>
      <div class="adj-wrap">
        <button class="adj-s" onclick="adj('kg',${idx},${s},-2.5)" type="button">−</button>
        <input class="rec-inp${isPrefilled ? ' prefilled' : ''}" type="number" inputmode="decimal" placeholder="—" id="kg_${idx}_${s}" value="${kgVal}" onchange="onInpChange(${idx},${s})">
        <button class="adj-s" onclick="adj('kg',${idx},${s},2.5)" type="button">+</button>
      </div>${e1}
    </div>
    <div class="rec-fw">
      <div class="rec-flbl">횟수 REP</div>
      <div class="adj-wrap">
        <button class="adj-s" onclick="adj('rp',${idx},${s},-1)" type="button">−</button>
        <input class="rec-inp${isPrefilled ? ' prefilled' : ''}" type="number" inputmode="numeric" placeholder="—" id="rp_${idx}_${s}" value="${rpVal}" onchange="onInpChange(${idx},${s})">
        <button class="adj-s" onclick="adj('rp',${idx},${s},1)" type="button">+</button>
      </div>
    </div>
  </div>
</div>`;
    }
    const prevHtml = rec.summary
      ? `<div class="rec-prev">이전: <strong>${rec.summary}</strong></div>`
      : prevRec.summary
        ? `<div class="rec-prev">참고 (${hist[0]?.date || '?'}): <strong>${prevRec.summary}</strong></div>`
        : '';

    /* Coach rec bar (NEW) */
    const applyKg =
      smartRec.kg > 0
        ? `<button class="crb-apply-btn" onclick="applyRec(${idx},${smartRec.kg})">✓ ${smartRec.kg}kg 적용</button>`
        : '';
    const recBar = `<div class="coach-rec-bar"><span class="crb-icon">${smartRec.action === 'INCREASE' ? '📈' : smartRec.action === 'REDUCE' ? '📉' : smartRec.action === 'MAINTAIN' ? '⚖️' : '🎯'}</span><span class="crb-text">${smartRec.msg}</span>${applyKg}</div>`;
    const plateauWarn = plateau
      ? `<div class="plateau-warning">📊 ${plateau}</div>`
      : '';

    const rpeVal = rec.rpe || '';
    const painVal = rec.pain || '';
    const noteVal = (rec.note || '').replace(/"/g, '&quot;');
    const extraHtml = `<div class="rec-extra"><select id="rpe_${idx}"><option value="">RPE 선택</option>${[6, 7, 8, 9, 10].map((v) => `<option value="${v}"${String(rpeVal) === String(v) ? ' selected' : ''}>RPE ${v} ${v <= 6 ? '쉬움' : v === 7 ? '여유' : v === 8 ? '적정' : v === 9 ? '힘듦' : '한계'}</option>`).join('')}</select><select id="pain_${idx}"><option value="">통증 없음</option><option value="muscle"${painVal === 'muscle' ? ' selected' : ''}>근육 자극</option><option value="joint"${painVal === 'joint' ? ' selected' : ''}>관절 시큰</option><option value="nerve"${painVal === 'nerve' ? ' selected' : ''}>저림/방사통</option></select><textarea class="rec-note" id="note_${idx}" placeholder="오늘 느낌 메모: 광배 느낌, 허리 당김 등">${noteVal}</textarea></div>`;

    const prHtml = pr
      ? `<span class="pr-badge" style="display:inline-flex">🏆 PR ${pr}kg</span>`
      : '';
    const vol = (() => {
      let v = 0;
      for (let s = 0; s < ex.sets; s++)
        v += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
      return v;
    })();
    const volHtml =
      vol > 0
        ? `<span class="vol-badge" style="display:inline-flex">${vol}kg</span>`
        : '';
    const plateauBadgeHtml = plateau
      ? `<span class="plateau-badge" style="display:inline-flex">📊 정체</span>`
      : '';

    const card = document.createElement('div');
    card.className =
      'ex-card' + (isDone ? ' done' : '') + (plateau ? ' plateau' : '');
    card.id = 'ex-' + idx;
    card.innerHTML = `
<div class="ex-head" onclick="toggleCard(${idx})">
  <div class="ex-num">${String(idx + 1).padStart(2, '0')}</div>
  <div class="ex-name-wrap"><span class="ex-name">${ex.name}</span><span class="ex-target">${ex.target}</span></div>
  <div class="ex-right">${volHtml}${prHtml}${plateauBadgeHtml}<div class="done-check">✓</div><span class="ex-chev">▾</span></div>
</div>
<div class="ex-sets-row">
  <div class="set-chip">📦 ${ex.sets}세트</div>
  <div class="set-chip">🔁 ${ex.reps}</div>
  <div class="set-chip">⚖️ ${ex.weight}</div>
</div>
<div class="ex-detail">
  <div class="dl"><div class="dl-label">⬆ 수축</div><div class="dl-text">${ex.con}</div></div>
  <div class="dl"><div class="dl-label">⬇ 이완</div><div class="dl-text">${ex.ecc}</div></div>
  ${ex.tip ? `<div class="tip-box">💡 ${ex.tip}</div>` : ''}
  ${ex.warn ? `<div class="warn-box">⚠️ ${ex.warn}</div>` : ''}
</div>
<div class="rec-toggle" onclick="toggleRecord(this)">
  <span class="rec-toggle-lbl">📝 오늘 기록</span>
  <span style="font-size:12px;color:var(--text-3)">▾</span>
</div>
<div class="rec-body">${prevHtml}${recBar}${plateauWarn}<div class="quick-row"><button class="quick-btn primary" onclick="copyPrevious(${idx})" type="button">지난 기록 복사</button><button class="quick-btn" onclick="sameAsFirst(${idx})" type="button">1세트로 통일</button><button class="quick-btn" onclick="bumpExercise(${idx},2.5)" type="button">전체 +2.5kg</button><button class="quick-btn danger" onclick="stopForPain(${idx})" type="button">통증 중단</button></div>${setRowsHtml}${extraHtml}<button class="rec-save-btn" onclick="saveEx(${idx})" type="button">저장</button></div>`;
    content.appendChild(card);
  });
  updateProgress();
}

/* ── APPLY RECOMMENDATION (NEW) ── */
function applyRec(idx, kg) {
  const ex = ROUTINES[currentRoutine].exercises[idx];
  for (let s = 0; s < ex.sets; s++) {
    const el = document.getElementById(`kg_${idx}_${s}`);
    if (el) {
      el.value = kg;
      el.classList.remove('prefilled');
    }
  }
  onInpChange(idx, 0);
  showToast(`✅ ${kg}kg 적용됨`);
}

function toggleCard(idx) {
  document.getElementById('ex-' + idx)?.classList.toggle('open');
}
function toggleRecord(el) {
  el.parentElement.classList.toggle('rec-open');
}

function adj(type, idx, s, d) {
  const id = type === 'kg' ? `kg_${idx}_${s}` : `rp_${idx}_${s}`;
  const el = document.getElementById(id);
  if (!el) return;
  let v = parseFloat(el.value) || 0;
  v =
    type === 'kg'
      ? Math.max(0, roundHalf(v + d))
      : Math.max(0, Math.round(v + d));
  el.value = v;
  el.classList.remove('prefilled');
  onInpChange(idx, s);
}
function onInpChange(idx, s) {
  const kg = document.getElementById(`kg_${idx}_${s}`)?.value || '';
  const rp = document.getElementById(`rp_${idx}_${s}`)?.value || '';
  const ormEl = document.getElementById(`orm_${idx}_${s}`);
  if (ormEl && kg && rp) {
    ormEl.textContent = `추정 1RM: ${(parseFloat(kg) * (1 + parseInt(rp) / 30)).toFixed(1)}kg`;
    ormEl.classList.add('show');
  }
  clearTimeout(window['_t' + idx]);
  window['_t' + idx] = setTimeout(() => saveEx(idx, true), 600);
}
function toggleSetCheck(idx, s) {
  const btn = document.getElementById(`chk_${idx}_${s}`);
  const isChecked = btn.classList.toggle('checked');
  const today = todayStr();
  const rKey = `${currentRoutine}_${idx}_${today}`;
  const rec = getRecord(rKey);
  rec['checked_' + s] = isChecked;
  const kg = document.getElementById(`kg_${idx}_${s}`)?.value || '';
  const rp = document.getElementById(`rp_${idx}_${s}`)?.value || '';
  if (kg) rec['kg_' + s] = parseFloat(kg);
  if (rp) rec['reps_' + s] = parseInt(rp);

  /* ── Adaptive rest time (NEW) ── */
  if (isChecked) {
    const rpe = +document.getElementById(`rpe_${idx}`)?.value || 0;
    const restSecs = rpe >= 9 ? 120 : rpe >= 1 && rpe <= 7 ? 75 : 90;
    setRestDuration(restSecs);
    toggleRest(true);
  }

  const ex = ROUTINES[currentRoutine].exercises[idx];
  let allChecked = true;
  for (let i = 0; i < ex.sets; i++) {
    if (!rec['checked_' + i]) {
      allChecked = false;
      break;
    }
  }
  rec.allDone = allChecked;
  if (allChecked) {
    const parts = [];
    for (let i = 0; i < ex.sets; i++) {
      const k =
        document.getElementById(`kg_${idx}_${i}`)?.value ||
        rec['kg_' + i] ||
        '';
      const r =
        document.getElementById(`rp_${idx}_${i}`)?.value ||
        rec['reps_' + i] ||
        '';
      if (k && r) parts.push(`${k}kg×${r}`);
    }
    rec.summary = parts.join(' / ');
    const maxKg = Math.max(
      ...Array.from({ length: ex.sets }, (_, i) => +rec['kg_' + i] || 0),
    );
    const prKey = `pr:${currentRoutine}_${idx}`;
    const oldPR = gls(prKey) || 0;
    if (maxKg > oldPR && maxKg > 0) {
      sls(prKey, maxKg);
      showToast(`🏆 PR! ${maxKg}kg`);
    } else showToast('✅ ' + ex.name + ' 완료!');
    try {
      navigator.vibrate?.(60);
    } catch {}
  }
  rec.rpe = document.getElementById(`rpe_${idx}`)?.value || rec.rpe || '';
  rec.pain = document.getElementById(`pain_${idx}`)?.value || rec.pain || '';
  rec.note = document.getElementById(`note_${idx}`)?.value || rec.note || '';
  saveRecord(rKey, rec);
  document.getElementById('ex-' + idx)?.classList.toggle('done', allChecked);
  if (allChecked) openNextExercise(idx);
  updateProgress();
}
function saveEx(idx, silent) {
  const ex = ROUTINES[currentRoutine].exercises[idx];
  const today = todayStr();
  const rKey = `${currentRoutine}_${idx}_${today}`;
  const rec = getRecord(rKey);
  const parts = [];
  for (let s = 0; s < ex.sets; s++) {
    const kg = document.getElementById(`kg_${idx}_${s}`)?.value || '';
    const rp = document.getElementById(`rp_${idx}_${s}`)?.value || '';
    rec['kg_' + s] = parseFloat(kg) || 0;
    rec['reps_' + s] = parseInt(rp) || 0;
    if (kg && rp) parts.push(`${kg}kg×${rp}`);
  }
  rec.summary = parts.join(' / ');
  rec.rpe = document.getElementById(`rpe_${idx}`)?.value || '';
  rec.pain = document.getElementById(`pain_${idx}`)?.value || '';
  rec.note = document.getElementById(`note_${idx}`)?.value || '';
  saveRecord(rKey, rec);
  if (!silent) showToast('💾 저장됨');
  updateProgress();
}
function openNextExercise(idx) {
  const next = document.getElementById('ex-' + (idx + 1));
  document
    .querySelectorAll('.ex-card.open,.ex-card.rec-open')
    .forEach((c) => c.classList.remove('open', 'rec-open'));
  if (!next) {
    updateCoachNudge();
    return;
  }
  next.classList.add('open', 'rec-open');
  next.scrollIntoView({ behavior: 'smooth', block: 'center' });
  updateCoachNudge();
}

/* ═══ QUICK ACTIONS + FOCUS MODE ═══ */
function copyPrevious(idx) {
  const hist = getExHistory(currentRoutine, idx);
  if (!hist.length) {
    showToast('이전 기록 없음');
    return;
  }
  const ex = ROUTINES[currentRoutine].exercises[idx],
    rec = hist[0].rec;
  for (let s = 0; s < ex.sets; s++) {
    const kg = document.getElementById(`kg_${idx}_${s}`),
      rp = document.getElementById(`rp_${idx}_${s}`);
    if (kg && rec['kg_' + s] !== undefined) {
      kg.value = rec['kg_' + s];
      kg.classList.remove('prefilled');
    }
    if (rp && rec['reps_' + s] !== undefined) {
      rp.value = rec['reps_' + s];
      rp.classList.remove('prefilled');
    }
    onInpChange(idx, s);
  }
  showToast('지난 기록 복사됨');
}
function sameAsFirst(idx) {
  const ex = ROUTINES[currentRoutine].exercises[idx];
  const kg0 = document.getElementById(`kg_${idx}_0`)?.value || '';
  const rp0 = document.getElementById(`rp_${idx}_0`)?.value || '';
  if (!kg0 && !rp0) {
    showToast('1세트 값을 먼저 입력');
    return;
  }
  for (let s = 1; s < ex.sets; s++) {
    const kg = document.getElementById(`kg_${idx}_${s}`),
      rp = document.getElementById(`rp_${idx}_${s}`);
    if (kg0 && kg) {
      kg.value = kg0;
      kg.classList.remove('prefilled');
    }
    if (rp0 && rp) {
      rp.value = rp0;
      rp.classList.remove('prefilled');
    }
    onInpChange(idx, s);
  }
  showToast('전체 세트 통일됨');
}
function bumpExercise(idx, delta) {
  const ex = ROUTINES[currentRoutine].exercises[idx];
  for (let s = 0; s < ex.sets; s++) {
    const el = document.getElementById(`kg_${idx}_${s}`);
    if (!el) continue;
    const v = Math.max(0, roundHalf((+el.value || 0) + delta));
    el.value = v;
    el.classList.remove('prefilled');
    onInpChange(idx, s);
  }
  showToast(`${delta > 0 ? '+' : ''}${delta}kg 적용`);
}
function stopForPain(idx) {
  const pain = document.getElementById(`pain_${idx}`);
  if (pain) pain.value = 'joint';
  saveEx(idx, true);
  document.getElementById('ex-' + idx)?.classList.add('done');
  showToast('통증 중단 기록됨');
  try {
    navigator.vibrate?.([80, 40, 80]);
  } catch {}
}
function getCurrentExerciseIdx() {
  const r = ROUTINES[currentRoutine];
  for (let i = 0; i < r.exercises.length; i++) {
    if (!getRecord(`${currentRoutine}_${i}_${todayStr()}`).allDone) return i;
  }
  return Math.max(0, r.exercises.length - 1);
}
function updateStickyProgress() {
  const sp = document.getElementById('stickyProgress');
  if (!sp) return;
  if (!isGymTabActive()) {
    sp.style.display = 'none';
    return;
  }
  const r = ROUTINES[currentRoutine],
    idx = getCurrentExerciseIdx(),
    ex = r.exercises[idx];
  let done = 0;
  r.exercises.forEach((_, i) => {
    if (getRecord(`${currentRoutine}_${i}_${todayStr()}`).allDone) done++;
  });
  const pct = r.exercises.length
    ? Math.round((done / r.exercises.length) * 100)
    : 0;
  document.getElementById('spTitle').textContent =
    `${r.label} ${done}/${r.exercises.length} · ${ex?.name || '완료'}`;
  document.getElementById('spSub').textContent =
    `볼륨 ${computeVolume(currentRoutine)}kg · 회복 ${readinessScore()}점`;
  document.getElementById('spFill').style.width = pct + '%';
}
let focusIdx = null;
function isGymTabActive() {
  return document.getElementById('tab-gym')?.classList.contains('active');
}
function isFocusOpen() {
  return document.getElementById('focusOverlay')?.classList.contains('show');
}
function syncFocusVisibility() {
  const gym = isGymTabActive();
  document.body.classList.toggle('gym-active', gym);
  const overlay = document.getElementById('focusOverlay');
  const btn = document.getElementById('focusToggleBtn');
  const sticky = document.getElementById('stickyProgress');
  if (sticky) {
    sticky.style.display = gym ? 'flex' : 'none';
    sticky.setAttribute('aria-hidden', gym ? 'false' : 'true');
  }
  if (!gym && overlay) overlay.classList.remove('show');
  if (btn) {
    btn.classList.toggle('is-hidden', !gym);
    btn.classList.toggle('is-open', gym && isFocusOpen());
    btn.setAttribute('aria-hidden', gym ? 'false' : 'true');
    btn.disabled = !gym;
    btn.textContent = gym
      ? isFocusOpen()
        ? '집중모드 닫기'
        : '집중모드 열기'
      : '집중모드';
  }
  if (overlay) {
    overlay.setAttribute(
      'aria-hidden',
      gym && isFocusOpen() ? 'false' : 'true',
    );
    overlay.style.pointerEvents = gym && isFocusOpen() ? 'auto' : 'none';
  }
}
function updateFocusToggle() {
  syncFocusVisibility();
}
function toggleFocusMode() {
  if (!isGymTabActive()) {
    closeFocusMode(false);
    showToast('집중모드는 헬스 탭에서만 가능');
    return;
  }
  isFocusOpen() ? closeFocusMode() : openFocusMode();
}
function openFocusMode(idx) {
  if (!isGymTabActive()) {
    closeFocusMode(false);
    showToast('집중모드는 헬스 탭에서만 가능');
    return;
  }
  focusIdx = typeof idx === 'number' ? idx : getCurrentExerciseIdx();
  renderFocus();
  document.getElementById('focusOverlay')?.classList.add('show');
  syncFocusVisibility();
}
function closeFocusMode(doSync = true) {
  document.getElementById('focusOverlay')?.classList.remove('show');
  if (doSync) syncFocusVisibility();
}
function focusBackdropClose(e) {
  if (e.target?.id === 'focusOverlay') closeFocusMode();
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isFocusOpen()) closeFocusMode();
});
function renderFocus() {
  if (!isGymTabActive()) return;
  const r = ROUTINES[currentRoutine],
    ex = r.exercises[focusIdx];
  if (!ex) return;
  const sr = getSmartRec(currentRoutine, focusIdx),
    hist = getExHistory(currentRoutine, focusIdx),
    prev = hist[0]?.rec?.summary || '이전 기록 없음';
  document.getElementById('focusName').textContent = `${ex.name}`;
  document.getElementById('focusTarget').textContent = sr.kg
    ? `${sr.kg}kg 기준`
    : `${ex.weight}`;
  document.getElementById('focusMeta').textContent =
    `추천: ${sr.msg}\n지난 기록: ${prev}\n큐: ${ex.tip || ex.con}`;
}
function focusOpenCurrent() {
  if (!isGymTabActive()) return;
  closeFocusMode();
  const card = document.getElementById('ex-' + focusIdx);
  if (card) {
    card.classList.add('open', 'rec-open');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
function focusNext() {
  if (!isGymTabActive()) return;
  focusIdx = Math.min(
    ROUTINES[currentRoutine].exercises.length - 1,
    (focusIdx ?? 0) + 1,
  );
  renderFocus();
}
function focusPrev() {
  if (!isGymTabActive()) return;
  focusIdx = Math.max(0, (focusIdx ?? 0) - 1);
  renderFocus();
}
function focusCompleteSet() {
  if (!isGymTabActive()) return;
  const ex = ROUTINES[currentRoutine].exercises[focusIdx];
  if (!ex) return;
  focusOpenCurrent();
  for (let s = 0; s < ex.sets; s++) {
    const btn = document.getElementById(`chk_${focusIdx}_${s}`);
    if (btn && !btn.classList.contains('checked')) {
      toggleSetCheck(focusIdx, s);
      break;
    }
  }
  openFocusMode(focusIdx);
}
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  sls('theme', isDark ? 'dark' : 'light');
  const b = document.getElementById('themeBtn');
  if (b) b.textContent = isDark ? '☀️' : '🌙';
}
function initTheme() {
  if (gls('theme') === 'dark') {
    document.body.classList.add('dark');
    const b = document.getElementById('themeBtn');
    if (b) b.textContent = '☀️';
  }
}
function saveSwimLog() {
  const log = {
    date: todayStr(),
    strokes: document.getElementById('swimStrokes')?.value || '',
    breath: document.getElementById('swimBreath')?.value || '',
    left: document.getElementById('swimLeft')?.value || '',
    right: document.getElementById('swimRight')?.value || '',
    memo: document.getElementById('swimMemo')?.value || '',
  };
  const h = gls('swimLogs') || [];
  h.unshift(log);
  sls('swimLogs', h.slice(0, 60));
  addHistory({
    date: log.date,
    routine: '수영',
    summary: `25m ${log.strokes || '?'}스트로크 · 호흡 ${log.breath || '-'}`,
  });
  showToast('🏊 수영 기록 저장됨');
}

/* ═══ FINAL UX COACH FUNCTIONS ═══ */
function getDoneCount(rk = currentRoutine) {
  const r = ROUTINES[rk];
  let n = 0;
  r.exercises.forEach((_, i) => {
    if (getRecord(`${rk}_${i}_${todayStr()}`).allDone) n++;
  });
  return n;
}
function estimateRemainingMinutes(rk = currentRoutine) {
  const r = ROUTINES[rk];
  let mins = 0;
  r.exercises.forEach((ex, i) => {
    if (!getRecord(`${rk}_${i}_${todayStr()}`).allDone)
      mins += ex.sets * 2.5 + 2;
  });
  return Math.max(0, Math.round(mins));
}
function updateTodaySummary() {
  const r = ROUTINES[currentRoutine];
  if (!r) return;
  const done = getDoneCount();
  const remain = Math.max(0, r.exercises.length - done);
  const a = document.getElementById('tsRemain'),
    b = document.getElementById('tsTime'),
    c = document.getElementById('tsVolume');
  if (a) a.textContent = remain + '개';
  if (b) b.textContent = estimateRemainingMinutes() + '분';
  if (c) c.textContent = formatKg(computeVolume(currentRoutine));
  const f = document.getElementById('floatingNextBtn');
  if (f) f.textContent = remain ? '▶ 다음 운동' : '🎉 완료';
}
function getNextCoachNudge() {
  const r = ROUTINES[currentRoutine];
  const idx = getCurrentExerciseIdx();
  const ex = r.exercises[idx];
  const rs = readinessScore();
  const pain = [];
  r.exercises.forEach((e, i) => {
    const rec = getRecord(`${currentRoutine}_${i}_${todayStr()}`);
    if (rec.pain === 'joint' || rec.pain === 'nerve') pain.push(e.name);
  });
  if (pain.length)
    return `⚠️ 코치 개입
${pain.join(', ')} 통증 기록됨. 오늘은 해당 부위 추가 자극 금지. 다음 운동은 중량보다 자세/가동범위만 봐.`;
  if (rs < 55)
    return `🧭 코치 개입
회복 ${rs}점. 오늘은 실패세트 금지. ${ex?.name || '다음 운동'}은 RPE 8 이하로 끝내.`;
  const sr = getSmartRec(currentRoutine, idx);
  if (sr.action === 'INCREASE')
    return `📈 코치 개입
${ex.name}: 지난 기록이 여유로웠다. 오늘은 ${sr.kg}kg 시도. 단, 폼 무너지면 바로 원중량.`;
  if (sr.action === 'REDUCE')
    return `📉 코치 개입
${ex.name}: 통증/피로 신호가 있어서 ${sr.kg}kg 감량 추천. 자존심보다 회복이 먼저다.`;
  if (sr.action === 'MAINTAIN')
    return `⚖️ 코치 개입
${ex.name}: 오늘은 유지가 맞다. 마지막 세트 1~2회 남기고 끝내라.`;
  return `🎯 코치 개입
${ex?.name || '운동'}부터 시작. 오늘 목표는 기록을 남기는 것. 무리해서 PR 노리지 마.`;
}
function updateCoachNudge() {
  const el = document.getElementById('coachNudge');
  if (!el) return;
  el.textContent = getNextCoachNudge();
  el.classList.add('show');
}
function jumpNextExercise() {
  if (!isGymTabActive()) return;
  const idx = getCurrentExerciseIdx();
  const card = document.getElementById('ex-' + idx);
  if (card) {
    document
      .querySelectorAll('.ex-card.open')
      .forEach((c) => c.classList.remove('open'));
    card.classList.add('open', 'rec-open');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('다음 운동으로 이동');
  }
}
function enhancedCompletionAdvice() {
  const vol = computeVolume(currentRoutine),
    rs = readinessScore();
  let pr = 0;
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('pr:')) pr++;
  });
  const nextIdx = getCurrentExerciseIdx();
  const next = ROUTINES[currentRoutine].exercises[nextIdx]?.name || '회복';
  let advice = `총 볼륨 ${formatKg(vol)}. 회복점수 ${rs}점.
`;
  advice +=
    rs < 60
      ? '오늘은 회복 부담이 컸다. 내일은 걷기/교정 위주가 맞다.'
      : '오늘 볼륨은 괜찮다. 내일은 같은 부위 48시간 회복 확보.';
  advice += `
다음 추천: 단백질 120g 근처, 수면 7시간 이상, ${next} 기록 추적.`;
  return advice;
}
function renderEnhancedDone() {
  const banner = document.getElementById('completeBanner');
  if (!banner || banner.dataset.enhanced === '1') return;
  const old = Array.from(banner.children)
    .map((x) => x.outerHTML)
    .join('');
  banner.innerHTML =
    `<div class="done-card"><div class="done-title">🎉 GOOD JOB</div><div class="done-grid"><div class="done-mini"><div class="done-val" id="doneVol">${formatKg(computeVolume(currentRoutine))}</div><div class="done-lbl">총 볼륨</div></div><div class="done-mini"><div class="done-val" id="doneRemain">0</div><div class="done-lbl">남은운동</div></div><div class="done-mini"><div class="done-val" id="doneReady">${readinessScore()}</div><div class="done-lbl">회복점수</div></div></div><div class="done-advice">${enhancedCompletionAdvice()}</div></div>` +
    old;
  banner.dataset.enhanced = '1';
}

/* ═══ REST TIMER ═══ */
let restInterval = null,
  restLeft = 90,
  restTotal = 90,
  restRunning = false;
function toggleRest(autoStart) {
  if (restRunning && !autoStart) {
    clearInterval(restInterval);
    restRunning = false;
    restLeft = restTotal;
    document.getElementById('restDisplay').textContent = '1:30';
    document.getElementById('restDisplay').className = 'rest-timer';
    document.getElementById('restBtn').textContent = '시작';
    document.getElementById('restFill').style.width = '100%';
    document.getElementById('restFill').style.background = 'var(--accent)';
    return;
  }
  if (restRunning) return;
  restRunning = true;
  restLeft = restTotal;
  document.getElementById('restBtn').textContent = '초기화';
  restInterval = setInterval(() => {
    restLeft--;
    const m = Math.floor(restLeft / 60),
      s = restLeft % 60;
    document.getElementById('restDisplay').textContent =
      `${m}:${String(s).padStart(2, '0')}`;
    document.getElementById('restFill').style.width =
      (restLeft / restTotal) * 100 + '%';
    const timer = document.getElementById('restDisplay');
    if (restLeft <= 10) {
      timer.className = 'rest-timer danger';
      document.getElementById('restFill').style.background = 'var(--red)';
    } else if (restLeft <= 30) {
      timer.className = 'rest-timer warn';
      document.getElementById('restFill').style.background = 'var(--yellow)';
    }
    if (restLeft <= 0) {
      clearInterval(restInterval);
      restRunning = false;
      restLeft = restTotal;
      document.getElementById('restDisplay').textContent = 'GO! 💪';
      document.getElementById('restBtn').textContent = '시작';
      document.getElementById('restFill').style.width = '100%';
      document.getElementById('restFill').style.background = 'var(--green)';
      showToast('⏱ 휴식 완료!');
      try {
        navigator.vibrate?.([100, 50, 100]);
      } catch {}
    }
  }, 1000);
}

/* ═══ READINESS ═══ */
function getReadiness() {
  return gls('readiness:' + todayStr()) || { sleep: 3, fatigue: 3, pain: 1 };
}
function saveReadiness() {
  const r = {
    sleep: +document.getElementById('readySleep').value,
    fatigue: +document.getElementById('readyFatigue').value,
    pain: +document.getElementById('readyPain').value,
  };
  sls('readiness:' + todayStr(), r);
  renderReadiness();
  updateCoachPanel();
}
function renderReadiness() {
  const r = getReadiness();
  [
    ['readySleep', 'sleep'],
    ['readyFatigue', 'fatigue'],
    ['readyPain', 'pain'],
  ].forEach(([id, k]) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = r[k];
      document.getElementById(id + 'Val').textContent = r[k];
    }
  });
  const score = Math.round(
    r.sleep * 20 + (6 - r.fatigue) * 12 + (6 - r.pain) * 8,
  );
  const card = document.getElementById('readinessCard'),
    txt = document.getElementById('readinessText');
  if (!card || !txt) return;
  card.className =
    'coach-card ' + (score >= 75 ? 'good' : score >= 55 ? 'warn' : 'danger');
  txt.textContent =
    score >= 75
      ? `회복 ${score}점. 오늘은 정상 볼륨 가능.`
      : score >= 55
        ? `회복 ${score}점. 중량보다 자세 우선. 마지막 세트 1~2회 여유.`
        : `회복 ${score}점. 볼륨 30~40% 줄이고 재활 위주 권장.`;
}
function readinessScore() {
  const r = getReadiness();
  return Math.round(r.sleep * 20 + (6 - r.fatigue) * 12 + (6 - r.pain) * 8);
}
function avg(a) {
  return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
}
function formatKg(v) {
  return v >= 1000 ? (v / 1000).toFixed(1) + 't' : v + 'kg';
}
function monthVolume() {
  const m = todayStr().slice(0, 7);
  let vol = 0;
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('rec:') && k.slice(-10).startsWith(m)) {
      const rec = gls(k) || {};
      for (let s = 0; s < 8; s++)
        vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
    }
  });
  return Math.round(vol);
}
function updateCoachPanel() {
  const panel = document.getElementById('coachPanel');
  const txt = document.getElementById('coachText');
  const acts = document.getElementById('coachActions');
  if (!panel || !txt) return;
  const r = ROUTINES[currentRoutine];
  const recs = r.exercises.map((ex, i) => ({
    ex,
    i,
    rec: getRecord(`${currentRoutine}_${i}_${todayStr()}`),
  }));
  const done = recs.filter((x) => x.rec.allDone).length;
  const pain = recs.filter(
    (x) => x.rec.pain === 'joint' || x.rec.pain === 'nerve',
  );
  const avgRpe = avg(recs.map((x) => +x.rec.rpe || 0).filter(Boolean));
  panel.className =
    'coach-card ' +
    (pain.length ? 'danger' : readinessScore() < 55 ? 'warn' : 'good');
  let line = `${r.label}: ${done}/${r.exercises.length}종목 완료. 볼륨 ${computeVolume(currentRoutine)}kg.`;
  if (avgRpe) line += `\n평균 RPE ${avgRpe.toFixed(1)}.`;
  if (pain.length)
    line += `\n⚠️ ${pain.map((x) => x.ex.name).join(', ')} 통증 기록. 다음은 감량/대체 우선.`;
  else if (done === r.exercises.length) {
    const ot = detectOvertraining();
    if (ot) line += `\n${ot}`;
    else line += `\n모두 완료! 다음 세션 전 48시간 회복 확보.`;
  } else {
    const next = recs.find((x) => !x.rec.allDone);
    if (next) {
      const sr = getSmartRec(currentRoutine, next.i);
      line += `\n다음: ${next.ex.name} — ${sr.msg}`;
    }
  }
  txt.textContent = line;
  if (acts)
    acts.innerHTML = [
      `예상 ${Math.round(r.exercises.reduce((m, e) => m + e.sets * 2.5 + 2, 0))}분`,
      `월볼륨 ${formatKg(monthVolume())}`,
      `회복 ${readinessScore()}점`,
    ]
      .map((x) => `<span class="coach-chip">${x}</span>`)
      .join('');
  updateStickyProgress();
}
function detectOvertraining() {
  const r = getReadiness();
  if (r.fatigue >= 4 && r.pain >= 3)
    return '과훈련 위험 신호. 오늘은 강도 낮추거나 휴식 권장.';
  const streak = checkStreak();
  if (streak >= 5 && readinessScore() < 55)
    return `${streak}일 연속 운동 + 낮은 회복도. 내일 쉬는 게 맞다.`;
  return null;
}
function buildCorrections() {
  const list = document.getElementById('corrList');
  CORRECTIONS.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'list-card';
    card.innerHTML = `<div class="list-head" onclick="this.parentElement.classList.toggle('open')"><div class="list-dot" style="background:var(--green)"></div><div class="list-name">${c.name}</div><div class="list-dur">${c.dur}</div><span class="ex-chev">▾</span></div><div class="list-detail">${c.detail.replace(/\n/g, '<br>')}</div>`;
    list.appendChild(card);
  });
}
function buildSwim() {
  const list = document.getElementById('swimList');
  SWIM_DRILLS.forEach((d) => {
    const card = document.createElement('div');
    card.className = 'list-card';
    card.innerHTML = `<div class="list-head" onclick="this.parentElement.classList.toggle('open')"><div class="list-dot" style="background:var(--accent)"></div><div class="list-name">${d.name}</div><div class="list-dur">${d.ratio}</div><span class="ex-chev">▾</span></div><div class="list-detail">${d.detail.replace(/\n/g, '<br>')}</div>`;
    list.appendChild(card);
  });
  const concepts = document.getElementById('swimConcepts');
  SWIM_CONCEPTS.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'list-card';
    card.innerHTML = `<div class="list-head" onclick="this.parentElement.classList.toggle('open')"><div class="list-dot" style="background:var(--accent-mid)"></div><div class="list-name">${c.name}</div><span class="ex-chev">▾</span></div><div class="list-detail">${c.detail}</div>`;
    concepts.appendChild(card);
  });
}
function buildRules() {
  const list = document.getElementById('rulesList');
  RULES.forEach((r) => {
    const li = document.createElement('div');
    li.className = 'rule-item';
    li.innerHTML = `<span class="p-num">${r.num}</span><span>${r.text}</span>`;
    list.appendChild(li);
  });
  const checks = document.getElementById('recoveryChecks');
  RECOVERY_CHECKS.forEach((c) => {
    const d = document.createElement('div');
    d.className = 'rec-check-item';
    d.innerHTML = `<div class="rci-move">${c.move}</div><div class="rci-pass">통과: ${c.pass}</div><div class="rci-unlock">→ ${c.unlock}</div>`;
    checks.appendChild(d);
  });
  const pain = document.getElementById('painGuide');
  PAIN_GUIDE.forEach((p) => {
    const d = document.createElement('div');
    d.className = 'pain-item';
    d.innerHTML = `<div class="pain-dot" style="background:${p.color}"></div><div><div class="pain-type" style="color:${p.color}">${p.type}</div><div class="pain-desc">${p.desc}</div></div>`;
    pain.appendChild(d);
  });
}
function buildHistory() {
  buildStats();
  buildWeeklyReport();
  buildMuscleGrid();
  buildCalendar();
  buildPRBoard();
  buildChartSelector();
  buildHistChart();
  buildPlateCalcUI();
  buildHistLog();
}
function buildStats() {
  const allDates = new Set();
  getHistory().forEach((h) => {
    if (h.date) allDates.add(h.date);
  });
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('done:')) allDates.add(k.replace('done:', ''));
  });
  document.getElementById('statTotal').textContent = allDates.size + '일';
  const m = todayStr().slice(0, 7);
  let monVol = 0;
  ['A', 'B', 'C'].forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex, i) => {
      Object.keys(_cache)
        .filter((k) => k.startsWith(`rec:${rk}_${i}_${m}`))
        .forEach((k) => {
          const rec = gls(k) || {};
          for (let s = 0; s < ex.sets; s++)
            monVol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
        });
    }),
  );
  document.getElementById('statMonVol').textContent =
    monVol >= 1000
      ? (monVol / 1000).toFixed(1) + 't'
      : Math.round(monVol) + 'kg';
  document.getElementById('statPRs').textContent =
    Object.keys(_cache).filter((k) => k.startsWith('pr:')).length + '개';
}
function buildWeeklyReport() {
  const el = document.getElementById('weeklyReport');
  if (!el) return;
  const last7 = new Set();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7.add(fmtDate(d));
  }
  let days = 0,
    vol = 0;
  last7.forEach((date) => {
    if (gls('done:' + date)) days++;
  });
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('rec:')) {
      const date = k.slice(-10);
      if (last7.has(date)) {
        const rec = gls(k) || {};
        for (let s = 0; s < 6; s++)
          vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
      }
    }
  });
  const prs = Object.keys(_cache).filter((k) => k.startsWith('pr:')).length;
  el.textContent = days
    ? `최근 7일 운동 ${days}회. 총 볼륨 ${formatKg(Math.round(vol))}. PR 기록 ${prs}개.\n판단: ${days >= 3 ? '빈도 좋음. 이제 중량보다 회복 안정성까지 같이 봐야 한다.' : days >= 2 ? '나쁘지 않다. 주 3회 패턴을 맞추면 성장 신호가 더 선명해진다.' : '운동 빈도 부족. 이번주는 기록 쌓는 게 먼저다.'}\n다음 목표: 주요 등 운동 1개만 증량 시도, 통증 있으면 즉시 유지/감량.`
    : '최근 7일 완료 기록 없음.';
}
function buildMuscleGrid() {
  const grid = document.getElementById('muscleGrid');
  if (!grid) return;
  const m2 = todayStr().slice(0, 7);
  const m = {};
  ['A', 'B', 'C'].forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex, i) => {
      Object.keys(_cache)
        .filter((k) => k.startsWith(`rec:${rk}_${i}_`) && k.includes(m2))
        .forEach((k) => {
          const rec = gls(k) || {};
          let vol = 0;
          for (let s = 0; s < ex.sets; s++)
            vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
          (MUSCLE_MAP[ex.name] || ['기타']).forEach(
            (name) => (m[name] = (m[name] || 0) + vol),
          );
        });
    }),
  );
  const max = Math.max(1, ...Object.values(m));
  const arr = Object.entries(m).sort((a, b) => b[1] - a[1]);
  grid.innerHTML = arr.length
    ? arr
        .map(
          ([name, vol]) =>
            `<div class="muscle-card"><div class="muscle-name">${name}</div><div class="muscle-vol">${formatKg(Math.round(vol))}</div><div class="muscle-bar"><div class="muscle-fill" style="width:${Math.round((vol / max) * 100)}%"></div></div></div>`,
        )
        .join('')
    : '<div class="coach-card"><div class="coach-text">이번달 볼륨 기록 없음.</div></div>';
}
function buildCalendar() {
  const now = new Date();
  const yr = now.getFullYear(),
    mo = now.getMonth();
  const first = new Date(yr, mo, 1).getDay();
  const days = new Date(yr, mo + 1, 0).getDate();
  const todayD = now.getDate();
  const startOff = (first + 6) % 7;
  const mNames = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const dow = ['월', '화', '수', '목', '금', '토', '일'];
  const worked = new Set();
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('done:')) {
      const d = k.replace('done:', '');
      if (d.startsWith(`${yr}-${String(mo + 1).padStart(2, '0')}`))
        worked.add(parseInt(d.slice(8)));
    }
  });
  let html = `<div class="cal-month">${yr}년 ${mNames[mo]}</div><div class="cal-dow">${dow.map((d) => `<div class="cal-dow-lbl">${d}</div>`).join('')}</div><div class="cal-days">`;
  for (let i = 0; i < startOff; i++) html += '<div class="cd empty"></div>';
  for (let d = 1; d <= days; d++) {
    const cls = ['cd', d === todayD ? 'today' : '', worked.has(d) ? 'has' : '']
      .filter(Boolean)
      .join(' ');
    html += `<div class="${cls}">${d}</div>`;
  }
  html += '</div>';
  document.getElementById('calBox').innerHTML = html;
}
function buildPRBoard() {
  const prs = [];
  ['A', 'B', 'C'].forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex, i) => {
      const v = gls(`pr:${rk}_${i}`);
      if (v > 0) prs.push({ name: ex.name, kg: v, rk });
    }),
  );
  const board = document.getElementById('prBoard');
  if (!prs.length) {
    board.innerHTML =
      '<div style="padding:16px;text-align:center;font-size:13px;color:var(--text-3)">기록 없음 — 운동 완료 후 자동 저장</div>';
    return;
  }
  prs.sort((a, b) => b.kg - a.kg);
  const medals = ['🥇', '🥈', '🥉'];
  board.innerHTML = prs
    .map(
      (p, i) =>
        `<div class="pr-row"><div class="pr-medal">${medals[i] || '🏅'}</div><div class="pr-info"><div class="pr-name">${p.name}</div><div class="pr-1rm">${p.rk}루틴</div></div><div class="pr-val"><div class="pr-kg">${p.kg}kg</div></div></div>`,
    )
    .join('');
}
let selectedChartEx = '';
function buildChartSelector() {
  const seen = new Set();
  const names = [];
  ['A', 'B', 'C'].forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex) => {
      if (!seen.has(ex.name)) {
        seen.add(ex.name);
        names.push(ex.name);
      }
    }),
  );
  document.getElementById('chartSel').innerHTML = names
    .map(
      (n) =>
        `<div class="cchip${n === selectedChartEx ? ' act' : ''}" onclick="selectChart('${n}')">${n}</div>`,
    )
    .join('');
}
function selectChart(exName) {
  selectedChartEx = exName;
  document
    .querySelectorAll('.cchip')
    .forEach((c) => c.classList.toggle('act', c.textContent === exName));
  const data = [];
  ['A', 'B', 'C'].forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex, i) => {
      if (ex.name !== exName) return;
      Object.keys(_cache)
        .filter((k) => k.startsWith(`rec:${rk}_${i}_`))
        .forEach((k) => {
          const date = k.replace(`rec:${rk}_${i}_`, '');
          const rec = gls(k) || {};
          let maxE1 = 0;
          for (let s = 0; s < ex.sets; s++) {
            const kg = +rec['kg_' + s] || 0,
              rp = +rec['reps_' + s] || 0;
            if (kg && rp) maxE1 = Math.max(maxE1, kg * (1 + rp / 30));
          }
          if (maxE1 > 0) data.push({ x: date, y: maxE1 });
        });
    }),
  );
  data.sort((a, b) => a.x.localeCompare(b.x));
  const area = document.getElementById('chartArea');
  if (!data.length) {
    area.innerHTML = '<div class="chart-empty">아직 기록 없음</div>';
    return;
  }
  const W = Math.min(area.clientWidth || 320, 600),
    H = 160;
  const pad = { t: 22, r: 20, b: 32, l: 46 };
  const pw = W - pad.l - pad.r,
    ph = H - pad.t - pad.b;
  const minY = Math.min(...data.map((d) => d.y)) * 0.94,
    maxY = Math.max(...data.map((d) => d.y)) * 1.06;
  const xS = (i) => pad.l + (i / (data.length - 1 || 1)) * pw,
    yS = (v) => pad.t + ph - ((v - minY) / (maxY - minY || 1)) * ph;
  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block">`;
  for (let i = 0; i <= 4; i++) {
    const v = minY + ((maxY - minY) * i) / 4,
      y = yS(v);
    svg += `<line x1="${pad.l}" y1="${y}" x2="${W - pad.r}" y2="${y}" stroke="var(--border)" stroke-width="1"/><text x="${pad.l - 5}" y="${y + 4}" text-anchor="end" fill="var(--text-3)" font-size="10">${Math.round(v)}</text>`;
  }
  const pts = data.map((d, i) => `${xS(i)},${yS(d.y)}`).join(' ');
  svg += `<polygon points="${pts} ${xS(data.length - 1)},${H - pad.b} ${xS(0)},${H - pad.b}" fill="rgba(108,92,231,.1)"/>`;
  svg += `<polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    const x = xS(i),
      y = yS(d.y);
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="var(--accent)"/><circle cx="${x}" cy="${y}" r="2" fill="white"/>`;
    if (i === data.length - 1 || i === 0 || data.length <= 6)
      svg += `<text x="${x}" y="${H - 4}" text-anchor="middle" fill="var(--text-3)" font-size="9">${d.x.slice(5)}</text>`;
  });
  const last = data[data.length - 1];
  svg += `<text x="${xS(data.length - 1)}" y="${yS(last.y) - 9}" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="bold">${last.y.toFixed(1)}</text>`;
  svg += '</svg>';
  area.innerHTML = svg;
}
function buildHistChart() {
  const wrap = document.getElementById('histChart');
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const jsToIdx = [6, 0, 1, 2, 3, 4, 5];
  let data = [],
    maxVol = 0;
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = fmtDate(d);
    let vol = 0;
    ['A', 'B', 'C'].forEach((rk) =>
      ROUTINES[rk].exercises.forEach((ex, ei) => {
        const rec = getRecord(`${rk}_${ei}_${dateStr}`);
        for (let s = 0; s < ex.sets; s++)
          vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
      }),
    );
    vol = Math.round(vol);
    if (vol > maxVol) maxVol = vol;
    data.push({ label: days[jsToIdx[d.getDay()]], vol, isToday: i === 0 });
  }
  const chartEl = document.createElement('div');
  chartEl.className = 'hist-chart-wrap';
  data.forEach((cd) => {
    const col = document.createElement('div');
    col.className = 'hist-col';
    const pct =
      maxVol > 0 ? Math.max(5, Math.round((cd.vol / maxVol) * 100)) : 0;
    col.innerHTML = `<div class="hist-vol-lbl">${cd.vol > 0 ? cd.vol : ''}</div><div class="hist-bar-outer" style="height:70px"><div class="hist-bar-inner${cd.isToday ? ' today-bar' : ''}" style="height:${pct}%"></div></div><div class="hist-day-lbl">${cd.label}</div>`;
    chartEl.appendChild(col);
  });
  wrap.innerHTML = '';
  wrap.appendChild(chartEl);
  const legend = document.createElement('div');
  legend.className = 'hist-legend';
  legend.textContent = '지난 7일 볼륨 (kg×rep)';
  wrap.appendChild(legend);
}
function buildHistLog() {
  const logWrap = document.getElementById('histLog');
  const hist = getHistory();
  if (!hist.length) {
    logWrap.innerHTML =
      '<div style="text-align:center;padding:24px;color:var(--text-3);font-size:13px">아직 기록이 없어요</div>';
    return;
  }
  const box = document.createElement('div');
  box.className = 'hist-log';
  hist.slice(0, 20).forEach((h) => {
    const item = document.createElement('div');
    item.className = 'hist-log-item';
    item.innerHTML = `<div class="hist-date">${h.date}</div><div><div class="hist-routine">${h.routine}</div><div class="hist-detail">${h.summary || ''}</div></div>`;
    box.appendChild(item);
  });
  logWrap.innerHTML = '';
  logWrap.appendChild(box);
}
function buildPlateCalcUI() {
  document.getElementById('pcBarSel').innerHTML = BAR_WEIGHTS.map(
    (b, i) =>
      `<button class="pc-bar-btn${i === selectedBar ? ' act' : ''}" onclick="selBar(${i})" type="button">${b.label}</button>`,
  ).join('');
}
function selBar(i) {
  selectedBar = i;
  document
    .querySelectorAll('.pc-bar-btn')
    .forEach((b, j) => b.classList.toggle('act', j === i));
  calcPlates();
}
function calcPlates() {
  const tgt = parseFloat(document.getElementById('pcKg').value) || 0,
    res = document.getElementById('pcResult');
  if (!tgt) {
    res.innerHTML = '<div class="pc-empty">중량을 입력하세요</div>';
    return;
  }
  const barKg = BAR_WEIGHTS[selectedBar].kg,
    sideKg = (tgt - barKg) / 2;
  if (sideKg < 0) {
    res.innerHTML = `<div class="pc-empty">바벨(${barKg}kg)보다 작습니다</div>`;
    return;
  }
  const PLATES = [
    { w: 20, cls: 'p20' },
    { w: 15, cls: 'p15' },
    { w: 10, cls: 'p10' },
    { w: 5, cls: 'p5' },
    { w: 2.5, cls: 'p25' },
    { w: 1.25, cls: 'p125' },
  ];
  let rem = sideKg,
    result = [];
  PLATES.forEach((p) => {
    const cnt = Math.floor(rem / p.w + 0.001);
    if (cnt > 0) {
      result.push({ ...p, cnt });
      rem = Math.round((rem - cnt * p.w) * 100) / 100;
    }
  });
  const chips = result
    .map((p) => `<div class="plate-chip ${p.cls}">${p.w}kg × ${p.cnt}</div>`)
    .join('');
  res.innerHTML = `<div class="pc-side">각 사이드: <strong>${sideKg.toFixed(2).replace(/\.?0+$/, '')}kg</strong>${barKg > 0 ? ' (바벨 ' + barKg + 'kg 제외)' : ''}</div><div class="pc-plates">${chips || '<span class="pc-empty">플레이트 없음</span>'}</div>`;
}
function buildWorkoutSummary() {
  const r = ROUTINES[currentRoutine];
  const today = todayStr();
  const vol = computeVolume(currentRoutine);
  let totalSets = 0;
  r.exercises.forEach((e) => (totalSets += e.sets));
  const logs = r.exercises
    .map((ex, i) => {
      const rec = getRecord(`${currentRoutine}_${i}_${today}`);
      const extra = [
        rec.rpe ? `RPE ${rec.rpe}` : '',
        rec.pain ? `통증 ${rec.pain}` : '',
        rec.note ? `메모 ${rec.note}` : '',
      ]
        .filter(Boolean)
        .join(' / ');
      return rec.summary
        ? `- ${ex.name}: ${rec.summary}${extra ? ' (' + extra + ')' : ''}`
        : null;
    })
    .filter(Boolean)
    .join('\n');
  return `💪 ${r.label} 완료\n날짜: ${today}\n총 볼륨: ${vol}kg\n총 세트: ${totalSets}세트\n회복점수: ${readinessScore()}점\n\n${logs || '기록 없음'}`;
}
function copyWorkoutSummary() {
  const btn = document.getElementById('calBtn');
  const text = buildWorkoutSummary();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (btn) btn.textContent = '✅ 요약 복사됨';
        showToast('📋 운동 요약 복사됨');
      })
      .catch(() => showLocalSummary(text));
  } else showLocalSummary(text);
}
function showLocalSummary(text) {
  const el = document.getElementById('aiResult');
  if (el) {
    el.className = 'ai-result visible';
    el.textContent = text;
  }
  showToast('📋 요약을 화면에 표시했어');
}
function localGymFeedback() {
  const r = ROUTINES[currentRoutine];
  const today = todayStr();
  const recs = r.exercises.map((ex, i) => ({
    ex,
    i,
    rec: getRecord(`${currentRoutine}_${i}_${today}`),
    smart: getSmartRec(currentRoutine, i),
  }));
  const done = recs.filter((x) => x.rec.allDone).length;
  const vol = computeVolume(currentRoutine);
  const rs = readinessScore();
  const pain = recs.filter(
    (x) => x.rec.pain === 'joint' || x.rec.pain === 'nerve',
  );
  const avgRpe = avg(recs.map((x) => +x.rec.rpe || 0).filter(Boolean));
  const next = recs.find((x) => !x.rec.allDone);
  let lines = [];
  lines.push(
    `현재 ${done}/${r.exercises.length}종목 완료 · 볼륨 ${vol}kg · 회복 ${rs}점.`,
  );
  if (rs < 55)
    lines.push('오늘은 회복 낮음. 실패 세트 금지, 중량보다 자세 우선.');
  else if (rs < 75)
    lines.push('오늘은 보통 컨디션. 마지막 세트 1~2회 여유 남겨라.');
  else lines.push('오늘은 정상 볼륨 가능. 단, 통증 나오면 바로 감량.');
  if (avgRpe)
    lines.push(
      `평균 RPE ${avgRpe.toFixed(1)}. ${avgRpe >= 9 ? '다음 세션 증량 금지.' : avgRpe <= 7 ? '다음 세션 일부 종목 증량 후보.' : '강도 적정.'}`,
    );
  if (pain.length)
    lines.push(
      `통증 플래그: ${pain.map((x) => x.ex.name).join(', ')}. 다음엔 10~15% 감량 또는 대체.`,
    );
  if (next) lines.push(`다음 운동: ${next.ex.name}. ${next.smart.msg}`);
  else lines.push('오늘 루틴 완료. 다음 48시간 회복 확보.');
  return lines.join('\n');
}
function getAiFeedback() {
  const el = document.getElementById('aiResult');
  if (!el) return;
  el.className = 'ai-result visible';
  el.textContent = localGymFeedback();
}
function getSwimFeedback() {
  const el = document.getElementById('swimAiResult');
  if (!el) return;
  el.className = 'ai-result visible';
  el.textContent =
    '오늘 목표 1개만 잡자.\n1) 왼팔은 감각 유지, 오른팔 캐치에서 팔꿈치 수면 유지.\n2) 25m는 속도 올리지 말고 물속 호기를 끝까지 내뱉어라.\n3) 드릴 순서: 왼팔 외팔 5 → 오른팔 외팔 3 → 캐치업 2 → 풀스트로크 확인.';
}
function switchTabById(id) {
  const tabs = ['gym', 'correct', 'swim', 'history', 'rules'];
  document
    .querySelectorAll('.tab-panel')
    .forEach((p) => p.classList.toggle('active', p.id === 'tab-' + id));
  document
    .querySelectorAll('.bnav-btn')
    .forEach((b, i) => b.classList.toggle('active', tabs[i] === id));
  if (id !== 'gym') closeFocusMode(false);
  syncFocusVisibility();
  updateStickyProgress();
  updateTodaySummary();
  updateCoachNudge();
  if (id === 'history') buildHistory();
}
function switchTab(id) {
  switchTabById(id);
}
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
initStorage().then(() => {
  initTheme();
  buildHeader();
  buildWeekStrip();
  buildSelector();
  buildCorrections();
  buildSwim();
  buildRules();
  renderReadiness();
  showRoutine({ 1: 'A', 4: 'B', 0: 'C' }[new Date().getDay()] || 'A');
  updateCoachPanel();
  syncFocusVisibility();
});
