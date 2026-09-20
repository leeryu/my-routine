/* ═══ DATA ═══ */
const ROUTINES = {
  A: {
    label: 'A루틴',
    day: '월요일',
    tag: 'Pull 중심 · 7종목',
    exercises: [
      {
        name: '랫풀다운',
        target: '광배근 · 대원근 · 이두',
        sets: 4,
        reps: '10/10/10/8',
        weight: '스트랩 45kg 시도',
        defKg: 35,
        con: '팔꿈치를 뒷주머니로. 등으로 당기기. 2초.',
        ecc: '광배근 완전 스트레칭 3초.',
        tip: '동작 숙련 완료(광배 DOMS 확인). 스트랩 착용 후 40→45 점진 시도. 자세가 무너지면 즉시 감량.',
        warn: null,
      },
      {
        name: '덤벨 로우',
        target: '광배근 · 승모 중하부 · 능형근',
        sets: 4,
        reps: '10/10/10/10',
        weight: '16kg 시도',
        defKg: 16,
        con: '팔꿈치를 엉덩이 방향으로. 배꼽 옆. 어깨뼈 조임.',
        ecc: '어깨뼈 완전히 열며 광배 스트레칭. 3초.',
        tip: '반대 손 벤치 짚어 허리 회전 최소화. 마지막 세트 왼팔 먼저(크로스도미넌스).',
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
        reps: '15/15/15',
        weight: '6kg 시도',
        defKg: 6,
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
        tip: '앱 운영용 보조 운동. 무릎 90도. 목으로 당기지 말 것.',
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
        tip: '앱 운영용 보조 운동. 갈비뼈-골반 중립을 유지한다.',
        warn: '⚠️ 오른쪽 절대 금지. 왼쪽 아래로만.',
      },
      {
        name: '레그 익스텐션',
        target: '대퇴사두 · 오른쪽 단측',
        sets: 3,
        reps: '15/15/15',
        weight: '가볍게',
        defKg: 0,
        con: '무릎 90% 지점까지만. 완전 신전 금지. 1~2초.',
        ecc: '천천히 버티며 2~3초.',
        tip: '통증 없는 범위에서 천천히 수행. 불편하면 즉시 중단.',
        warn: '⚠️ 오른쪽만. 통증 오면 즉시 중단.',
      },
    ],
  },
  B: {
    label: 'B루틴',
    day: '목요일',
    tag: 'Push · 등 보조 · 7종목',
    exercises: [
      {
        name: '덤벨 로우',
        target: '광배근 · 승모 중하부 · 능형근',
        sets: 3,
        reps: '10/10/10',
        weight: '20kg 전후',
        defKg: 20,
        con: '팔꿈치 엉덩이 방향. 어깨뼈 조임.',
        ecc: '3초. 광배 스트레칭.',
        tip: '등 주2회 유지용 보조. A보다 가볍게, 감각 위주.',
        warn: null,
      },
      {
        // 정책: 기존 B_0 덤벨 벤치프레스 기록을 체스트 프레스 기록으로
        // 이어서 사용한다. 두 운동은 현재 같은 B_0 키를 공유하며, 향후
        // 영구 운동 ID 도입 시 별도 기록으로 분리할 수 있다.
        name: '체스트 프레스',
        target: '대흉근 · 삼두 · 전면삼각',
        sets: 3,
        reps: '10/10/10',
        weight: '40kg 목표',
        defKg: 40,
        con: '가슴 조임 1초.',
        ecc: '가슴 스트레칭 3초.',
        tip: '견갑골 등받이 고정.',
        warn: null,
      },
      {
        name: '레터럴 레이즈',
        target: '측면삼각근',
        sets: 3,
        reps: '15/15/15',
        weight: '6kg 시도',
        defKg: 6,
        con: '새끼손가락 높이 2초.',
        ecc: '천천히 3초.',
        tip: '어깨 높이 이상 금지.',
        warn: null,
      },
      {
        name: '숄더 프레스',
        target: '삼각근 · 삼두',
        sets: 3,
        reps: '12/12/12',
        weight: '20kg 목표',
        defKg: 20,
        con: '자연스럽게 밀어올리기 1초.',
        ecc: '어깨 높이 아래로 3초.',
        tip: '앉아서 코어를 유지한다. 갈비뼈가 들리거나 허리가 과하게 꺾이면 중량을 낮춰라.',
        warn: '⚠️ 골반 전방경사 — 허리 과신전 금지. 어깨 시큰하면 즉시 중단.',
      },
      {
        name: '리버스 펙덱',
        target: '후면삼각 · 능형근 · 승모 중부',
        sets: 3,
        reps: '12/12/12',
        weight: '40kg 목표',
        defKg: 40,
        con: '팔꿈치 살짝 굽힌 채 양옆으로. 후면 어깨 조임. 2초.',
        ecc: '천천히 2초.',
        tip: '등 볼륨 보조용. 중량보다 자세, 후면 어깨 쥐어짜는 느낌 우선.',
        warn: null,
      },
      {
        name: '랫풀다운',
        target: '광배근 · 대원근 · 이두',
        sets: 3,
        reps: '10/10/10',
        weight: '40kg 목표',
        defKg: 40,
        con: '팔꿈치를 뒷주머니로. 등으로 당기기. 2초.',
        ecc: '광배근 완전 스트레칭 3초.',
        tip: 'B는 등 볼륨 보조용 — A(월)보다 가볍게, 감각 위주.',
        warn: null,
      },
      {
        name: '레그 익스텐션',
        target: '대퇴사두 · 오른쪽 단측',
        sets: 3,
        reps: '15/15/15',
        weight: '40kg 목표',
        defKg: 40,
        con: '90% 지점까지.',
        ecc: '2~3초.',
        tip: '통증 없는 범위에서 천천히 수행.',
        warn: '⚠️ 오른쪽만. 통증 시 즉시 중단.',
      },
    ],
  },
};
const CLINICAL_PROFILE = {
  assessedAt: '2026-07-27', source: '재활의학과 진료', status: 'active', updatedAt: '2026-07-31', version: 1,
  structuralAbnormality: '없음', spineAlignment: '정상', pelvisAlignment: '정상', hipAlignment: '정상',
  forwardHead: '경미', coreStability: '부족', anteriorPelvicTilt: '경미, 기능성', exerciseRestriction: '구조적 제한 없음',
  medicalRecommendation: { activity: '필라테스', frequency: '주 1회', durationWeeks: 8 },
  goals: ['갈비뼈-골반 중립 유지', '코어 안정성', '목 정렬 개선'],
  summary: '현재 검사상 뼈·관절의 구조적 이상이나 정렬 이상은 확인되지 않았습니다.\n거북목 경향과 코어 안정성 부족으로 인한 가벼운 골반 전방경사가 있습니다.\n목표는 골반을 억지로 말아 넣는 것이 아니라, 갈비뼈와 골반의 중립을 유지한 채 움직이는 능력을 높이는 것입니다.',
};
const WEEKLY_GOALS = { A: 1, B: 1, C: 1 };
const DAY_INFO = [
  { label: '월', type: 'A', rk: 'A' },
  { label: '화', type: '홈코어', rk: null },
  { label: '수', type: 'B', rk: 'B' },
  { label: '목', type: '홈코어', rk: null },
  { label: '금', type: '휴식', rk: null },
  { label: '토', type: '수영', rk: null },
  { label: '일', type: '수영', rk: null },
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
const MUSCLE_GROUP_OPTIONS = ['등', '광배', '가슴', '어깨', '측면어깨', '후면어깨', '삼두', '이두', '코어', '하체', '전신/기타'];
let selectedBar = 0;

/* ═══ ROUTINE OVERRIDES (호환용) ═══
   customExercises:A/B — [{idx, ...필드}] 형태로 저장된 커스텀 종목 필드 덮어쓰기
   weightOverrides:A/B — {idx: defKg} 형태로 저장된 목표 중량 덮어쓰기
   두 저장소 모두 비어 있으면 아무 것도 하지 않는다(no-op). */
function applyRoutineOverrides() {
  ['A', 'B'].forEach((rk) => {
    const customExercises = gls('customExercises:' + rk);
    if (Array.isArray(customExercises)) {
      customExercises.forEach((custom) => {
        if (!custom || typeof custom.idx !== 'number') return;
        const ex = ROUTINES[rk].exercises[custom.idx];
        if (!ex) return;
        Object.keys(custom).forEach((field) => {
          if (field === 'idx') return;
          ex[field] = custom[field];
        });
      });
    }
    const weightOverrides = gls('weightOverrides:' + rk);
    if (weightOverrides && typeof weightOverrides === 'object') {
      Object.keys(weightOverrides).forEach((idxKey) => {
        const ex = ROUTINES[rk].exercises[+idxKey];
        if (ex) ex.defKg = weightOverrides[idxKey];
      });
    }
  });
}

/* ═══ STORAGE ═══ */
const _cache = {};
function gls(k) {
  return _cache[k] ?? null;
}
function markStorageSyncPending(key, error) {
  const status = { status: 'pending', authority: 'localStorage', key, failedAt: new Date().toISOString(), message: String(error?.message || error || 'mirror write failed') };
  _cache.storageSyncStatus = status;
  try { localStorage.setItem('routine:storageSyncStatus', JSON.stringify(status)); } catch {}
}
function sls(k, v) {
  _cache[k] = v;
  try { localStorage.setItem('routine:' + k, JSON.stringify(v)); }
  catch (error) { markStorageSyncPending(k, error); return; }
  if (window.storage) window.storage.set(k, JSON.stringify(v)).catch((error) => markStorageSyncPending(k, error));
}
function dls(k) {
  delete _cache[k];
  try { localStorage.removeItem('routine:' + k); }
  catch (error) { markStorageSyncPending(k, error); return; }
  if (window.storage) window.storage.delete(k).catch((error) => markStorageSyncPending(k, error));
}const STORAGE_SCHEMA_VERSION = StorageMigration.CURRENT_SCHEMA_VERSION;
const MIGRATION_BACKUP_V10 = 'migrationBackup:v10';
const MIGRATION_CONFLICT_V10 = 'migrationConflict:v10';
const MIGRATION_STATUS_V10 = 'migrationStatus:v10';
const MIGRATION_BACKUP_V11 = 'migrationBackup:v11';
const MIGRATION_STATUS_V11 = 'migrationStatus:v11';
const MIGRATION_BACKUP_V12 = 'migrationBackup:v12';
const MIGRATION_STATUS_V12 = 'migrationStatus:v12';
const MIGRATION_BACKUP_V13 = 'migrationBackup:v13';
const MIGRATION_STATUS_V13 = 'migrationStatus:v13';

function storageSnapshot() {
  return JSON.parse(JSON.stringify(_cache));
}
async function persistSet(k, v) {
  const serialized = JSON.stringify(v);
  localStorage.setItem('routine:' + k, serialized);
  _cache[k] = v;
  if (window.storage) await window.storage.set(k, serialized);
}
async function persistDelete(k) {
  localStorage.removeItem('routine:' + k);
  delete _cache[k];
  if (window.storage) await window.storage.delete(k);
}
async function createSafetyBackup(key, schemaVersion, source, targetKeys) {
  if (gls(key)) return true;
  const data = {};
  targetKeys.forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(source, k)) data[k] = source[k];
  });
  const backup = {
    createdAt: new Date().toISOString(),
    sourceSchemaVersion: schemaVersion ?? null,
    keys: data,
  };
  try {
    await persistSet(key, backup);
    return !!gls(key);
  } catch (error) {
    console.error(
      '[storage migration] safety backup failed; migration aborted',
      error,
    );
    return false;
  }
}
async function applySnapshotTransaction(before, after, metadata) {
  const finalState = JSON.parse(JSON.stringify(after));
  finalState.storageSchemaVersion = 10;
  finalState[MIGRATION_STATUS_V10] = metadata;
  finalState.migrV10 = true;
  try {
    await StorageMigration.commitSnapshot(
      { set: persistSet, delete: persistDelete },
      before,
      finalState,
      ['storageSchemaVersion', MIGRATION_STATUS_V10, 'migrV10'],
    );
  } catch (error) {
    console.error(
      '[storage migration] write failed; original keys were restored',
      error,
    );
    if (error.rollbackError)
      console.error(
        '[storage migration] rollback failed; safety backup is preserved',
        error.rollbackError,
      );
    throw error;
  }
}
/* v8→v9 루틴 재편 마이그레이션: 인덱스 기반 기록·PR 키 재배치 (1회 실행)
   old A: 랫풀/덤벨벤치/덤벨로우/리버스펙덱/레터럴/크런치/사이드플랭크/레그익스텐션
   old B: 랫풀/덤벨로우/크런치/사이드플랭크/레그익스텐션 */
function migrateV9() {
  if (gls('migrV9')) return;
  const mapA = {
    0: 'A_0',
    1: 'B_0',
    2: 'A_1',
    3: 'A_2',
    4: 'A_3',
    5: 'A_4',
    6: 'A_5',
    7: 'A_6',
  };
  const mapB = { 0: 'A_0', 1: 'B_2', 2: 'B_4', 3: 'B_5', 4: 'B_6' };
  const remap = (rk, idx) =>
    rk === 'A' ? mapA[idx] : rk === 'B' ? mapB[idx] : null;
  const moves = [];
  Object.keys(_cache).forEach((k) => {
    let m = k.match(/^rec:([AB])_(\d+)_(\d{4}-\d{2}-\d{2})$/);
    if (m) {
      const to = remap(m[1], +m[2]);
      if (to && 'rec:' + to + '_' + m[3] !== k)
        moves.push({ from: k, to: 'rec:' + to + '_' + m[3], type: 'rec' });
      return;
    }
    m = k.match(/^pr:([AB])_(\d+)$/);
    if (m) {
      const to = remap(m[1], +m[2]);
      if (to && 'pr:' + to !== k)
        moves.push({ from: k, to: 'pr:' + to, type: 'pr' });
    }
  });
  // 2단계: 스냅샷 → 전체 삭제 → 재기록 (체인 이동 충돌 방지)
  const snap = moves.map((mv) => ({ ...mv, v: gls(mv.from) }));
  snap.forEach((mv) => dls(mv.from));
  snap.forEach((mv) => {
    if (mv.type === 'pr') {
      sls(mv.to, Math.max(+gls(mv.to) || 0, +mv.v || 0)); // PR 충돌은 max 병합
    } else if (!gls(mv.to)) {
      sls(mv.to, mv.v); // rec 충돌(같은 날 A·B 동시 수행)은 기존 우선
    }
  });
  sls('migrV9', true);
}
async function migrateV10() {
  const source = storageSnapshot();
  const classification = StorageMigration.classifyStorage(source);
  if (classification.type === 'v10') return { status: 'ready-for-v11' };
  if (classification.type === 'current') {
    if (source.storageSchemaVersion !== STORAGE_SCHEMA_VERSION)
      await persistSet('storageSchemaVersion', STORAGE_SCHEMA_VERSION);
    return { status: 'current' };
  }
  if (classification.type === 'fresh') {
    await persistSet('storageSchemaVersion', STORAGE_SCHEMA_VERSION);
    await persistSet(MIGRATION_STATUS_V10, {
      status: 'fresh',
      completedAt: new Date().toISOString(),
    });
    return { status: 'fresh' };
  }

  const targetKeys = Object.keys(source).filter(StorageMigration.isBExerciseKey);
  const backupOk = await createSafetyBackup(
    MIGRATION_BACKUP_V10,
    classification.version,
    source,
    targetKeys,
  );
  if (!backupOk) return { status: 'backup-failed' };

  if (classification.type !== 'v9') {
    const pending = StorageMigration.buildHoldStatus(
      classification,
      targetKeys,
      new Date().toISOString(),
    );
    await persistSet(MIGRATION_STATUS_V10, pending);
    console.warn(
      '[storage migration] v10 migration pending: legacy and new B data cannot be distinguished safely',
      pending,
    );
    return pending;
  }

  const transformed = StorageMigration.transformV9ToV10(source);
  if (!transformed.ok) {
    const conflict = {
      status: 'conflict',
      detectedAt: new Date().toISOString(),
      sourceSchemaVersion: 9,
      conflicts: transformed.conflicts,
    };
    await persistSet(MIGRATION_CONFLICT_V10, conflict);
    await persistSet(MIGRATION_STATUS_V10, conflict);
    console.warn(
      '[storage migration] v10 migration blocked by key conflicts',
      conflict,
    );
    return conflict;
  }

  await applySnapshotTransaction(source, transformed.result, {
    status: 'completed',
    completedAt: new Date().toISOString(),
    movedKeys: transformed.moves.map(({ from, to }) => ({ from, to })),
  });
  return { status: 'completed' };
}
async function migrateV11() {
  const before = storageSnapshot();
  if (Number(before.storageSchemaVersion) === STORAGE_SCHEMA_VERSION) {
    if (!before[MIGRATION_STATUS_V11]) await persistSet(MIGRATION_STATUS_V11, { status: 'completed-unverified', detectedAt: new Date().toISOString(), sourceSchemaVersion: STORAGE_SCHEMA_VERSION, movedKeys: [] });
    return { status: 'current' };
  }
  if (Number(before.storageSchemaVersion) !== 10) return { status: 'not-applicable' };
  const existingBackup = before[MIGRATION_BACKUP_V11];
  if (existingBackup && (existingBackup.sourceSchemaVersion !== 10 || !existingBackup.keys || typeof existingBackup.keys !== 'object')) {
    const conflict = { status: 'backup-conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 10 };
    await persistSet(MIGRATION_STATUS_V11, conflict);
    return conflict;
  }
  const backupOk = await createSafetyBackup(MIGRATION_BACKUP_V11, 10, before, Object.keys(before));
  if (!backupOk) {
    await persistSet(MIGRATION_STATUS_V11, { status: 'backup-failed', failedAt: new Date().toISOString() });
    return { status: 'backup-failed' };
  }
  const after = JSON.parse(JSON.stringify(before));
  after.storageSchemaVersion = STORAGE_SCHEMA_VERSION;
  after.clinicalProfile = { ...CLINICAL_PROFILE, ...(after.clinicalProfile || {}), medicalRecommendation: { ...CLINICAL_PROFILE.medicalRecommendation, ...(after.clinicalProfile?.medicalRecommendation || {}) } };
  after.weeklyGoals = after.weeklyGoals || WEEKLY_GOALS;
  after[MIGRATION_STATUS_V11] = { status: 'completed', completedAt: new Date().toISOString(), sourceSchemaVersion: 10, movedKeys: [] };
  try {
    await StorageMigration.commitSnapshot({ set: persistSet, delete: persistDelete }, before, after, ['clinicalProfile', 'weeklyGoals', MIGRATION_STATUS_V11, 'storageSchemaVersion']);
    return { status: 'completed' };
  } catch (error) {
    try { await persistSet(MIGRATION_STATUS_V11, { status: 'failed', failedAt: new Date().toISOString(), message: String(error.message || error) }); } catch {}
    throw error;
  }
}
async function migrateV12() {
  const before = storageSnapshot();
  if (Number(before.storageSchemaVersion) === STORAGE_SCHEMA_VERSION) {
    if (!before[MIGRATION_STATUS_V12]) await persistSet(MIGRATION_STATUS_V12, { status: 'completed-unverified', detectedAt: new Date().toISOString(), sourceSchemaVersion: STORAGE_SCHEMA_VERSION, movedKeys: [] });
    return { status: 'current' };
  }
  if (Number(before.storageSchemaVersion) !== 11) return { status: 'not-applicable' };
  const existingBackup = before[MIGRATION_BACKUP_V12];
  if (existingBackup && existingBackup.sourceSchemaVersion !== 11) {
    const conflict = { status: 'backup-conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 11 };
    await persistSet(MIGRATION_STATUS_V12, conflict);
    return conflict;
  }
  const backupOk = await createSafetyBackup(MIGRATION_BACKUP_V12, 11, before, Object.keys(before));
  if (!backupOk) {
    await persistSet(MIGRATION_STATUS_V12, { status: 'backup-failed', failedAt: new Date().toISOString() });
    return { status: 'backup-failed' };
  }
  const transformed = StorageMigration.transformV11ToV12(before);
  if (!transformed.ok) {
    const conflict = { status: 'conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 11, conflicts: transformed.conflicts };
    await persistSet(MIGRATION_STATUS_V12, conflict);
    console.warn('[storage migration] v12 migration blocked by key conflicts', conflict);
    return conflict;
  }
  const after = transformed.result;
  after.storageSchemaVersion = STORAGE_SCHEMA_VERSION;
  after[MIGRATION_STATUS_V12] = { status: 'completed', completedAt: new Date().toISOString(), sourceSchemaVersion: 11, movedKeys: transformed.moves.map(({ from, to }) => ({ from, to })) };
  try {
    await StorageMigration.commitSnapshot({ set: persistSet, delete: persistDelete }, before, after, [MIGRATION_STATUS_V12, 'storageSchemaVersion']);
    return { status: 'completed' };
  } catch (error) {
    try { await persistSet(MIGRATION_STATUS_V12, { status: 'failed', failedAt: new Date().toISOString(), message: String(error.message || error) }); } catch {}
    throw error;
  }
}
/* v12→v13: B루틴 재편성(덤벨로우→체스트프레스→레터럴레이즈→숄더프레스→
   리버스펙덱(신규)→랫풀다운→레그익스텐션) 인덱스 리맵. 팔로프프레스는
   B에서 빠지므로 기록/PR은 archivedRec:/archivedPr:로 보존(삭제 아님). */
async function migrateV13() {
  const before = storageSnapshot();
  if (Number(before.storageSchemaVersion) === STORAGE_SCHEMA_VERSION) {
    if (!before[MIGRATION_STATUS_V13]) await persistSet(MIGRATION_STATUS_V13, { status: 'completed-unverified', detectedAt: new Date().toISOString(), sourceSchemaVersion: STORAGE_SCHEMA_VERSION, movedKeys: [] });
    return { status: 'current' };
  }
  if (Number(before.storageSchemaVersion) !== 12) return { status: 'not-applicable' };
  const existingBackup = before[MIGRATION_BACKUP_V13];
  if (existingBackup && existingBackup.sourceSchemaVersion !== 12) {
    const conflict = { status: 'backup-conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 12 };
    await persistSet(MIGRATION_STATUS_V13, conflict);
    return conflict;
  }
  const backupOk = await createSafetyBackup(MIGRATION_BACKUP_V13, 12, before, Object.keys(before));
  if (!backupOk) {
    await persistSet(MIGRATION_STATUS_V13, { status: 'backup-failed', failedAt: new Date().toISOString() });
    return { status: 'backup-failed' };
  }
  const transformed = StorageMigration.transformV12ToV13(before);
  if (!transformed.ok) {
    const conflict = { status: 'conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 12, conflicts: transformed.conflicts };
    await persistSet(MIGRATION_STATUS_V13, conflict);
    console.warn('[storage migration] v13 migration blocked by key conflicts', conflict);
    return conflict;
  }
  const after = transformed.result;
  after.storageSchemaVersion = STORAGE_SCHEMA_VERSION;
  after[MIGRATION_STATUS_V13] = { status: 'completed', completedAt: new Date().toISOString(), sourceSchemaVersion: 12, movedKeys: transformed.moves.map(({ from, to }) => ({ from, to })) };
  try {
    await StorageMigration.commitSnapshot({ set: persistSet, delete: persistDelete }, before, after, [MIGRATION_STATUS_V13, 'storageSchemaVersion']);
    return { status: 'completed' };
  } catch (error) {
    try { await persistSet(MIGRATION_STATUS_V13, { status: 'failed', failedAt: new Date().toISOString(), message: String(error.message || error) }); } catch {}
    throw error;
  }
}
async function initStorage() {
  const localSnapshot = {};
  const remoteSnapshot = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('routine:')) {
        const k = key.slice(8);
        try { localSnapshot[k] = JSON.parse(localStorage.getItem(key)); } catch {}
      }
    }
  } catch {}
  if (window.storage) {
    try {
      const keys = await window.storage.list('');
      if (keys?.keys) await Promise.all(keys.keys.map(async (k) => {
        try { const r = await window.storage.get(k); if (r) remoteSnapshot[k] = JSON.parse(r.value); } catch {}
      }));
    } catch (error) { markStorageSyncPending('list', error); }
  }
  const reconciliation = StorageMigration.reconcileStorageSnapshots(localSnapshot, remoteSnapshot);
  Object.assign(_cache, reconciliation.merged);
  try {
    for (const [k, v] of Object.entries(reconciliation.localWrites))
      localStorage.setItem('routine:' + k, JSON.stringify(v));
    if (window.storage) for (const [k, v] of Object.entries(reconciliation.remoteWrites))
      await window.storage.set(k, JSON.stringify(v));
    if (gls('storageSyncStatus')?.status === 'pending') {
      const synced = { status: 'synced', authority: 'localStorage', completedAt: new Date().toISOString() };
      localStorage.setItem('routine:storageSyncStatus', JSON.stringify(synced));
      if (window.storage) await window.storage.set('storageSyncStatus', JSON.stringify(synced));
      _cache.storageSyncStatus = synced;
    }
  } catch (error) { markStorageSyncPending('startup-reconcile', error); }
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
  if (
    (e.id && h.some((item) => item.id === e.id)) ||
    h.some((item) => item.date === e.date && item.routine === e.routine)
  )
    return;
  h.unshift(e);
  sls('wh', h.slice(0, 400));
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
        selectRoutine(d.rk);
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
/* 사용자가 직접 입력한 텍스트(메모·커스텀 종목명 등)를 innerHTML에 꽂을 때 반드시 통과시킨다.
   HTML 콘텐츠·속성·인라인 onclick 문자열 인자 세 자리 모두에서 안전하도록 5종을 전부 이스케이프한다. */
function escapeHtml(str) {
  return String(str ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

/* ── PLATEAU DETECTION ── */
/* preHist: showRoutine()이 같은 종목에 대해 이미 조회해둔 이력을 넘기면 재조회를 건너뛴다 */
function detectPlateau(rk, idx, preHist) {
  const ex = ROUTINES[rk].exercises[idx];
  const hist = (preHist || getExHistory(rk, idx)).slice(0, 4);
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
/* preHist: showRoutine()이 같은 종목에 대해 이미 조회해둔 이력을 넘기면 재조회를 건너뛴다 */
function getSmartRec(rk, idx, preHist) {
  const ex = ROUTINES[rk].exercises[idx];
  const hist = preHist || getExHistory(rk, idx);
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
  /* 자중·저중량(0kg) 종목: 중량 % 추천 무의미 → 수행 기준 안내 */
  if (lastKg === 0) {
    if (lastPain === 'joint' || lastPain === 'nerve')
      return {
        action: 'REDUCE',
        kg: 0,
        msg: '지난번 통증 기록 — 가동범위 줄이고 감각 위주. 통증 시 즉시 중단.',
        restSecs: 90,
      };
    return {
      action: 'MAINTAIN',
      kg: 0,
      msg: last.summary
        ? `지난 기록: ${last.summary}. 동일 수행, 여유 있으면 마지막 세트 +1~2회.`
        : '자중·저중량 종목 — 중량보다 수축 감각과 템포 우선.',
      restSecs: 90,
    };
  }
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
  if (lastRpe >= 1 && lastRpe <= 7) {
    // 컨디션 미입력 = "양호"가 아님 → 체크 유도 후 증량 판단
    if (!hasReadinessToday())
      return {
        action: 'MAINTAIN',
        kg: lastKg,
        msg: `오늘 컨디션 미입력 — 위 체크 먼저. 그 전엔 ${lastKg}kg 유지.`,
        restSecs: 90,
      };
    // 당일 컨디션 게이트: 회복도 낮으면 증량 보류 (지침: 주의 → 강도 하향)
    if (readinessScore() < 55)
      return {
        action: 'MAINTAIN',
        kg: lastKg,
        msg: `RPE ${lastRpe}지만 오늘 회복도 ${readinessScore()}점 — 증량 보류, ${lastKg}kg 유지. 자세·감각 위주.`,
        restSecs: 120,
      };
    return {
      action: 'INCREASE',
      kg: roundHalf(lastKg * 1.05),
      msg: `RPE ${lastRpe} — +5% 증량 시도: ${roundHalf(lastKg * 1.05)}kg. 자세 무너지면 원중량.`,
      restSecs: 75,
    };
  }
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
  if (!restRunning) restLeft = secs;
  renderRestTimer();
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
const NOTION_WEBHOOK_CONFIG = 'notionWebhookConfig';
const NOTION_WEBHOOK_OUTBOX = 'notionWebhookOutbox';
const NOTION_WEBHOOK_DELIVERED = 'notionWebhookDelivered';
const DEFAULT_NOTION_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwCr7_TgbOX3rPYl3aQX_DR7DEgB8NMP8Wgor1YE2YCdm9xNTTeMk5Wp9TFVjI2QQKKDA/exec';
let notionWebhookFlushRunning = false;

function getNotionWebhookConfig() {
  const saved = gls(NOTION_WEBHOOK_CONFIG);
  if (saved) return saved;
  const legacy = gls('healthWebhookConfig');
  if (legacy) return { enabled: !!legacy.enabled, url: legacy.url || '' };
  const legacyUrl = (gls('webhookUrl') || '').trim();
  if (legacyUrl) return { enabled: gls('webhookEnabled') !== false, url: legacyUrl };
  return { enabled: true, url: DEFAULT_NOTION_WEBHOOK_URL };
}
function isValidWebhookUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}
function setNotionSyncStatus(message, isError) {
  const el = document.getElementById('notionSyncStatus');
  if (el) {
    el.textContent = message || '';
    el.style.color = isError ? 'var(--danger)' : '';
  }
}
function hydrateNotionWebhookSettings() {
  const config = getNotionWebhookConfig();
  const enabled = document.getElementById('notionWebhookEnabled');
  const url = document.getElementById('notionWebhookUrl');
  if (enabled) enabled.checked = !!config.enabled;
  if (url) url.value = config.url || '';
}
function saveNotionWebhookSettings() {
  const enabled = !!document.getElementById('notionWebhookEnabled')?.checked;
  const url = document.getElementById('notionWebhookUrl')?.value.trim() || '';
  if (enabled && !isValidWebhookUrl(url)) {
    showToast('⚠️ HTTPS 웹훅 URL을 확인해줘');
    return false;
  }
  sls(NOTION_WEBHOOK_CONFIG, { enabled, url });
  showToast(enabled ? '✅ Notion 자동 기록 켜짐' : 'Notion 자동 기록 꺼짐');
  if (enabled) flushNotionWebhookOutbox();
  return true;
}
async function postNotionWebhook(url, payload) {
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
}
async function testNotionWebhook() {
  if (!saveNotionWebhookSettings()) return;
  const config = getNotionWebhookConfig();
  if (!config.enabled) {
    showToast('자동 전송을 먼저 켜줘');
    return;
  }
  try {
    await postNotionWebhook(config.url, {
      schemaVersion: 1,
      event: 'webhook.test',
      eventId: `test:${Date.now()}`,
      createdAt: new Date().toISOString(),
      destination: { type: 'notion' },
      notion: { title: '내 루틴 시험 기록', markdown: '# 내 루틴 시험 기록\n\nNotion 연동이 정상입니다.' },
      message: '내 루틴 Notion 웹훅 시험 전송',
    });
    showToast('📨 시험 전송을 중계기에 전달했어');
  } catch (error) {
    console.error('[notion webhook] test failed', error);
    showToast('⚠️ 시험 전송 실패 — URL·네트워크 확인');
  }
}
function enqueueExerciseNotionCompletion(idx, ex, rec) {
  const config = getNotionWebhookConfig();
  if (!config.enabled || !isValidWebhookUrl(config.url)) return;
  const completion = CompletionSync.buildExerciseCompletion({
    routineKey: currentRoutine,
    routineLabel: ROUTINES[currentRoutine].label,
    date: todayStr(),
    exerciseIdx: idx,
    exerciseName: ex.name,
    exerciseId: ex.id || null,
    completedAt: new Date().toISOString(),
    summary: rec.summary || '',
    rpe: rec.rpe || '',
    pain: rec.pain || '',
    note: rec.note || '',
  });
  const delivered = gls(NOTION_WEBHOOK_DELIVERED) || [];
  if (delivered.includes(completion.id)) return;
  const event = CompletionSync.buildExerciseNotionEvent(completion);
  sls(
    NOTION_WEBHOOK_OUTBOX,
    CompletionSync.enqueue(gls(NOTION_WEBHOOK_OUTBOX) || [], event),
  );
  setNotionSyncStatus('📨 Notion 기록 대기 중…');
  flushNotionWebhookOutbox();
}
function enqueueNotionCompletion(completion) {
  const config = getNotionWebhookConfig();
  if (!config.enabled || !isValidWebhookUrl(config.url)) return;
  const delivered = gls(NOTION_WEBHOOK_DELIVERED) || [];
  if (delivered.includes(completion.id)) {
    setNotionSyncStatus('✅ Notion 중계 전달 완료');
    return;
  }
  const event = CompletionSync.buildNotionEvent(completion);
  sls(
    NOTION_WEBHOOK_OUTBOX,
    CompletionSync.enqueue(gls(NOTION_WEBHOOK_OUTBOX) || [], event),
  );
  setNotionSyncStatus('📨 Notion 기록 대기 중…');
  flushNotionWebhookOutbox();
}
async function flushNotionWebhookOutbox() {
  if (notionWebhookFlushRunning) return;
  const config = getNotionWebhookConfig();
  if (!config.enabled || !isValidWebhookUrl(config.url)) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    setNotionSyncStatus('📴 오프라인 — 연결되면 Notion에 자동 기록');
    return;
  }
  notionWebhookFlushRunning = true;
  try {
    let outbox = gls(NOTION_WEBHOOK_OUTBOX) || [];
    for (const event of [...outbox]) {
      try {
        await postNotionWebhook(config.url, event);
        outbox = CompletionSync.markDelivered(outbox, event.eventId);
        sls(NOTION_WEBHOOK_OUTBOX, outbox);
        const delivered = gls(NOTION_WEBHOOK_DELIVERED) || [];
        if (!delivered.includes(event.eventId))
          sls(NOTION_WEBHOOK_DELIVERED, [...delivered, event.eventId].slice(-400));
        setNotionSyncStatus('✅ Notion 중계기에 전달됨');
      } catch (error) {
        console.error('[notion webhook] delivery failed', error);
        setNotionSyncStatus('⚠️ 기록 보류 — 온라인이 되면 자동 재시도', true);
        break;
      }
    }
  } finally {
    notionWebhookFlushRunning = false;
  }
}
function flushRoutineInputs(routineKey, date) {
  if (routineKey !== currentRoutine) return;
  ROUTINES[routineKey].exercises.forEach((ex, idx) => {
    const rec = getRecord(`${routineKey}_${idx}_${date}`);
    if (ex.id) rec.exerciseId = ex.id;
    const parts = [];
    for (let s = 0; s < ex.sets; s++) {
      const kgEl = document.getElementById(`kg_${idx}_${s}`);
      const repsEl = document.getElementById(`rp_${idx}_${s}`);
      if (kgEl) rec['kg_' + s] = parseFloat(kgEl.value) || 0;
      if (repsEl) rec['reps_' + s] = parseInt(repsEl.value) || 0;
      if (rec['kg_' + s] && rec['reps_' + s])
        parts.push(`${rec['kg_' + s]}kg×${rec['reps_' + s]}`);
    }
    rec.summary = parts.join(' / ');
    const rpe = document.getElementById(`rpe_${idx}`);
    const pain = document.getElementById(`pain_${idx}`);
    const note = document.getElementById(`note_${idx}`);
    if (rpe) rec.rpe = rpe.value || '';
    if (pain) rec.pain = pain.value || '';
    if (note) rec.note = note.value || '';
    clearTimeout(window['_t' + idx]);
    saveRecord(`${routineKey}_${idx}_${date}`, rec);
  });
}
function finalizeWorkoutCompletion(routineKey, date) {
  const key = `workout:${routineKey}:${date}`;
  let completion = gls(key);
  if (!completion) {
    flushRoutineInputs(routineKey, date);
    const routine = ROUTINES[routineKey];
    const totalSets = routine.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const readiness = getReadiness();
    completion = CompletionSync.buildWorkoutCompletion({
      routineKey,
      routineLabel: routine.label,
      date,
      completedAt: new Date().toISOString(),
      volumeKg: computeVolume(routineKey),
      totalSets,
      readiness: { ...readiness, score: readinessScore() },
      exercises: routine.exercises.map((ex, idx) => {
        const rec = getRecord(`${routineKey}_${idx}_${date}`);
        return {
          id: ex.id || null,
          name: ex.name,
          summary: rec.summary || '',
          rpe: rec.rpe || '',
          pain: rec.pain || '',
          note: rec.note || '',
        };
      }),
    });
    sls(key, completion);
    sls('done:' + date, true);
    const nc = markWorkoutDay();
    document.getElementById('streakNum').textContent = nc;
    addHistory({
      id: completion.id,
      date,
      routine: routine.label,
      summary: `${completion.volumeKg}kg · ${totalSets}세트`,
    });
    renderEnhancedDone();
  }
  enqueueNotionCompletion(completion);
  return completion;
}

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
    banner.classList.add('show');
    const completion = finalizeWorkoutCompletion(currentRoutine, today);
    document.getElementById('completeExCount').textContent = total;
    document.getElementById('completeVolume').textContent = completion.volumeKg;
    document.getElementById('completeSets').textContent = completion.totalSets;
    const completed = new Date(completion.completedAt);
    document.getElementById('completeTime').textContent =
      `${completed.getHours()}시 ${String(completed.getMinutes()).padStart(2, '0')}분 완료 · 자동 저장됨`;
  } else banner.classList.remove('show');
  updateCoachPanel();
  updateTodaySummary();
  renderRoutineOverview();
  updateCoachNudge();
  updateBeginnerGuide();
}

function updateBeginnerGuide() {
  const title = document.getElementById('beginnerTitle');
  const guide = document.getElementById('beginnerGuide');
  const button = document.querySelector('.beginner-start button');
  if (!title || !guide || !button) return;
  const routine = ROUTINES[currentRoutine];
  const done = getDoneCount(currentRoutine);
  const total = routine.exercises.length;
  const nextIdx = getCurrentExerciseIdx();
  if (done >= total) {
    title.textContent = '오늘 운동을 모두 마쳤어요';
    guide.textContent = '기록은 자동 저장됐습니다. 충분히 쉬고 다음 운동 때 다시 만나요.';
    button.textContent = '완료 기록 보기';
    button.onclick = () => switchTabById('history');
    return;
  }
  const next = routine.exercises[nextIdx];
  title.textContent = done ? `${next.name}부터 이어서 하세요` : `${routine.label} · ${next.name}부터 시작`;
  guide.textContent = done
    ? `${done}/${total}종목 완료했습니다. 다음 세트의 무게와 횟수만 확인하세요.`
    : '지난 기록은 자동으로 채워집니다. 무게를 확인하고 완료만 누르세요.';
  button.textContent = done ? '이어서 운동하기' : '첫 운동 시작';
  button.onclick = startTodayWorkout;
}

function startTodayWorkout() {
  switchTabById('gym');
  const idx = getCurrentExerciseIdx();
  const card = document.getElementById('ex-' + idx);
  if (card) {
    card.classList.add('open', 'rec-open');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
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
  Object.keys(ROUTINES).forEach((k) => {
    const c = document.createElement('button');
    c.className = 'routine-chip' + (k === currentRoutine ? ' active' : '');
    c.type = 'button';
    c.dataset.rk = k;
    c.setAttribute('aria-pressed', String(k === currentRoutine));
    c.onclick = () => selectRoutine(k);
    c.innerHTML = `<strong>${ROUTINES[k].label}</strong> ${ROUTINES[k].day}`;
    sel.appendChild(c);
  });
}
function selectRoutine(key) {
  showRoutine(key);
}
function showRoutine(key) {
  currentRoutine = key;
  document.querySelectorAll('.routine-chip').forEach((c) => {
    const active = c.dataset.rk === key;
    c.classList.toggle('active', active);
    c.setAttribute('aria-pressed', String(active));
  });
  const r = ROUTINES[key];
  const today = todayStr();
  const content = document.getElementById('routineContent');
  content.innerHTML = `<div class="sec-hdr"><div class="sec-icon">🏋️</div><div class="sec-title">${r.label} — ${r.day}</div><div class="sec-badge">${r.tag}</div></div>`;
  r.exercises.forEach((ex, idx) => {
    const rec = getRecord(`${key}_${idx}_${today}`);
    const isDone = !!rec.allDone;
    const prKey = `pr:${key}_${idx}`;
    const pr = gls(prKey) || 0;

    /* 종목당 이력 조회를 한 번만 하고 코치 추천·정체 감지에 재사용 (중복 스캔 제거) */
    const hist = getExHistory(key, idx);
    const smartRec = getSmartRec(key, idx, hist);
    const plateau = detectPlateau(key, idx, hist);

    /* Previous session data for pre-fill */
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
    <button class="set-check-btn${checked ? ' checked' : ''}" id="chk_${idx}_${s}" onclick="toggleSetCheck(${idx},${s})" type="button" aria-pressed="${checked}">${checked ? '✓ 완료됨' : '✓ 완료'}</button>
  </div>
  <div class="rec-inputs">
    <div class="rec-fw">
      <div class="rec-flbl">중량 KG</div>
      <div class="adj-wrap">
        <button class="adj-s" onclick="adj('kg',${idx},${s},-2.5)" data-idx="${idx}" data-s="${s}" data-type="kg" data-delta="-2.5" type="button" aria-label="${s + 1}세트 중량 2.5kg 감소, 길게 누르면 가속">−</button>
        <input class="rec-inp${isPrefilled ? ' prefilled' : ''}" type="number" inputmode="decimal" placeholder="—" id="kg_${idx}_${s}" value="${kgVal}" onchange="onInpChange(${idx},${s})" aria-label="${s + 1}세트 중량 kg">
        <button class="adj-s" onclick="adj('kg',${idx},${s},2.5)" data-idx="${idx}" data-s="${s}" data-type="kg" data-delta="2.5" type="button" aria-label="${s + 1}세트 중량 2.5kg 증가, 길게 누르면 가속">+</button>
      </div>${e1}
    </div>
    <div class="rec-fw">
      <div class="rec-flbl">횟수 REP</div>
      <div class="adj-wrap">
        <button class="adj-s" onclick="adj('rp',${idx},${s},-1)" data-idx="${idx}" data-s="${s}" data-type="rp" data-delta="-1" type="button" aria-label="${s + 1}세트 횟수 1회 감소, 길게 누르면 가속">−</button>
        <input class="rec-inp${isPrefilled ? ' prefilled' : ''}" type="number" inputmode="numeric" placeholder="—" id="rp_${idx}_${s}" value="${rpVal}" onchange="onInpChange(${idx},${s})" aria-label="${s + 1}세트 반복 횟수">
        <button class="adj-s" onclick="adj('rp',${idx},${s},1)" data-idx="${idx}" data-s="${s}" data-type="rp" data-delta="1" type="button" aria-label="${s + 1}세트 횟수 1회 증가, 길게 누르면 가속">+</button>
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

    /* ── TOP INSIGHT (정보 위계): 정체 경고 > 코치 추천, 한 번에 하나만 ── */
    const applyKg =
      smartRec.kg > 0
        ? `<button class="crb-apply-btn" onclick="applyRec(${idx},${smartRec.kg})">✓ ${smartRec.kg}kg 적용</button>`
        : '';
    const recIcon =
      smartRec.action === 'INCREASE'
        ? '📈'
        : smartRec.action === 'REDUCE'
          ? '📉'
          : smartRec.action === 'MAINTAIN'
            ? '⚖️'
            : '🎯';
    const topInsight = plateau
      ? `<div class="top-insight plateau">📊 ${plateau}</div>`
      : smartRec.msg
        ? `<div class="top-insight rec"><span class="ti-icon">${recIcon}</span><span class="ti-text">${smartRec.msg}</span>${applyKg}</div>`
        : '';

    const rpeVal = rec.rpe || '';
    const painVal = rec.pain || '';
    const noteVal = escapeHtml(rec.note || '');
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

    /* ── 참고용 정보(이전 기록·PR·볼륨)는 한 줄로 접어둔다 ── */
    const moreParts = [];
    if (prevHtml) moreParts.push(prevHtml);
    if (pr) moreParts.push(`<div class="rec-more-line">🏆 PR ${pr}kg</div>`);
    if (vol > 0) moreParts.push(`<div class="rec-more-line">📦 이번 세션 볼륨 ${vol}kg</div>`);
    const moreHtml = moreParts.length
      ? `<div class="rec-more" onclick="toggleRecMore(${idx})" role="button" tabindex="0" aria-label="지난 기록·PR·볼륨 펼치기/접기"><span class="rec-more-lbl">지난 기록 · PR · 볼륨</span><span class="rec-more-badge">${moreParts.length}</span><span class="rec-more-chev">▾</span></div><div class="rec-more-body" id="recMore_${idx}">${moreParts.join('')}</div>`
      : '';

    const card = document.createElement('div');
    card.className =
      'ex-card' + (isDone ? ' done' : '') + (plateau ? ' plateau' : '');
    card.id = 'ex-' + idx;
    card.innerHTML = `
<div class="ex-head" onclick="toggleCard(${idx})" role="button" tabindex="0" aria-label="${escapeHtml(ex.name)} 펼치기/접기">
  <div class="ex-num">${String(idx + 1).padStart(2, '0')}</div>
  <div class="ex-name-wrap"><span class="ex-name">${escapeHtml(ex.name)}<button class="ex-info-btn" onclick="event.stopPropagation();toggleExInfo(${idx})" type="button" aria-label="${escapeHtml(ex.name)} 폼 가이드 보기">ⓘ</button></span><span class="ex-target">${escapeHtml(ex.target)}</span></div>
  <div class="ex-right">${volHtml}${prHtml}${plateauBadgeHtml}<div class="done-check">✓</div><span class="ex-chev">▾</span></div>
</div>
<div class="ex-sets-row">
  <div class="set-chip">📦 ${ex.sets}세트</div>
  <div class="set-chip">🔁 ${ex.reps}</div>
  <div class="set-chip">⚖️ ${ex.weight}</div>
</div>
<div class="ex-detail" id="exInfo_${idx}">
  <div class="dl"><div class="dl-label">⬆ 수축</div><div class="dl-text">${ex.con}</div></div>
  <div class="dl"><div class="dl-label">⬇ 이완</div><div class="dl-text">${ex.ecc}</div></div>
  ${ex.tip ? `<div class="tip-box">💡 ${ex.tip}</div>` : ''}
  ${ex.warn ? `<div class="warn-box">⚠️ ${ex.warn}</div>` : ''}
</div>
<div class="rec-body">${topInsight}${moreHtml}<div class="quick-row"><button class="quick-btn primary" onclick="copyPrevious(${idx})" type="button">지난 기록 복사</button><button class="quick-btn" onclick="sameAsFirst(${idx})" type="button">1세트로 통일</button><button class="quick-btn" onclick="bumpExercise(${idx},2.5)" type="button">전체 +2.5kg</button><button class="quick-btn danger" onclick="stopForPain(${idx})" type="button">통증 중단</button></div>${setRowsHtml}${extraHtml}<button class="rec-save-btn" onclick="saveEx(${idx})" type="button">저장</button></div>`;
    content.appendChild(card);
  });
  updateProgress();
}

/* ═══ 오늘 루틴 요약 (한눈에 보기) ═══ */
function renderRoutineOverview() {
  const el = document.getElementById('routineOverview');
  if (!el) return;
  const r = ROUTINES[currentRoutine];
  const today = todayStr();
  const itemsHtml = r.exercises
    .map((ex, idx) => {
      const rec = getRecord(`${currentRoutine}_${idx}_${today}`);
      let doneSets = 0;
      for (let s = 0; s < ex.sets; s++) if (rec['checked_' + s]) doneSets++;
      const isDone = !!rec.allDone;
      return `<button type="button" class="ro-item${isDone ? ' done' : ''}" id="roItem_${idx}" onclick="openExerciseFromOverview(${idx})" aria-label="${escapeHtml(ex.name)} 카드 열기">
  <span class="ro-name">${escapeHtml(ex.name)}</span>
  <span class="ro-progress" id="roProgress_${idx}">${doneSets}/${ex.sets}세트</span>
</button>`;
    })
    .join('');
  el.innerHTML = `<div class="ro-title">${r.label} 오늘 루틴 · ${r.exercises.length}종목</div><div class="ro-grid">${itemsHtml}</div>`;
}
function openExerciseFromOverview(idx) {
  document.querySelectorAll('.ex-card.open').forEach((c) => c.classList.remove('open'));
  const card = document.getElementById('ex-' + idx);
  if (!card) return;
  card.classList.add('open');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
function toggleExInfo(idx) {
  document.getElementById('exInfo_' + idx)?.classList.toggle('show');
}
function toggleRecMore(idx) {
  document.getElementById('recMore_' + idx)?.classList.toggle('show');
  document.getElementById('recMore_' + idx)?.previousElementSibling?.classList.toggle('open');
}

/* ── 길게 누르면 가속되는 ± 조정 (20kg 차이를 8번 누르지 않도록) ── */
let adjHoldTimer = null,
  adjHoldInterval = null,
  adjHoldBtn = null,
  adjHoldFired = false;
function clearAdjHold() {
  clearTimeout(adjHoldTimer);
  clearInterval(adjHoldInterval);
  adjHoldTimer = null;
  adjHoldInterval = null;
}
document.addEventListener('pointerdown', (e) => {
  const btn = e.target.closest('.adj-s');
  if (!btn) return;
  adjHoldBtn = btn;
  adjHoldFired = false;
  const idx = +btn.dataset.idx,
    s = +btn.dataset.s,
    type = btn.dataset.type,
    baseDelta = +btn.dataset.delta;
  let step = 0;
  adjHoldTimer = setTimeout(() => {
    adjHoldInterval = setInterval(() => {
      step++;
      adjHoldFired = true;
      const mult = step > 14 ? 4 : step > 7 ? 2 : 1;
      adj(type, idx, s, baseDelta * mult);
    }, 110);
  }, 420);
});
['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) =>
  document.addEventListener(evt, clearAdjHold),
);
document.addEventListener(
  'click',
  (e) => {
    const btn = e.target.closest('.adj-s');
    if (btn && btn === adjHoldBtn && adjHoldFired) {
      e.preventDefault();
      e.stopImmediatePropagation();
      adjHoldFired = false;
    }
  },
  true,
);

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
  btn.textContent = isChecked ? '✓ 완료됨' : '✓ 완료';
  btn.setAttribute('aria-pressed', String(isChecked));
  const today = todayStr();
  const rKey = `${currentRoutine}_${idx}_${today}`;
  const rec = getRecord(rKey);
  const ex = ROUTINES[currentRoutine].exercises[idx];
  if (ex.id) rec.exerciseId = ex.id;
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
    showToast(`✅ ${ex.name} ${s + 1}세트 완료 · 휴식 ${formatRestTime(restSecs)} 시작`);
  }

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
      if (ex.id) sls('prExerciseId:' + currentRoutine + '_' + idx, ex.id);
      showToast(`🏆 PR! ${maxKg}kg`);
    } else showToast('✅ ' + ex.name + ' 완료!');
    try {
      navigator.vibrate?.(60);
    } catch {}
  } else if (!isChecked) {
    showToast('↩️ 되돌림 — 다시 누르면 완료 처리');
  }
  rec.rpe = document.getElementById(`rpe_${idx}`)?.value || rec.rpe || '';
  rec.pain = document.getElementById(`pain_${idx}`)?.value || rec.pain || '';
  rec.note = document.getElementById(`note_${idx}`)?.value || rec.note || '';
  saveRecord(rKey, rec);
  document.getElementById('ex-' + idx)?.classList.toggle('done', allChecked);
  if (allChecked) {
    enqueueExerciseNotionCompletion(idx, ex, rec);
    openNextExercise(idx);
  }
  updateProgress();
}
function saveEx(idx, silent) {
  const ex = ROUTINES[currentRoutine].exercises[idx];
  const today = todayStr();
  const rKey = `${currentRoutine}_${idx}_${today}`;
  const rec = getRecord(rKey);
  if (ex.id) rec.exerciseId = ex.id;
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
    .querySelectorAll('.ex-card.open')
    .forEach((c) => c.classList.remove('open'));
  if (!next) {
    updateCoachNudge();
    return;
  }
  next.classList.add('open');
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
      ? '오늘은 회복 부담이 컸다. 내일은 충분히 쉬는 게 맞다.'
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

function formatRestTime(secs) {
  const safe = Math.max(0, Math.round(secs));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

/* ═══ 하단 독: 탭 메뉴 ↔ 휴식 타이머 전환 ═══ */
let bottomDockMode = 'nav';
function setBottomDockMode(mode) {
  bottomDockMode = mode === 'rest' ? 'rest' : 'nav';
  const dock = document.getElementById('bottomDock');
  if (dock) dock.classList.toggle('mode-rest', bottomDockMode === 'rest');
  const toggle = document.getElementById('dockToggle');
  if (toggle) {
    toggle.textContent = bottomDockMode === 'rest' ? '☰' : '⏱';
    toggle.setAttribute('aria-label', bottomDockMode === 'rest' ? '탭 메뉴 보기' : '휴식 타이머 보기');
  }
}
function toggleBottomDockMode() {
  setBottomDockMode(bottomDockMode === 'rest' ? 'nav' : 'rest');
}

function renderRestTimer(state = '') {
  const display = restLeft <= 0 ? 'GO! 💪' : formatRestTime(restLeft);
  const mainDisplay = document.getElementById('restDisplay');
  const btn = document.getElementById('restBtn');
  const fill = document.getElementById('restFill');
  const brbDisplay = document.getElementById('brbDisplay');
  const brbBtn = document.getElementById('brbBtn');
  const brbFill = document.getElementById('brbFill');
  const brbBar = document.getElementById('bottomRestBar');

  if (mainDisplay) {
    mainDisplay.textContent = display;
    mainDisplay.className = 'rest-timer' + (state ? ` ${state}` : '');
  }
  if (btn) btn.textContent = restRunning ? '초기화' : '시작';
  if (fill) {
    fill.style.width = restLeft <= 0 ? '100%' : `${Math.max(0, (restLeft / restTotal) * 100)}%`;
    fill.style.background = state === 'danger' ? 'var(--red)' : state === 'warn' ? 'var(--yellow)' : state === 'done' ? 'var(--green)' : 'var(--accent)';
  }
  if (brbDisplay) brbDisplay.textContent = display;
  if (brbBtn) brbBtn.textContent = restRunning ? '초기화' : '시작';
  if (brbFill) {
    brbFill.style.width = restLeft <= 0 ? '100%' : `${Math.max(0, (restLeft / restTotal) * 100)}%`;
  }
  if (brbBar) {
    brbBar.classList.remove('warn', 'danger');
    if (state === 'danger' || state === 'warn') brbBar.classList.add(state);
  }
}

function adjustRestTime(seconds, event) {
  event?.stopPropagation();
  restTotal = Math.max(15, restTotal + seconds);
  if (restRunning && restEndAt) restEndAt += seconds * 1000;
  restLeft = Math.max(0, restLeft + seconds);
  lastRestSecs = restTotal;
  const hint = document.getElementById('restHint');
  if (hint) hint.textContent = `⏱ ${restTotal}초 설정`;
  renderRestTimer(restLeft <= 10 && restRunning ? 'danger' : restLeft <= 30 && restRunning ? 'warn' : '');
  showToast(`휴식시간 ${seconds > 0 ? '+' : ''}${seconds}초`);
}

/* 휴식 종료음 (기본 off — 토글로 활성화) */
let audioCtx = null;
function soundOn() {
  return !!gls('soundOn');
}
function ensureAudio() {
  try {
    audioCtx =
      audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {}
}
function toggleSound() {
  const on = !soundOn();
  sls('soundOn', on);
  if (on) ensureAudio();
  const b = document.getElementById('soundBtn');
  if (b) b.textContent = on ? '🔔' : '🔕';
  showToast(on ? '🔔 휴식 종료음 켜짐' : '🔕 휴식 종료음 꺼짐');
}
function playDoneBeep() {
  if (!soundOn() || !audioCtx) return;
  try {
    [0, 0.18, 0.36].forEach((t, i) => {
      const o = audioCtx.createOscillator(),
        g = audioCtx.createGain();
      o.frequency.value = i === 2 ? 1318 : 880;
      o.connect(g);
      g.connect(audioCtx.destination);
      const st = audioCtx.currentTime + t;
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(0.25, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 0.15);
      o.start(st);
      o.stop(st + 0.16);
    });
  } catch {}
}

/* timestamp 기반 — 백그라운드 스로틀링에도 시간 정확 */
let restEndAt = null,
  restWakeLock = null;
async function acquireWakeLock() {
  try {
    restWakeLock = await navigator.wakeLock?.request('screen');
  } catch {}
}
function releaseWakeLock() {
  try {
    restWakeLock?.release();
  } catch {}
  restWakeLock = null;
}
function restTick() {
  if (!restEndAt) return;
  restLeft = Math.round((restEndAt - Date.now()) / 1000);
  if (restLeft <= 0) {
    clearInterval(restInterval);
    restInterval = null;
    restRunning = false;
    restEndAt = null;
    restLeft = 0;
    releaseWakeLock();
    renderRestTimer('done');
    playDoneBeep();
    showToast('⏱ 휴식 완료!');
    try { navigator.vibrate?.([100, 50, 100]); } catch {}
    setBottomDockMode('nav');
    return;
  }
  renderRestTimer(restLeft <= 10 ? 'danger' : restLeft <= 30 ? 'warn' : '');
}
function toggleRest(autoStart) {
  if (restRunning && !autoStart) {
    clearInterval(restInterval);
    restInterval = null;
    restRunning = false;
    restEndAt = null;
    restLeft = restTotal;
    releaseWakeLock();
    renderRestTimer();
    setBottomDockMode('nav');
    return;
  }
  if (restRunning) return;

  restRunning = true;
  restEndAt = Date.now() + restTotal * 1000;
  restLeft = restTotal;
  renderRestTimer();
  acquireWakeLock();
  if (soundOn()) ensureAudio();
  restInterval = setInterval(restTick, 250);
  setBottomDockMode('rest');
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  if (restRunning && restEndAt) {
    restTick(); // 복귀 즉시 실제 경과 반영
    if (restRunning) acquireWakeLock(); // 백그라운드 진입 시 자동 해제되므로 재요청
  }
});

/* ═══ READINESS ═══ */
function hasReadinessToday() {
  return gls('readiness:' + todayStr()) !== null;
}
function getReadiness() {
  return gls('readiness:' + todayStr()) || { sleep: 3, fatigue: 3, pain: 1 };
}
function setReadiness(kind, val) {
  const r = getReadiness();
  r[kind] = val;
  sls('readiness:' + todayStr(), r);
  renderReadiness();
  updateCoachPanel();
}
const READINESS_SCALES = [
  ['rdSleep', 'sleep', '수면'],
  ['rdFatigue', 'fatigue', '피로'],
  ['rdPain', 'pain', '통증'],
];
function renderReadiness() {
  const r = getReadiness();
  READINESS_SCALES.forEach(([id, k, label]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = [1, 2, 3, 4, 5]
      .map(
        (v) =>
          `<button type="button" class="${v === r[k] ? 'pick' : ''}" onclick="setReadiness('${k}',${v})" aria-label="${label} ${v}점" aria-pressed="${v === r[k]}">${v}</button>`,
      )
      .join('');
  });
  const score = readinessScore();
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
        : `회복 ${score}점. 볼륨을 30~40% 줄이거나 오늘은 쉬는 것을 권장.`;
}
function readinessScore() {
  const r = getReadiness();
  return Math.round(
    (r.sleep / 5) * 40 + ((6 - r.fatigue) / 5) * 30 + ((6 - r.pain) / 5) * 30,
  );
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
  if (acts) {
    const chips = [
      `예상 ${Math.round(r.exercises.reduce((m, e) => m + e.sets * 2.5 + 2, 0))}분`,
      `월볼륨 ${formatKg(monthVolume())}`,
      hasReadinessToday() ? `회복 ${readinessScore()}점` : '회복 미입력 ⚠️',
    ];
    const bd = daysSinceBackup();
    if (bd === null || bd >= 14)
      chips.push(bd === null ? '📤 백업 없음' : `📤 백업 ${bd}일 전`);
    acts.innerHTML = chips
      .map((x) => `<span class="coach-chip">${x}</span>`)
      .join('');
  }
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
  const savedPanel = gls('histSubtab') || 'summary';
  const savedBtn = document.querySelector(`.hist-subtab[data-panel="${savedPanel}"]`);
  if (savedBtn) showHistSubtab(savedPanel, savedBtn);
}
function showHistSubtab(name, btn) {
  document.querySelectorAll('.hist-subtab').forEach((b) => {
    const active = b === btn;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  document
    .querySelectorAll('.hist-subpanel')
    .forEach((p) => p.classList.toggle('active', p.id === 'histPanel-' + name));
  sls('histSubtab', name);
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
  Object.keys(ROUTINES).forEach((rk) =>
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
function getMonthMuscleVolume(monthKey) {
  const result = {};
  Object.keys(ROUTINES).forEach((rk) =>
    ROUTINES[rk].exercises.forEach((ex, i) => {
      Object.keys(_cache)
        .filter((k) => k.startsWith(`rec:${rk}_${i}_${monthKey}`))
        .forEach((k) => {
          const rec = gls(k) || {};
          let vol = 0;
          for (let s = 0; s < ex.sets; s++)
            vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
          (ex.muscles || MUSCLE_MAP[ex.name] || ['기타']).forEach(
            (name) => (result[name] = (result[name] || 0) + vol),
          );
        });
    }),
  );
  return result;
}
function getMonthKey(offset = 0) {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function sumValues(obj) {
  return Object.values(obj).reduce((a, b) => a + b, 0);
}
function getTopEntry(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0] || null;
}
function getMuscleCoachText(muscles) {
  const upper = ['가슴', '등', '광배', '후면어깨', '측면어깨', '어깨'];
  const relevant = upper
    .map((name) => [name, muscles[name] || 0])
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);
  if (!relevant.length) return '근육별 기록이 더 필요하다.';

  const [topName, topVol] = relevant[0];
  const side = muscles['측면어깨'] || 0;
  const back = (muscles['등'] || 0) + (muscles['광배'] || 0);
  const chest = muscles['가슴'] || 0;

  if (chest > back * 1.25)
    return `가슴 비중이 높다. 다음 헬스는 랫풀다운·로우를 우선해서 당기기 볼륨을 보충해.`;
  if (back > chest * 1.6 && side < topVol * 0.3)
    return `등·광배는 충분히 쌓였다. 프레임 목표라면 측면어깨 세트를 먼저 늘리는 게 효율적이다.`;
  if (side > 0 && side < topVol * 0.25)
    return `현재 최다 부위는 ${topName}. 측면어깨 볼륨은 상대적으로 낮아서 다음 운동에 레터럴레이즈 1~2세트 추가가 적절하다.`;
  return `현재 최다 부위는 ${topName}. 큰 편중 없이 진행 중이니 중량보다 주간 반복성과 회복을 유지해.`;
}
function buildWeeklyReport() {
  const el = document.getElementById('weeklyReport');
  if (!el) return;
  const last7 = new Set();
  const prev7 = new Set();
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    (i < 7 ? last7 : prev7).add(fmtDate(d));
  }

  const calcPeriod = (dates) => {
    let days = 0;
    let vol = 0;
    dates.forEach((date) => {
      if (gls('done:' + date)) days++;
    });
    Object.keys(_cache).forEach((k) => {
      if (!k.startsWith('rec:')) return;
      const date = k.slice(-10);
      if (!dates.has(date)) return;
      const rec = gls(k) || {};
      for (let s = 0; s < 8; s++)
        vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
    });
    return { days, vol };
  };

  const cur = calcPeriod(last7);
  const prev = calcPeriod(prev7);
  if (!cur.days && !cur.vol) {
    el.innerHTML = '<div class="report-empty">최근 7일 완료 기록 없음.</div>';
    return;
  }

  const volDiff = prev.vol > 0 ? Math.round(((cur.vol - prev.vol) / prev.vol) * 100) : null;
  const dayDiff = cur.days - prev.days;
  const muscles = getMonthMuscleVolume(getMonthKey());
  const coach = getMuscleCoachText(muscles);
  const status = cur.days >= 3 ? '빈도 좋음' : cur.days >= 2 ? '유지 가능' : '빈도 부족';
  const trendText = volDiff === null
    ? '비교 데이터 부족'
    : `${volDiff >= 0 ? '▲' : '▼'} ${Math.abs(volDiff)}%`;

  el.innerHTML = `
    <div class="report-head">
      <div><div class="report-kicker">최근 7일</div><div class="report-title">${status}</div></div>
      <div class="report-badge">${trendText}</div>
    </div>
    <div class="report-metrics">
      <div class="report-metric"><strong>${cur.days}회</strong><span>운동일</span><small>${dayDiff === 0 ? '지난주와 동일' : `${dayDiff > 0 ? '+' : ''}${dayDiff}회`}</small></div>
      <div class="report-metric"><strong>${formatKg(Math.round(cur.vol))}</strong><span>총 볼륨</span><small>지난주 ${formatKg(Math.round(prev.vol))}</small></div>
      <div class="report-metric"><strong>${cur.days ? formatKg(Math.round(cur.vol / cur.days)) : '0kg'}</strong><span>회당 볼륨</span><small>강도 참고값</small></div>
    </div>
    <div class="report-coach"><b>🤖 코치 판단</b><span>${coach}</span></div>`;
}
function buildMuscleGrid() {
  const grid = document.getElementById('muscleGrid');
  if (!grid) return;
  const current = getMonthMuscleVolume(getMonthKey());
  const previous = getMonthMuscleVolume(getMonthKey(-1));
  const max = Math.max(1, ...Object.values(current));
  const total = Math.max(1, sumValues(current));
  const arr = Object.entries(current).sort((a, b) => b[1] - a[1]);

  grid.innerHTML = arr.length
    ? arr
        .map(([name, vol]) => {
          const prev = previous[name] || 0;
          const diff = prev > 0 ? Math.round(((vol - prev) / prev) * 100) : null;
          const share = Math.round((vol / total) * 100);
          const delta = diff === null
            ? '<span class="muscle-delta neutral">신규</span>'
            : `<span class="muscle-delta ${diff >= 0 ? 'up' : 'down'}">${diff >= 0 ? '▲' : '▼'} ${Math.abs(diff)}%</span>`;
          return `<div class="muscle-card">
            <div class="muscle-card-top"><div class="muscle-name">${name}</div>${delta}</div>
            <div class="muscle-vol">${formatKg(Math.round(vol))}</div>
            <div class="muscle-meta"><span>구성비 ${share}%</span><span>지난달 ${prev ? formatKg(Math.round(prev)) : '—'}</span></div>
            <div class="muscle-bar"><div class="muscle-fill" style="width:${Math.round((vol / max) * 100)}%"></div></div>
          </div>`;
        })
        .join('')
    : '<div class="coach-card muscle-empty"><div class="coach-text">이번달 볼륨 기록 없음.</div></div>';
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
    const cls = [
      'cd',
      d === todayD ? 'today' : '',
      worked.has(d) ? 'has' : '',
    ]
      .filter(Boolean)
      .join(' ');
    html += `<div class="${cls}">${d}</div>`;
  }
  html += '</div>';
  document.getElementById('calBox').innerHTML = html;
}
function buildPRBoard() {
  const prs = [];
  Object.keys(ROUTINES).forEach((rk) =>
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
  Object.keys(ROUTINES).forEach((rk) =>
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
        `<div class="cchip${n === selectedChartEx ? ' act' : ''}" data-name="${escapeHtml(n)}" role="button" tabindex="0" aria-pressed="${n === selectedChartEx}">${escapeHtml(n)}</div>`,
    )
    .join('');
}
/* 종목명에 따옴표가 섞여도 인라인 onclick 문자열이 깨지지 않도록 data-name + 위임 클릭으로 처리 */
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.cchip');
  if (chip) selectChart(chip.dataset.name);
});
function selectChart(exName) {
  selectedChartEx = exName;
  document
    .querySelectorAll('.cchip')
    .forEach((c) => c.classList.toggle('act', c.textContent === exName));
  const data = [];
  Object.keys(ROUTINES).forEach((rk) =>
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
    Object.keys(ROUTINES).forEach((rk) =>
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
  const rd = getReadiness();
  return `💪 ${r.label} 완료\n날짜: ${today}\n총 볼륨: ${vol}kg\n총 세트: ${totalSets}세트\n컨디션: 수면 ${rd.sleep}/5 · 피로 ${rd.fatigue}/5 · 통증 ${rd.pain}/5 (회복 ${readinessScore()}점)\n\n${logs || '기록 없음'}\n\n(GPT 분석 요청: 위 기록 기준으로 다음 세션 중량·볼륨·회복을 판단해 주세요.)`;
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
  else lines.push('오늘 루틴 완료. 같은 부위 피로·통증이 남으면 상태에 따라 48시간 회복을 권장.');
  return lines.join('\n');
}
function getAiFeedback() {
  const el = document.getElementById('aiResult');
  if (!el) return;
  el.className = 'ai-result visible';
  el.textContent = localGymFeedback();
}
function switchTabById(id) {
  const tabs = ['gym', 'history', 'daily', 'settings'];
  document
    .querySelectorAll('.tab-panel')
    .forEach((p) => p.classList.toggle('active', p.id === 'tab-' + id));
  document.querySelectorAll('.bnav-btn').forEach((b, i) => {
    const active = tabs[i] === id;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  updateTodaySummary();
  updateCoachNudge();
  if (id === 'history') { buildHistory(); renderWeeklySummary(); }
  if (id === 'daily') renderDailyTab();
  sls('activeTab', id);
}
function switchTab(id) {
  switchTabById(id);
}
/* ═══ BACKUP / RESTORE ═══ */
function exportBackup() {
  const data = {};
  Object.keys(_cache).forEach((k) => {
    data[k] = _cache[k];
  });
  const payload = {
    app: 'my-routine',
    schemaVersion: STORAGE_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `routine-backup-${todayStr()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  sls('lastBackup', todayStr());
  updateBackupNote();
  showToast('📤 백업 파일 저장됨');
}
async function backupBeforeImport() {
  const key = `importBackup:${new Date().toISOString().replace(/[:.]/g, '-')}`;
  await persistSet(key, {
    createdAt: new Date().toISOString(),
    sourceSchemaVersion: gls('storageSchemaVersion') ?? null,
    data: storageSnapshot(),
  });
  return key;
}
async function prepareImportedData(payload) {
  return StorageMigration.convertBackupPayload(payload);
}
function importBackup(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const data = payload?.data;
      if (payload?.app !== 'my-routine' || !data || typeof data !== 'object')
        throw new Error('bad format');
      const n = Object.keys(data).length;
      if (
        !confirm(
          `${(payload.exportedAt || '?').slice(0, 10)} 백업 (${n}개 항목)을 복원할까?\n같은 키는 백업 내용으로 덮어쓴다.`,
        )
      )
        return;
      (async () => {
        try {
          const prepared = await prepareImportedData(payload);
          await backupBeforeImport();
          const current = storageSnapshot();
          Object.keys(prepared).filter((k) => StorageMigration.isProtectedBackupKey(k) && Object.prototype.hasOwnProperty.call(current, k)).forEach((k) => delete prepared[k]);
          const collisions = Object.keys(prepared).filter(
            (k) =>
              Object.prototype.hasOwnProperty.call(current, k) &&
              JSON.stringify(current[k]) !== JSON.stringify(prepared[k]),
          );
          const identityCollisions = collisions.filter(
            StorageMigration.isIdentityDataKey,
          );
          const settingCollisions = collisions.filter(
            (k) => !StorageMigration.isIdentityDataKey(k),
          );
          if (identityCollisions.length) {
            const conflict = {
              status: 'import-conflict',
              detectedAt: new Date().toISOString(),
              keys: identityCollisions,
              nonBlockingSettingCollisions: settingCollisions,
              importedSchemaVersion: payload.schemaVersion,
            };
            await persistSet(MIGRATION_CONFLICT_V10, conflict);
            console.warn(
              '[backup import] merge stopped because keys conflict',
              conflict,
            );
            showToast('⚠️ 같은 키 충돌 — 현재 데이터 유지');
            return;
          }
          if (settingCollisions.length)
            console.info(
              '[backup import] replacing non-record settings',
              settingCollisions,
            );
          const afterImport = { ...current, ...prepared };
          await StorageMigration.commitSnapshot(
            { set: persistSet, delete: persistDelete },
            current,
            afterImport,
            ['storageSchemaVersion'],
          );
          showToast('📥 복원 완료 — 새로고침');
          setTimeout(() => location.reload(), 800);
        } catch (error) {
          console.error('[backup import] failed', error);
          showToast('⚠️ 지원하지 않거나 충돌한 백업');
        }
      })();
    } catch (error) {
      console.error('[backup import] invalid file', error);
      showToast('⚠️ 백업 파일을 읽을 수 없음');
    }
  };
  reader.readAsText(file);
  input.value = '';
}
/* ═══ AUTO BACKUP (rolling local snapshots, no user action needed) ═══ */
const AUTO_BACKUP_SLOTS = 5;
function autoBackupSnapshotData() {
  const data = storageSnapshot();
  Object.keys(data).forEach((k) => {
    if (StorageMigration.isProtectedBackupKey(k)) delete data[k];
  });
  return data;
}
async function runAutoBackupIfNeeded() {
  if (gls('lastAutoBackup') === todayStr()) return;
  const slot = (Number(gls('autoBackupSlot')) || 0) % AUTO_BACKUP_SLOTS;
  try {
    await persistSet('autoBackup:' + slot, {
      createdAt: new Date().toISOString(),
      data: autoBackupSnapshotData(),
    });
    await persistSet('lastAutoBackup', todayStr());
    await persistSet('autoBackupSlot', (slot + 1) % AUTO_BACKUP_SLOTS);
  } catch (error) {
    console.error('[auto backup] failed', error);
  }
}
function listAutoBackups() {
  const items = [];
  for (let i = 0; i < AUTO_BACKUP_SLOTS; i++) {
    const b = gls('autoBackup:' + i);
    if (b?.createdAt) items.push({ slot: i, createdAt: b.createdAt, count: Object.keys(b.data || {}).length });
  }
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
function renderAutoBackupList() {
  const el = document.getElementById('autoBackupBox');
  if (!el) return;
  const items = listAutoBackups();
  if (!items.length) {
    el.innerHTML = '<div class="pc-empty">아직 자동 백업 없음 · 오늘 앱을 쓰면 자동으로 1개 생성됨</div>';
    return;
  }
  el.innerHTML = items
    .map((it) => {
      const d = new Date(it.createdAt);
      const label = `${fmtDate(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      return `<div class="autobk-row"><div><div class="autobk-date">${label}</div><div class="autobk-count">${it.count}개 항목</div></div><button class="quick-btn" type="button" onclick="restoreAutoBackup(${it.slot})">복원</button></div>`;
    })
    .join('');
}
async function restoreAutoBackup(slot) {
  const backup = gls('autoBackup:' + slot);
  if (!backup) return;
  const d = new Date(backup.createdAt);
  const label = `${fmtDate(d)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  if (!confirm(`${label} 자동 백업으로 복원할까?\n현재 데이터 위에 덮어쓴다. (복원 직전 상태는 안전 백업으로 남는다)`))
    return;
  try {
    await backupBeforeImport();
    const current = storageSnapshot();
    const restored = { ...backup.data };
    Object.keys(restored).forEach((k) => {
      if (StorageMigration.isProtectedBackupKey(k)) delete restored[k];
    });
    const afterImport = { ...current, ...restored };
    await StorageMigration.commitSnapshot(
      { set: persistSet, delete: persistDelete },
      current,
      afterImport,
      ['storageSchemaVersion'],
    );
    showToast('♻️ 자동 백업 복원 완료 — 새로고침');
    setTimeout(() => location.reload(), 800);
  } catch (error) {
    console.error('[auto backup restore] failed', error);
    showToast('⚠️ 복원 실패');
  }
}
function daysSinceBackup() {
  const d = gls('lastBackup');
  if (!d) return null;
  return Math.floor((new Date(todayStr()) - new Date(d)) / 86400000);
}
function updateBackupNote() {
  const el = document.getElementById('backupNote');
  if (!el) return;
  const bd = daysSinceBackup();
  el.textContent =
    bd === null
      ? '마지막 백업: 없음 — 브라우저 데이터 삭제 시 기록 전체가 사라진다. 지금 백업해라.'
      : bd === 0
        ? '마지막 백업: 오늘 ✅'
        : `마지막 백업: ${bd}일 전${bd >= 14 ? ' — 백업 권장 ⚠️' : ''}`;
}

/* ═══ ACCESSIBILITY: keyboard support for role="button" divs ═══ */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest('[role="button"]');
  if (!el || el.tagName === 'BUTTON') return;
  e.preventDefault();
  el.click();
});

let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ═══ 데일리 탭: 주간 스케줄 / 하체 재도입 트래커 / 칼로리표 / 매일 기록 ═══ */
const WEEKLY_SCHEDULE_BASE = {
  mon: { key: 'mon', dayLabel: '월', label: '헬스A + 홈코어', workoutType: 'gym', rk: 'A' },
  tue: { key: 'tue', dayLabel: '화', label: '홈코어', workoutType: 'rest', rk: null },
  wed: { key: 'wed', dayLabel: '수', label: '헬스B', workoutType: 'gym', rk: 'B' },
  thu: { key: 'thu', dayLabel: '목', label: '홈코어 또는 휴식', workoutType: 'rest', rk: null },
  fri: { key: 'fri', dayLabel: '금', label: '휴식', workoutType: 'rest', rk: null },
  sat: { key: 'sat', dayLabel: '토', label: '수영 45~60분', workoutType: 'swim1', rk: null },
  sun: { key: 'sun', dayLabel: '일', label: '수영 60~90분', workoutType: 'swim2', rk: null },
};
const CALORIE_TABLE = {
  gym: { label: '헬스일', kcal: '2,250~2,300', proteinG: '130~140g', fatG: '55~70g' },
  swim1: { label: '수영1회', kcal: '2,200~2,300', proteinG: '130~140g', fatG: '55~70g' },
  swim2: { label: '수영2회', kcal: '2,300~2,450', proteinG: '130~140g', fatG: '60~70g' },
  rest: { label: '휴식일', kcal: '2,050~2,150', proteinG: '130~140g', fatG: '55~65g' },
};
const LOWER_BODY_STAGES = [
  { stage: 1, name: '맨몸 스쿼트', setsReps: '2×12~15', rir: '4~5', startLoad: '체중' },
  { stage: 2, name: '맨몸 스쿼트', setsReps: '3×15', rir: '3~4', startLoad: '체중' },
  { stage: 3, name: '레그프레스 (가벼운 부하)', setsReps: '3×12', rir: '3~4', startLoad: '스택 최소중량의 30~40%' },
  { stage: 4, name: '레그프레스 (점진증량)', setsReps: '3×10~12', rir: '2~3', startLoad: '3단계 마지막 중량' },
  { stage: 5, name: '런지 / 스플릿스쿼트', setsReps: '각다리 2~3×10', rir: '3~4', startLoad: '맨몸' },
];
const LOWER_BODY_ADVANCE_STREAK = 2;

function getDailyLog(date) {
  return (gls('dailyLog') || {})[date] || {};
}
function saveDailyLogEntry(date, patch) {
  const all = gls('dailyLog') || {};
  all[date] = { ...(all[date] || {}), ...patch };
  sls('dailyLog', all);
}
function getSwimLog(date) {
  return (gls('swimLogs') || {})[date] || {};
}
function saveSwimLogEntry(date, patch) {
  const all = gls('swimLogs') || {};
  all[date] = { ...(all[date] || {}), ...patch };
  sls('swimLogs', all);
}
function getLowerBodyProgress() {
  return (
    gls('lowerBodyProgress') || {
      stage: 1,
      sessions: [],
      stageLog: [{ stage: 1, at: new Date().toISOString(), reason: 'init' }],
    }
  );
}
function saveLowerBodyProgress(p) {
  sls('lowerBodyProgress', p);
}
function getWeeklyRecovery() {
  return gls('weeklyRecovery') || {};
}
function saveWeeklyRecoveryEntry(weekKey, patch) {
  const all = gls('weeklyRecovery') || {};
  all[weekKey] = { ...(all[weekKey] || {}), ...patch };
  sls('weeklyRecovery', all);
}

function getEffectiveWeeklySchedule() {
  const wk = Progression.isoWeekKey(todayStr());
  const rec = getWeeklyRecovery()[wk];
  if (!rec || !rec.shifted) return { schedule: WEEKLY_SCHEDULE_BASE, droppedDay: null, shifted: false };
  const { schedule: rawShifted, droppedDay } = Progression.shiftScheduleForRecovery(WEEKLY_SCHEDULE_BASE, {
    ...WEEKLY_SCHEDULE_BASE.mon,
    label: '홈코어 (헬스A는 화요일로 이동)',
    workoutType: 'rest',
    rk: null,
  });
  const schedule = {};
  Progression.WEEK_ORDER.forEach((k) => {
    schedule[k] = { ...rawShifted[k], key: k, dayLabel: WEEKLY_SCHEDULE_BASE[k].dayLabel };
  });
  return { schedule, droppedDay, shifted: true };
}
function shouldPromptMondayRecovery() {
  if (new Date().getDay() !== 1) return false;
  const wk = Progression.isoWeekKey(todayStr());
  const rec = getWeeklyRecovery()[wk];
  return !rec || !rec.answeredAt;
}
function renderMondayRecoveryCard() {
  const el = document.getElementById('mondayRecoveryBox');
  if (!el) return;
  if (!shouldPromptMondayRecovery()) {
    el.innerHTML = '';
    return;
  }
  el.innerHTML = `
<div class="coach-card warn">
  <div class="coach-title">🧭 월요일 회복 체크</div>
  <div class="coach-text">아래 중 하나라도 해당하면 오늘은 홈코어로, 헬스A는 화요일로 이동해요.</div>
  <div class="mrc-check-row"><label><input type="checkbox" id="mrcLat"> 광배·후면삼각근·회전근개 피로</label></div>
  <div class="mrc-check-row"><label><input type="checkbox" id="mrcFatigue"> 전신 피로도</label></div>
  <div class="mrc-check-row"><label><input type="checkbox" id="mrcRom"> 어깨 가동범위 제한</label></div>
  <button type="button" class="quick-btn primary" onclick="submitMondayRecovery()">확인 완료</button>
</div>`;
}
function submitMondayRecovery() {
  const flags = {
    lat: !!document.getElementById('mrcLat')?.checked,
    fatigue: !!document.getElementById('mrcFatigue')?.checked,
    shoulderRom: !!document.getElementById('mrcRom')?.checked,
  };
  const shifted = Object.values(flags).some(Boolean);
  const wk = Progression.isoWeekKey(todayStr());
  saveWeeklyRecoveryEntry(wk, { flags, shifted, answeredAt: new Date().toISOString() });
  showToast(shifted ? '🔁 오늘은 홈코어로, 헬스A는 화요일로 이동했어' : '✅ 오늘 컨디션 좋음 — 원래 스케줄대로');
  renderDailyTab();
}
function renderWeeklySchedule() {
  const el = document.getElementById('weeklyScheduleBox');
  if (!el) return;
  const { schedule, droppedDay, shifted } = getEffectiveWeeklySchedule();
  const jsMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIdx = jsMap[new Date().getDay()];
  const order = Progression.WEEK_ORDER;
  const note = shifted
    ? `<div class="ws-note">⚠️ 이번 주는 회복 신호로 스케줄이 하루씩 밀렸어${droppedDay ? ` · ${escapeHtml(droppedDay.label)}은 이번 주 생략` : ''}</div>`
    : '';
  el.innerHTML =
    note +
    order
      .map((k, i) => {
        const day = schedule[k];
        return `<div class="ws-row${i === todayIdx ? ' today' : ''}"><span class="ws-day">${day.dayLabel}</span><span class="ws-label">${escapeHtml(day.label)}</span></div>`;
      })
      .join('');
}
let selectedWorkoutType = null;
function getTodayWorkoutType() {
  if (selectedWorkoutType) return selectedWorkoutType;
  const { schedule } = getEffectiveWeeklySchedule();
  const order = Progression.WEEK_ORDER;
  const jsMap = [6, 0, 1, 2, 3, 4, 5];
  const todayIdx = jsMap[new Date().getDay()];
  return schedule[order[todayIdx]]?.workoutType || 'rest';
}
function selectWorkoutType(type) {
  selectedWorkoutType = type;
  renderCalorieTable();
  renderDailyLogForm();
}
function renderCalorieTable() {
  const el = document.getElementById('calorieTableBox');
  if (!el) return;
  const active = getTodayWorkoutType();
  const chips = Object.keys(CALORIE_TABLE)
    .map(
      (k) =>
        `<button type="button" class="routine-chip${k === active ? ' active' : ''}" onclick="selectWorkoutType('${k}')">${CALORIE_TABLE[k].label}</button>`,
    )
    .join('');
  const row = CALORIE_TABLE[active];
  el.innerHTML = `<div class="cal-type-row">${chips}</div><div class="cal-target-card"><div class="cal-target-kcal">${row.kcal} kcal</div><div class="cal-target-macros"><span>단백질 ${row.proteinG}</span><span>지방 ${row.fatG}</span></div></div>`;
}
function saveDailyLogField(field, value) {
  saveDailyLogEntry(todayStr(), { [field]: value === '' ? undefined : parseFloat(value) });
  renderWeeklySummary();
}
function saveSwimLogField(field, value) {
  saveSwimLogEntry(todayStr(), { [field]: value === '' ? undefined : parseFloat(value) });
  renderWeeklySummary();
}
function renderDailyLogForm() {
  const el = document.getElementById('dailyLogBox');
  if (!el) return;
  const today = todayStr();
  const log = getDailyLog(today);
  const type = getTodayWorkoutType();
  const isSwimDay = type === 'swim1' || type === 'swim2';
  const swim = getSwimLog(today);
  el.innerHTML = `
<div class="dl-grid">
  <label>공복체중(kg)<input type="number" inputmode="decimal" value="${log.bodyweightKg ?? ''}" onchange="saveDailyLogField('bodyweightKg', this.value)"></label>
  <label>총 kcal<input type="number" inputmode="decimal" value="${log.kcal ?? ''}" onchange="saveDailyLogField('kcal', this.value)"></label>
  <label>단백질(g)<input type="number" inputmode="decimal" value="${log.proteinG ?? ''}" onchange="saveDailyLogField('proteinG', this.value)"></label>
  <label>나트륨(mg)<input type="number" inputmode="decimal" value="${log.sodiumMg ?? ''}" onchange="saveDailyLogField('sodiumMg', this.value)"></label>
</div>
${
  isSwimDay
    ? `<div class="dl-grid">
  <label>SWOLF 평균<input type="number" inputmode="decimal" value="${swim.avgSwolf ?? ''}" onchange="saveSwimLogField('avgSwolf', this.value)"></label>
  <label>스트로크 수<input type="number" inputmode="decimal" value="${swim.strokeCount ?? ''}" onchange="saveSwimLogField('strokeCount', this.value)"></label>
  <label>주관적 피로도(1~5)<input type="number" inputmode="numeric" min="1" max="5" value="${swim.rpe ?? ''}" onchange="saveSwimLogField('rpe', this.value)"></label>
</div>`
    : ''
}`;
}
function renderLowerBodySessionHistory(sessions) {
  if (!sessions.length) return '<div class="pc-empty">기록 없음</div>';
  return sessions
    .slice(-10)
    .reverse()
    .map((s) => {
      const passed = Progression.isSessionPassed(s.checks);
      return `<div class="lb-hist-row${passed ? ' pass' : ' fail'}">${s.date} · STAGE ${s.stage} · ${passed ? '✅ 통과' : '⚠️ 미통과'}</div>`;
    })
    .join('');
}
function renderLowerBodyTracker() {
  const el = document.getElementById('lowerBodyBox');
  if (!el) return;
  const progress = getLowerBodyProgress();
  const stageInfo = LOWER_BODY_STAGES[progress.stage - 1];
  const streak = Progression.consecutivePassedAtStage(progress.sessions, progress.stage);
  const canAdvance = Progression.canAdvanceStage(progress.sessions, progress.stage, LOWER_BODY_ADVANCE_STREAK);
  el.innerHTML = `
<div class="lb-stage-card">
  <div class="lb-stage-num">STAGE ${progress.stage} / 5</div>
  <div class="lb-stage-name">${escapeHtml(stageInfo.name)}</div>
  <div class="lb-stage-meta"><span>${stageInfo.setsReps}</span><span>RIR ${stageInfo.rir}</span><span>${escapeHtml(stageInfo.startLoad)}</span></div>
  <div class="lb-streak">연속 통과 세션: <strong>${streak}</strong>회 (${LOWER_BODY_ADVANCE_STREAK}회 이상이면 다음 단계 가능)</div>
</div>
<div class="lb-session-form">
  <div class="lb-check-row"><label><input type="checkbox" id="lbPainOk"> 운동 중 통증 0~2/10</label></div>
  <div class="lb-check-row"><label><input type="checkbox" id="lbNoIncrease"> 세트 진행해도 통증 증가 없음</label></div>
  <div class="lb-check-row"><label><input type="checkbox" id="lbNoFlare"> 다음날 기존 증상 악화 없음(직전 세션 기준)</label></div>
  <div class="lb-check-row"><label><input type="checkbox" id="lbSymmetryOk"> 좌우 대칭 무너짐 없음</label></div>
  <button type="button" class="quick-btn primary" onclick="logLowerBodySession()">오늘 세션 기록</button>
</div>
<div class="lb-actions">
  <button type="button" class="quick-btn"${canAdvance ? '' : ' disabled'} onclick="advanceLowerBodyStage()">다음 단계로${canAdvance ? '' : ` (${streak}/${LOWER_BODY_ADVANCE_STREAK})`}</button>
  <button type="button" class="quick-btn danger" onclick="regressLowerBodyStage()">퇴행 — 이전 단계로</button>
</div>
<div class="lb-regress-hint">⚠️ 통증 3/10 이상 또는 저림·방사통 발생 시 즉시 이전 단계로</div>
<div class="lb-history">${renderLowerBodySessionHistory(progress.sessions)}</div>`;
}
function logLowerBodySession() {
  const progress = getLowerBodyProgress();
  const checks = {
    painOk: !!document.getElementById('lbPainOk')?.checked,
    noIncrease: !!document.getElementById('lbNoIncrease')?.checked,
    noNextDayFlare: !!document.getElementById('lbNoFlare')?.checked,
    symmetryOk: !!document.getElementById('lbSymmetryOk')?.checked,
  };
  progress.sessions = progress.sessions || [];
  progress.sessions.push({ date: todayStr(), stage: progress.stage, checks, loggedAt: new Date().toISOString() });
  saveLowerBodyProgress(progress);
  showToast(Progression.isSessionPassed(checks) ? '✅ 오늘 세션 기록됨 — 조건 통과' : '기록됨 — 일부 조건 미충족');
  renderLowerBodyTracker();
}
function advanceLowerBodyStage() {
  const progress = getLowerBodyProgress();
  if (!Progression.canAdvanceStage(progress.sessions, progress.stage, LOWER_BODY_ADVANCE_STREAK)) return;
  const next = Progression.nextStage(progress.stage);
  progress.stageLog = progress.stageLog || [];
  progress.stageLog.push({ stage: next, at: new Date().toISOString(), reason: 'advance' });
  progress.stage = next;
  saveLowerBodyProgress(progress);
  showToast(`🎉 STAGE ${next}로 진행`);
  renderLowerBodyTracker();
}
function regressLowerBodyStage() {
  const progress = getLowerBodyProgress();
  if (progress.stage <= 1) {
    showToast('이미 1단계야');
    return;
  }
  const prev = Progression.prevStage(progress.stage);
  progress.stageLog = progress.stageLog || [];
  progress.stageLog.push({ stage: prev, at: new Date().toISOString(), reason: 'regress' });
  progress.stage = prev;
  saveLowerBodyProgress(progress);
  showToast(`⚠️ STAGE ${prev}로 되돌림`);
  renderLowerBodyTracker();
}
function renderDailyTab() {
  renderMondayRecoveryCard();
  renderWeeklySchedule();
  renderCalorieTable();
  renderDailyLogForm();
  renderLowerBodyTracker();
}
function seriesFromLog(storeKey, field) {
  const all = gls(storeKey) || {};
  return Object.keys(all)
    .map((date) => ({ date, value: all[date]?.[field] }))
    .filter((e) => e.value !== undefined && e.value !== null && !Number.isNaN(Number(e.value)));
}
function renderWeeklySummary() {
  const el = document.getElementById('weeklySummaryBox');
  if (!el) return;
  const today = todayStr();
  const wDelta = Progression.weeklyAverageDelta(seriesFromLog('dailyLog', 'bodyweightKg'), today);
  const sDelta = Progression.weeklyAverageDelta(seriesFromLog('dailyLog', 'sodiumMg'), today);
  const swDelta = Progression.weeklyAverageDelta(seriesFromLog('swimLogs', 'avgSwolf'), today);
  const progress = getLowerBodyProgress();
  const streak = Progression.consecutivePassedAtStage(progress.sessions, progress.stage);
  const fmt = (v, unit, digits) => (v === null ? '—' : `${v.toFixed(digits ?? 1)}${unit}`);
  const fmtDelta = (v, unit, digits) =>
    v === null ? '' : ` (${v > 0 ? '+' : ''}${v.toFixed(digits ?? 1)}${unit})`;
  el.innerHTML = `
<div class="ws-summary-row"><span class="ws-summary-lbl">7일 평균 체중</span><span class="ws-summary-val">${fmt(wDelta.thisAvg, 'kg')}${fmtDelta(wDelta.delta, 'kg')}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">이번주 평균 나트륨</span><span class="ws-summary-val">${fmt(sDelta.thisAvg, 'mg', 0)}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">하체 재도입 진행</span><span class="ws-summary-val">STAGE ${progress.stage} · 연속 ${streak}회 통과</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">SWOLF 평균</span><span class="ws-summary-val">${fmt(swDelta.thisAvg, '')}${fmtDelta(swDelta.delta, '')}</span></div>`;
}

initStorage().then(async () => {
  // An explicit schema version is authoritative. A legacy migrV10 flag is
  // unverified, but still blocks older remaps so indexes are never shifted
  // again before migrateV10 records the completed-unverified state.
  if (!gls('storageSchemaVersion') && !gls('migrV10')) migrateV9();
  try {
    await migrateV10();
    await migrateV11();
    await migrateV12();
    await migrateV13();
  } catch (error) {
    console.error('[storage migration] initialization failed', error);
  }
  applyRoutineOverrides();
  await runAutoBackupIfNeeded();
  initTheme();
  buildHeader();
  buildWeekStrip();
  buildSelector();
  renderReadiness();
  showRoutine({ 1: 'A', 3: 'B' }[new Date().getDay()] || 'A');
  updateCoachPanel();
  renderRestTimer();
  updateBackupNote();
  renderAutoBackupList();
  hydrateNotionWebhookSettings();
  flushNotionWebhookOutbox();
  const savedTab = gls('activeTab');
  if (['gym', 'history', 'daily', 'settings'].includes(savedTab)) switchTabById(savedTab);
  const sb = document.getElementById('soundBtn');
  if (sb) sb.textContent = soundOn() ? '🔔' : '🔕';
});

window.addEventListener('online', flushNotionWebhookOutbox);

/* ═══ PWA ═══ */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
