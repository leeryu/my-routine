/* ═══ DATA ═══
   종목 필드: increment(증량 단위 kg) · restSecs(기본 휴식) · compound(복합 종목 여부) · alts(기구 점유 시 대체 종목).
   대체 종목은 같은 칸의 세트·반복 처방을 그대로 쓰고, 기록은 자기 id로 따로 쌓는다. */
const ROUTINES = (() => {
  const META = {
    'chest-press': { increment: 2.5, restSecs: 150, compound: true, alts: [{ id: 'dumbbell-bench-press', name: '덤벨 벤치프레스', increment: 2 }] },
    'dumbbell-row': { increment: 2, restSecs: 120, compound: true, alts: [{ id: 'seated-cable-row', name: '시티드 케이블 로우', increment: 2.5 }] },
    'lat-pulldown': { increment: 2.5, restSecs: 150, compound: true, alts: [{ id: 'single-arm-cable-pulldown', name: '원암 케이블 풀다운', increment: 2.5 }] },
    'lateral-raise': { increment: 1, restSecs: 75, compound: false, alts: [{ id: 'cable-lateral-raise', name: '케이블 레터럴 레이즈', increment: 2.5 }] },
    'reverse-pec-deck': { increment: 2.5, restSecs: 75, compound: false, alts: [{ id: 'face-pull', name: '케이블 페이스풀', increment: 2.5 }] },
    'biceps-curl': { increment: 1, restSecs: 75, compound: false, alts: [{ id: 'cable-curl', name: '케이블 컬', increment: 2.5 }] },
    'triceps-pushdown': { increment: 2.5, restSecs: 75, compound: false, alts: [{ id: 'dumbbell-kickback', name: '덤벨 킥백', increment: 1 }] },
    'shoulder-press-supported': { increment: 2.5, restSecs: 150, compound: true, alts: [{ id: 'seated-dumbbell-shoulder-press', name: '덤벨 숄더프레스(등받이)', increment: 2 }] },
    'shoulder-press-legacy': { increment: 2.5, restSecs: 150, compound: true, alts: [] },
    'leg-extension': { increment: 2.5, restSecs: 75, compound: false, alts: [] },
  };
  const hypertrophyExercise = (id, name, target, sets, reps, repMin, repMax, directMuscle, defKg, weight, tip) => ({
    id, name, target, sets, reps, repMin, repMax, directMuscle, defKg, weight,
    con: '반동 없이 목표 근육으로 수축.', ecc: '가동범위 안에서 2~3초 제어.', tip, warn: null, ...META[id],
  });
  const legExtension = (target, defKg, tip) => ({
    id: 'leg-extension', name: '레그 익스텐션', target, sets: 3, reps: '통증 없는 범위', weight: '현재 재도입 단계', defKg,
    con: '무릎 90% 지점까지만.', ecc: '천천히 2~3초.', tip, warn: '⚠️ 날짜가 아닌 증상과 연속 안정 세션을 기준으로 진행.', ...META['leg-extension'],
  });
  return {
    A: {
      label: '헬스 A', day: '화요일', tag: '상체 근비대 메인 · 8종목', exercises: [
        hypertrophyExercise('chest-press', '체스트 프레스', '가슴 직접세트', 4, '6~10', 6, 10, '가슴', 40, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('dumbbell-row', '덤벨 로우', '등/광배 직접세트', 4, '8~12', 8, 12, '등/광배', 16, '현재 작업중량', '마지막 작업세트 RIR 1~2. 허리 회전을 줄인다.'),
        hypertrophyExercise('lat-pulldown', '랫풀다운', '등/광배 직접세트', 3, '8~12', 8, 12, '등/광배', 35, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('lateral-raise', '사이드 레터럴 레이즈', '측면삼각근 직접세트', 3, '12~20', 12, 20, '측면삼각근', 6, '현재 작업중량', '마지막 작업세트 RIR 1~2. 반동보다 긴장을 우선한다.'),
        hypertrophyExercise('reverse-pec-deck', '리버스 펙덱', '후면삼각근 직접세트', 3, '12~20', 12, 20, '후면삼각근', 40, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('biceps-curl', '이두 컬', '이두 직접세트', 2, '10~15', 10, 15, '이두', 0, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('triceps-pushdown', '삼두 푸쉬다운', '삼두 직접세트', 2, '10~15', 10, 15, '삼두', 0, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        legExtension('하체 재도입 · 증상 기반', 0, '통증 0~2/10, 세트 중 증가 없음, 다음날 악화 없음이 우선이다.'),
      ],
    },
    B: {
      label: '헬스 B', day: '목요일', tag: '수영 회복 고려 · 8종목', exercises: [
        hypertrophyExercise('chest-press', '체스트 프레스', '가슴 직접세트', 3, '8~12', 8, 12, '가슴', 40, '현재 작업중량', 'RIR 2~3. 실패세트와 추가 프레스는 피한다.'),
        hypertrophyExercise('lat-pulldown', '랫풀다운', '등/광배 직접세트', 2, '8~12', 8, 12, '등/광배', 40, '현재 작업중량', 'RIR 2~3. 계획 세트만 완료한다.'),
        hypertrophyExercise('dumbbell-row', '덤벨 로우', '등/광배 직접세트', 2, '8~12', 8, 12, '등/광배', 20, '현재 작업중량', 'RIR 2~3. A보다 반복 여유를 더 남긴다.'),
        hypertrophyExercise('shoulder-press-supported', '숄더 프레스(등받이 지지)', '어깨 직접세트', 2, '8~12', 8, 12, null, 20, '현재 작업중량', 'RIR 2~3. 허리 과신전을 피한다.'),
        hypertrophyExercise('lateral-raise', '사이드 레터럴 레이즈', '측면삼각근 직접세트', 4, '12~20', 12, 20, '측면삼각근', 6, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('reverse-pec-deck', '리버스 펙덱', '후면삼각근 직접세트', 2, '12~20', 12, 20, '후면삼각근', 40, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        hypertrophyExercise('biceps-curl', '이두 컬', '이두 직접세트', 2, '10~15', 10, 15, '이두', 0, '현재 작업중량', '마지막 작업세트 RIR 1~2.'),
        legExtension('하체 보조 · 증상 기반', 40, '기존 하체 재도입 정책을 유지한다.'),
      ],
    },
    C: {
      label: 'C루틴', day: '선택 루틴', tag: '기존 기록 보존 · 기본 일정 제외', exercises: [
        hypertrophyExercise('chest-press', '체스트 프레스', '가슴', 3, '10회', 8, 12, null, 0, '조절', '기존 C루틴 기록용.'),
        hypertrophyExercise('shoulder-press-legacy', '숄더 프레스', '어깨', 3, '10회', 8, 12, null, 0, '조절', '기존 C루틴 기록용.'),
        hypertrophyExercise('reverse-pec-deck', '리버스 펙덱', '후면어깨', 3, '12회', 12, 20, null, 0, '가볍게', '기존 C루틴 기록용.'),
        hypertrophyExercise('lateral-raise', '레터럴 레이즈', '측면어깨', 3, '12회', 12, 20, null, 0, '가볍게', '기존 C루틴 기록용.'),
        hypertrophyExercise('triceps-pushdown', '케이블 푸쉬다운', '삼두', 3, '12회', 10, 15, null, 0, '조절', '기존 C루틴 기록용.'),
      ],
    },
  };
})();
const CLINICAL_PROFILE = {
  assessedAt: '2026-07-27', source: '재활의학과 진료', status: 'active', updatedAt: '2026-07-31', version: 1,
  structuralAbnormality: '없음', spineAlignment: '정상', pelvisAlignment: '정상', hipAlignment: '정상',
  forwardHead: '경미', coreStability: '부족', anteriorPelvicTilt: '경미, 기능성', exerciseRestriction: '구조적 제한 없음',
  medicalRecommendation: { activity: '필라테스', frequency: '주 1회', durationWeeks: 8 },
  goals: ['갈비뼈-골반 중립 유지', '코어 안정성', '목 정렬 개선'],
  summary: '현재 검사상 뼈·관절의 구조적 이상이나 정렬 이상은 확인되지 않았습니다.\n거북목 경향과 코어 안정성 부족으로 인한 가벼운 골반 전방경사가 있습니다.\n목표는 골반을 억지로 말아 넣는 것이 아니라, 갈비뼈와 골반의 중립을 유지한 채 움직이는 능력을 높이는 것입니다.',
};
const WEEKLY_GOALS = { A: 1, B: 1 };

/* ═══ 주간 일정: 이 배열 하나가 스트립·데일리·칼로리·자동 루틴 선택·회복 체크의 유일한 출처 ═══
   kind: gym | swim | core | rest · kcal: CALORIE_TABLE 키 */
const WEEK_PLAN = [
  { key: 'mon', label: '월', type: '휴식/코어', rk: null, kind: 'core', plan: '홈코어 또는 휴식', kcal: 'rest' },
  { key: 'tue', label: '화', type: 'A', rk: 'A', kind: 'gym', plan: '헬스 A', kcal: 'gym' },
  { key: 'wed', label: '수', type: '코어/휴식', rk: null, kind: 'core', plan: '홈코어 또는 휴식', kcal: 'rest' },
  { key: 'thu', label: '목', type: 'B', rk: 'B', kind: 'gym', plan: '헬스 B', kcal: 'gym' },
  { key: 'fri', label: '금', type: '휴식', rk: null, kind: 'rest', plan: '휴식', kcal: 'rest' },
  { key: 'sat', label: '토', type: '메인수영', rk: null, kind: 'swim', plan: '메인 수영', kcal: 'swim2' },
  { key: 'sun', label: '일', type: '기술수영/휴식', rk: null, kind: 'swim', plan: '기술 수영 또는 휴식', kcal: 'swim1' },
];
const RECOVERY_DAY = { label: '화', type: '회복', rk: null, kind: 'rest', plan: '회복 (헬스 A는 다음 날로)', kcal: 'rest' };
const CALORIE_TABLE = {
  gym: { label: '헬스일', kcal: '2,250~2,300', proteinG: '130~140g', fatG: '55~70g' },
  swim1: { label: '기술수영일', kcal: '2,200~2,300', proteinG: '130~140g', fatG: '55~70g' },
  swim2: { label: '메인수영일', kcal: '2,300~2,450', proteinG: '130~140g', fatG: '60~70g' },
  rest: { label: '휴식일', kcal: '2,050~2,150', proteinG: '130~140g', fatG: '55~65g' },
};
const PROTEIN_TARGET_TEXT = CALORIE_TABLE.gym.proteinG;
const PROTEIN_TARGET_MIN = 130;
const WEEKLY_TARGETS = { gym: 2, swim: 1, core: 2 };
const DIRECT_SET_GOALS = { '가슴': 7, '등/광배': 11, '측면삼각근': 7, '후면삼각근': 5, '이두': 4, '삼두': 2 };
const DELOAD_AFTER_WEEKS = 6;

/* 홈코어 10분: 진료 목표(갈비뼈-골반 중립·코어 안정성)용 기본 루틴.
   사이드 플랭크는 과거 좌우 제한 이력이 있어 확인 전까지 넣지 않는다. */
const CORE_ROUTINE = [
  { id: 'breathing-9090', name: '90/90 호흡', dose: '5호흡 × 2', cue: '누워서 무릎·고관절 90도. 내쉴 때 갈비뼈를 내리고 허리-바닥 간격을 유지.' },
  { id: 'dead-bug', name: '데드버그', dose: '3 × 6~8/측', cue: '허리가 뜨지 않는 범위까지만 팔다리를 뻗는다. 내쉬며 천천히.' },
  { id: 'bird-dog', name: '버드독', dose: '3 × 6~8/측', cue: '골반이 돌아가지 않게. 뻗은 자세에서 2초 유지.' },
  { id: 'glute-bridge', name: '글루트 브릿지', dose: '3 × 10~12', cue: '갈비뼈를 내린 채 엉덩이로 들어 올린다. 허리를 꺾지 않는다.' },
  { id: 'pallof-press', name: '팔로프 프레스 (밴드 있으면)', dose: '2 × 10/측', cue: '몸통이 돌아가지 않게 버티며 밴드를 앞으로 민다.' },
];

let currentRoutine = null;
let dayMode = null; /* 'A' | 'B' | 'C' | 'X'(헬스 아닌 날 카드) */
let daySubMode = null; /* 'swim' | 'core' | 'rest' */

/* ═══ ROUTINE OVERRIDES (호환용) ═══
   weightOverrides:A/B — {idx: defKg} 형태로 저장된 첫 기록 기본 중량. v14에서 새 인덱스로 재배치됨.
   옛 루틴 편집기의 customExercises는 v14 인덱스 재배치 대상이 아니라 새 루틴에 엉뚱하게 덮어써지므로 적용하지 않는다. */
function applyRoutineOverrides() {
  ['A', 'B'].forEach((rk) => {
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
const MIGRATION_BACKUP_V14 = 'migrationBackup:v14';
const MIGRATION_STATUS_V14 = 'migrationStatus:v14';

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
  if ([11, 12, 13, 14].includes(Number(source.storageSchemaVersion))) return { status: 'already-migrated' };
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
  after.storageSchemaVersion = 11;
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
  after.storageSchemaVersion = 12;
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
  after.storageSchemaVersion = 13;
  after[MIGRATION_STATUS_V13] = { status: 'completed', completedAt: new Date().toISOString(), sourceSchemaVersion: 12, movedKeys: transformed.moves.map(({ from, to }) => ({ from, to })) };
  try {
    await StorageMigration.commitSnapshot({ set: persistSet, delete: persistDelete }, before, after, [MIGRATION_STATUS_V13, 'storageSchemaVersion']);
    return { status: 'completed' };
  } catch (error) {
    try { await persistSet(MIGRATION_STATUS_V13, { status: 'failed', failedAt: new Date().toISOString(), message: String(error.message || error) }); } catch {}
    throw error;
  }
}
async function migrateV14() {
  const before = storageSnapshot();
  if (Number(before.storageSchemaVersion) === 14) {
    if (!before[MIGRATION_STATUS_V14]) await persistSet(MIGRATION_STATUS_V14, { status: 'completed-unverified', detectedAt: new Date().toISOString(), sourceSchemaVersion: 14, movedKeys: [] });
    return { status: 'current' };
  }
  if (Number(before.storageSchemaVersion) !== 13) return { status: 'not-applicable' };
  const existingBackup = before[MIGRATION_BACKUP_V14];
  if (existingBackup && existingBackup.sourceSchemaVersion !== 13) {
    const conflict = { status: 'backup-conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 13 };
    await persistSet(MIGRATION_STATUS_V14, conflict);
    return conflict;
  }
  const backupOk = await createSafetyBackup(MIGRATION_BACKUP_V14, 13, before, Object.keys(before));
  if (!backupOk) {
    await persistSet(MIGRATION_STATUS_V14, { status: 'backup-failed', failedAt: new Date().toISOString() });
    return { status: 'backup-failed' };
  }
  const transformed = StorageMigration.transformV13ToV14(before);
  if (!transformed.ok) {
    const conflict = { status: 'conflict', detectedAt: new Date().toISOString(), sourceSchemaVersion: 13, conflicts: transformed.conflicts };
    await persistSet(MIGRATION_STATUS_V14, conflict);
    return conflict;
  }
  const after = transformed.result;
  after.storageSchemaVersion = 14;
  after[MIGRATION_STATUS_V14] = { status: 'completed', completedAt: new Date().toISOString(), sourceSchemaVersion: 13, movedKeys: transformed.moves.map(({ from, to }) => ({ from, to })) };
  await StorageMigration.commitSnapshot({ set: persistSet, delete: persistDelete }, before, after, [MIGRATION_STATUS_V14, 'storageSchemaVersion']);
  return { status: 'completed' };
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

/* ═══ 공통 유틸 ═══ */
/* 사용자가 직접 입력한 텍스트(메모 등)를 innerHTML에 꽂을 때 반드시 통과시킨다.
   HTML 콘텐츠·속성·인라인 onclick 문자열 인자 세 자리 모두에서 안전하도록 5종을 전부 이스케이프한다. */
function escapeHtml(str) {
  return String(str ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}
function roundTo(v, step) {
  const s = step > 0 ? step : 0.25;
  return Math.round(Math.round(v / s) * s * 100) / 100;
}
function formatKg(v) {
  return v >= 1000 ? (v / 1000).toFixed(1) + 't' : Math.round(v) + 'kg';
}
function formatRestTime(secs) {
  const safe = Math.max(0, Math.round(secs));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}
function shortDate(dateStr) {
  return `${Number(dateStr.slice(5, 7))}/${Number(dateStr.slice(8, 10))}`;
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return fmtDate(d);
}
function weekIndex(date) {
  return ([6, 0, 1, 2, 3, 4, 5])[(date || new Date()).getDay()];
}
/* 이번 주(월~일) 날짜 목록. offsetWeeks로 과거 주 */
function weekDates(offsetWeeks) {
  const today = todayStr();
  const monday = addDays(today, -weekIndex(new Date(today + 'T00:00:00')) - 7 * (offsetWeeks || 0));
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
function vibrate(pattern) {
  try { navigator.vibrate?.(pattern); } catch {}
}

/* ═══ 주간 일정 ═══ */
function weeklyRecoveryEntry() {
  const entry = (gls('weeklyRecovery') || {})[Progression.isoWeekKey(todayStr())];
  /* v2 이전(월요일 A 기준) 응답은 현재 일정과 의미가 달라 무시한다 */
  return entry && entry.fromKey ? entry : null;
}
function saveWeeklyRecoveryEntry(weekKey, patch) {
  const all = gls('weeklyRecovery') || {};
  all[weekKey] = { ...(all[weekKey] || {}), ...patch };
  sls('weeklyRecovery', all);
}
function recoveryCheckDayKey() {
  return WEEK_PLAN.find((d) => d.rk === 'A')?.key || 'tue';
}
function getEffectiveWeeklySchedule() {
  const base = {};
  WEEK_PLAN.forEach((d) => { base[d.key] = d; });
  const entry = weeklyRecoveryEntry();
  if (!entry || !entry.shifted) return { schedule: base, droppedDay: null, shifted: false };
  const fromKey = entry.fromKey;
  const recovery = { ...RECOVERY_DAY, label: base[fromKey].label };
  const { schedule: raw, droppedDay } = Progression.shiftScheduleForRecovery(base, fromKey, recovery);
  const schedule = {};
  Progression.WEEK_ORDER.forEach((k) => { schedule[k] = { ...raw[k], key: k, label: base[k].label }; });
  return { schedule, droppedDay, shifted: true };
}
function todayPlan() {
  return getEffectiveWeeklySchedule().schedule[Progression.WEEK_ORDER[weekIndex()]];
}
/* ═══ 활동 기록 판정 (주간 목표·스트립·캘린더 공용) ═══ */
/* 날짜별 활동 집합. 키 전체를 한 번만 훑어 주간 목표·스트립·캘린더에서 재사용한다 */
function activityIndex() {
  const gym = new Set();
  Object.keys(_cache).forEach((k) => {
    if (k.startsWith('done:') && gls(k)) gym.add(k.slice(5));
    else if (k.startsWith('rec:') && gls(k)?.allDone) gym.add(k.slice(-10));
  });
  const swim = new Set(Object.keys(gls('swimLogs') || {}).filter(swimDoneOn));
  const core = new Set(Object.keys(gls('coreLogs') || {}).filter(coreDoneOn));
  return { gym, swim, core };
}
function getSwimLog(date) {
  return (gls('swimLogs') || {})[date] || {};
}
function saveSwimLogEntry(date, patch) {
  const all = gls('swimLogs') || {};
  all[date] = { ...(all[date] || {}), ...patch };
  sls('swimLogs', all);
}
function swimDoneOn(date) {
  const log = getSwimLog(date);
  return !!(log.done || log.distanceM || log.minutes);
}
function getCoreLog(date) {
  return (gls('coreLogs') || {})[date] || {};
}
function saveCoreLogEntry(date, patch) {
  const all = gls('coreLogs') || {};
  all[date] = { ...(all[date] || {}), ...patch };
  sls('coreLogs', all);
}
function coreDoneOn(date) {
  return !!getCoreLog(date).done;
}
function weekActivityCounts(offsetWeeks, idx) {
  const index = idx || activityIndex();
  const dates = weekDates(offsetWeeks);
  return {
    gym: dates.filter((d) => index.gym.has(d)).length,
    swim: dates.filter((d) => index.swim.has(d)).length,
    core: dates.filter((d) => index.core.has(d)).length,
  };
}
function weekGoalMet(counts) {
  return counts.gym >= WEEKLY_TARGETS.gym && counts.swim >= WEEKLY_TARGETS.swim;
}
function weeklyGoalStreak(idx) {
  const index = idx || activityIndex();
  return Progression.goalStreak(Array.from({ length: 52 }, (_, i) => weekGoalMet(weekActivityCounts(i, index))));
}
function gymWeeksStreak(idx) {
  const index = idx || activityIndex();
  return Progression.goalStreak(Array.from({ length: 52 }, (_, i) => weekActivityCounts(i, index).gym >= WEEKLY_TARGETS.gym));
}

/* ═══ 종목·이력 ═══ */
function recEntries() {
  return Object.keys(_cache).filter((k) => k.startsWith('rec:')).map((key) => ({ key, rec: _cache[key] }));
}
function baseExercise(rk, idx) {
  return ROUTINES[rk].exercises[idx];
}
/* 오늘 기록에 대체 종목 id가 박혀 있으면 그 칸은 오늘 대체 종목이다 */
function effectiveExercise(rk, idx, date) {
  const base = baseExercise(rk, idx);
  const rec = getRecord(`${rk}_${idx}_${date || todayStr()}`);
  const alt = (base.alts || []).find((a) => a.id === rec.exerciseId);
  if (!alt) return { ...base, baseId: base.id, isVariant: false };
  return { ...base, id: alt.id, name: alt.name, increment: alt.increment ?? base.increment, defKg: alt.defKg ?? 0, target: `${base.target} · 대체`, baseId: base.id, baseName: base.name, isVariant: true };
}
function getIncrement(ex) {
  const saved = Number(gls('increment:' + ex.id));
  return saved > 0 ? saved : ex.increment || 2.5;
}
function routineHistory(rk, idx, ex, entries) {
  return Progression.selectHistory(entries || recEntries(), {
    routineKey: rk, exerciseId: ex.id, legacyIdx: ex.isVariant ? null : idx, excludeDate: todayStr(),
  });
}
function exerciseHistory(exerciseId, entries, excludeToday) {
  return Progression.selectHistory(entries || recEntries(), { exerciseId, scope: 'exercise', excludeDate: excludeToday ? todayStr() : undefined });
}
function recSetCount(rec) {
  let n = 0;
  for (let s = 0; s < 12; s++) if (rec?.['kg_' + s] || rec?.['reps_' + s]) n = s + 1;
  return n;
}
function recBrief(rec, setCount) {
  const count = Math.max(setCount || 0, recSetCount(rec));
  const values = Progression.setValues(rec, count);
  setCount = count;
  const kg = Progression.workingWeight(rec, setCount) || Progression.topWeight(rec, setCount);
  return `${kg ? kg + 'kg · ' : ''}${values.map((s) => s.reps || '—').join('/')}`;
}
function e1rm(kg, reps) {
  return kg && reps ? kg * (1 + reps / 30) : 0;
}

/* ═══ 컨디션 (수면·피로·통증 1~5). 세 개 모두 입력해야 점수가 생긴다 ═══ */
const READINESS_SCALES = [
  ['sleep', '수면', ['나쁨', '좋음']],
  ['fatigue', '피로', ['없음', '심함']],
  ['pain', '통증', ['없음', '심함']],
];
function getReadinessRaw() {
  return gls('readiness:' + todayStr()) || {};
}
function hasReadinessToday() {
  const r = getReadinessRaw();
  return READINESS_SCALES.every(([k]) => Number(r[k]) >= 1);
}
function getReadiness() {
  const r = getReadinessRaw();
  return { sleep: r.sleep ?? null, fatigue: r.fatigue ?? null, pain: r.pain ?? null };
}
function readinessScore() {
  if (!hasReadinessToday()) return null;
  const r = getReadinessRaw();
  return Math.round((r.sleep / 5) * 40 + ((6 - r.fatigue) / 5) * 30 + ((6 - r.pain) / 5) * 30);
}
let readinessEditing = false;
function setReadiness(kind, val) {
  const r = getReadinessRaw();
  r[kind] = val;
  sls('readiness:' + todayStr(), r);
  if (hasReadinessToday()) readinessEditing = false;
  renderReadiness();
  renderRoutine();
}
function editReadiness() {
  readinessEditing = true;
  renderReadiness();
}
function renderReadiness() {
  const el = document.getElementById('readinessBox');
  if (!el) return;
  if (!currentRoutine) { el.innerHTML = ''; return; }
  const r = getReadinessRaw();
  const score = readinessScore();
  if (score !== null && !readinessEditing) {
    const tone = score >= 75 ? 'good' : score >= 55 ? 'warn' : 'danger';
    const msg = score >= 75 ? '정상 볼륨' : score >= 55 ? '마지막 세트 1~2회 여유' : '증량 보류 · 실패세트 금지';
    el.innerHTML = `<button type="button" class="ready-line ${tone}" onclick="editReadiness()" aria-label="컨디션 수정"><span>컨디션 <b>${score}점</b> · ${msg}</span><span class="ready-edit">수면${r.sleep} 피로${r.fatigue} 통증${r.pain} ✎</span></button>`;
    return;
  }
  el.innerHTML = `<div class="ready-card"><div class="ready-title">오늘 컨디션 <span>시작 전 3탭 · 증량 판단에 반영</span></div>${READINESS_SCALES.map(([k, label, ends]) => `
<div class="ready-row"><span class="ready-lbl">${label}</span><div class="ready-scale" role="group" aria-label="${label}">${[1, 2, 3, 4, 5].map((v) => `<button type="button" class="${Number(r[k]) === v ? 'pick' : ''}" onclick="setReadiness('${k}',${v})" aria-pressed="${Number(r[k]) === v}" aria-label="${label} ${v}점">${v}</button>`).join('')}</div><span class="ready-ends">${ends[0]}→${ends[1]}</span></div>`).join('')}</div>`;
}

/* ═══ 코치 추천 (종목 카드 한 줄) ═══
   hist: 같은 루틴·같은 종목의 지난 세션(최신순). 오늘 종목을 끝냈으면 오늘 기록을 맨 앞에 넣어 "다음 세션" 추천을 만든다. */
function getSmartRec(rk, idx, ex, hist, entries, forNext) {
  const inc = getIncrement(ex);
  const prefix = forNext ? '다음 세션 → ' : '';
  const last = hist[0]?.rec;
  if (last && (last.pain === 'joint' || last.pain === 'nerve')) {
    const lastKg = Progression.topWeight(last, ex.sets);
    const kg = lastKg ? Math.max(0, roundTo(lastKg * 0.85, inc)) : 0;
    return { action: 'REDUCE', kg, msg: `${prefix}지난 기록에 ${last.pain === 'joint' ? '관절 시큰' : '저림/방사통'} → ${kg ? kg + 'kg(약 15%↓)로 ' : ''}통증 없는 범위만` };
  }
  if (!ex.repMax) {
    if (!last) return { action: 'START', kg: ex.defKg || 0, msg: '통증 없는 범위에서 가볍게 시작. 통증 오르면 즉시 중단' };
    const lastKg = Progression.topWeight(last, ex.sets);
    return { action: 'MAINTAIN', kg: lastKg, msg: `${prefix}${lastKg ? lastKg + 'kg ' : ''}유지 · 통증 0~2/10이 유지될 때만 진행` };
  }
  if (!last) {
    const other = exerciseHistory(ex.id, entries, true).find((h) => h.routineKey !== rk);
    const otherKg = other ? Progression.workingWeight(other.rec, ex.sets) || Progression.topWeight(other.rec, ex.sets) : 0;
    if (otherKg) return { action: 'START', kg: otherKg, reps: ex.repMin, msg: `이 루틴 첫 기록 · 최근 ${ROUTINES[other.routineKey].label} ${otherKg}kg 기준, ${ex.repMin}~${ex.repMax}회` };
    return { action: 'START', kg: ex.defKg || 0, reps: ex.repMin, msg: `첫 기록 · ${ex.repMin}~${ex.repMax}회, 마지막 세트 RIR까지 기록` };
  }
  const progress = Progression.evaluateDoubleProgression(ex, hist);
  const lastKg = Progression.workingWeight(last, ex.sets) || Progression.topWeight(last, ex.sets);
  if (progress.state === 'increase') {
    const score = readinessScore();
    if (!forNext && score !== null && score < 55)
      return { action: 'MAINTAIN', kg: lastKg, msg: `증량 조건 달성했지만 오늘 회복 ${score}점 → ${lastKg}kg 유지, 다음에 증량` };
    const next = Progression.nextWeight(lastKg, inc);
    return { action: 'INCREASE', kg: next, reps: ex.repMin, msg: `${prefix}${lastKg}kg 상한 달성${progress.reason === 'easy' ? '(RIR 3+)' : ' 2회'} → ${next}kg, ${ex.repMin}회부터` };
  }
  if (Progression.isPlateau(ex, hist))
    return { action: 'PLATEAU', kg: lastKg, msg: `${prefix}같은 중량·반복 3세션 정체 — 수면·단백질 먼저 점검, 그대로면 1세트 추가나 대체 종목` };
  if (progress.state === 'top-once') return { action: 'MAINTAIN', kg: lastKg, msg: `${prefix}${lastKg}kg 상한 1/2 — 한 번 더 전 세트 ${ex.repMax}회면 증량` };
  if (progress.state === 'adapting') return { action: 'MAINTAIN', kg: lastKg, msg: `${prefix}새 중량 ${lastKg}kg 적응 중 — 총 반복을 늘려가기` };
  return { action: 'MAINTAIN', kg: lastKg, msg: `${prefix}${lastKg}kg 유지 · 지난번 총 ${Progression.totalReps(last, ex.sets)}회 → +1회 이상 목표` };
}
const REC_ICONS = { INCREASE: '📈', REDUCE: '📉', MAINTAIN: '⚖️', PLATEAU: '📊', START: '🎯' };

/* ═══ 헤더 · 주간 스트립 ═══ */
function buildHeader() {
  const now = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  document.getElementById('todayLabel').textContent = `${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
  renderRoutineSeg();
  renderWeekChip();
}
function renderWeekChip() {
  const el = document.getElementById('weekChip');
  if (!el) return;
  const index = activityIndex();
  const c = weekActivityCounts(0, index);
  const streak = weeklyGoalStreak(index);
  el.textContent = `이번 주 헬스 ${c.gym}/${WEEKLY_TARGETS.gym} · 수영 ${c.swim}/${WEEKLY_TARGETS.swim}${streak ? ` · ${streak}주 연속` : ''}`;
}
function renderRoutineSeg() {
  const el = document.getElementById('routineSeg');
  if (!el) return;
  const opts = [['A', 'A'], ['B', 'B'], ['X', '그 외']];
  if (dayMode === 'C') opts.push(['C', 'C']);
  el.innerHTML = opts.map(([k, label]) => `<button type="button" class="${dayMode === k ? 'active' : ''}" onclick="setDayMode('${k}')" aria-pressed="${dayMode === k}">${label}</button>`).join('');
}
function buildWeekStrip() {
  const strip = document.getElementById('weekStrip');
  if (!strip) return;
  const { schedule } = getEffectiveWeeklySchedule();
  const todayIdx = weekIndex();
  const dates = weekDates(0);
  const index = activityIndex();
  strip.innerHTML = Progression.WEEK_ORDER.map((k, i) => {
    const d = schedule[k];
    const date = dates[i];
    const done = index.gym.has(date) || index.swim.has(date) || index.core.has(date);
    const cls = ['day-pill', i === todayIdx ? 'today' : '', done ? 'done' : '', d.rk ? 'clickable' : ''].filter(Boolean).join(' ');
    const click = d.rk ? ` onclick="switchTabById('gym');setDayMode('${d.rk}')" role="button" tabindex="0"` : '';
    return `<div class="${cls}"${click}><span class="dp-label">${d.label}</span><span class="dp-type">${escapeHtml(d.type)}</span>${done ? '<span class="dp-check">✓</span>' : ''}</div>`;
  }).join('');
}

/* ═══ 오늘 모드: 헬스 루틴 / 그 외(수영·홈코어·휴식) ═══ */
function resolveDayMode() {
  const today = todayStr();
  const saved = gls('dayMode');
  if (saved && saved.date === today && saved.mode) return saved;
  const withRecords = ['A', 'B', 'C'].find((rk) => ROUTINES[rk].exercises.some((_, i) => {
    const rec = getRecord(`${rk}_${i}_${today}`);
    return rec.summary || Object.keys(rec).some((k) => k.startsWith('checked_') && rec[k]);
  }));
  if (withRecords) return { mode: withRecords };
  const plan = todayPlan();
  if (plan.rk) return { mode: plan.rk };
  return { mode: 'X', sub: ['swim', 'core'].includes(plan.kind) ? plan.kind : 'rest' };
}
function setDayMode(mode, sub, persist = true) {
  dayMode = mode;
  if (mode === 'X') daySubMode = sub || daySubMode || (['swim', 'core'].includes(todayPlan().kind) ? todayPlan().kind : 'rest');
  currentRoutine = ['A', 'B', 'C'].includes(mode) ? mode : null;
  if (persist) sls('dayMode', { date: todayStr(), mode, sub: daySubMode });
  renderRoutineSeg();
  renderGymTab();
}

function renderGymTab() {
  renderDayCard();
  renderReadiness();
  renderRoutine();
  renderLowerBodyInline();
}

/* ── 헬스 아닌 날 카드 + A일 회복 체크 ── */
function shouldPromptRecoveryCheck() {
  if (dayMode !== 'A') return false;
  const plan = todayPlan();
  if (Progression.WEEK_ORDER[weekIndex()] !== recoveryCheckDayKey() || plan.rk !== 'A') return false;
  if (weeklyRecoveryEntry()?.answeredAt) return false;
  return !ROUTINES.A.exercises.some((_, i) => getRecord(`A_${i}_${todayStr()}`).summary);
}
function renderDayCard() {
  const el = document.getElementById('dayCard');
  if (!el) return;
  if (shouldPromptRecoveryCheck()) {
    el.innerHTML = `<div class="day-card warn"><div class="day-kicker">헬스 A 전 회복 체크</div><div class="day-title">주말 수영 피로가 남았는지 확인</div>
<label class="chk-row"><input type="checkbox" id="mrcLat"> 광배·후면삼각근·회전근개 피로</label>
<label class="chk-row"><input type="checkbox" id="mrcFatigue"> 전신 피로도 높음</label>
<label class="chk-row"><input type="checkbox" id="mrcRom"> 어깨 가동범위 제한</label>
<div class="day-hint">하나라도 해당하면 오늘은 회복, 헬스 A는 수요일·B는 금요일로 하루씩 밀려요.</div>
<button type="button" class="btn-primary" onclick="submitRecoveryCheck()">확인 완료</button></div>`;
    return;
  }
  if (dayMode !== 'X') { el.innerHTML = ''; return; }
  const plan = todayPlan();
  const sub = daySubMode;
  const tabs = [['swim', '🏊 수영'], ['core', '🧘 홈코어'], ['rest', '😴 휴식']]
    .map(([k, label]) => `<button type="button" class="${sub === k ? 'active' : ''}" onclick="setDayMode('X','${k}')">${label}</button>`).join('');
  const body = sub === 'swim' ? swimCardHtml(plan) : sub === 'core' ? coreCardHtml() : restCardHtml(plan);
  el.innerHTML = `<div class="day-card"><div class="day-kicker">오늘 계획 · ${escapeHtml(plan.plan)}</div><div class="day-tabs">${tabs}</div>${body}</div>`;
}
function restCardHtml(plan) {
  return `<div class="day-title">${plan.type === '회복' ? '오늘은 회복일' : '오늘은 쉬는 날'}</div>
<div class="day-hint">가벼운 걷기·스트레칭 정도면 충분해요. 단백질 ${PROTEIN_TARGET_TEXT}, 수면 7시간+.</div>
<div class="day-actions"><button type="button" class="btn-ghost" onclick="setDayMode('A')">그래도 헬스 A</button><button type="button" class="btn-ghost" onclick="setDayMode('B')">그래도 헬스 B</button></div>`;
}
function swimCardHtml(plan) {
  const log = getSwimLog(todayStr());
  const done = swimDoneOn(todayStr());
  const title = plan.kind === 'swim' ? plan.plan : '수영';
  const val = (v) => (v ?? '');
  return `<div class="day-title">${escapeHtml(title)}</div>
<button type="button" class="swim-done${done ? ' on' : ''}" onclick="toggleSwimDone()" aria-pressed="${done}">${done ? '✓ 수영 완료' : '수영 완료 체크'}</button>
<div class="dl-grid">
  <label>거리(m)<input type="number" inputmode="numeric" value="${val(log.distanceM)}" onchange="saveSwimLogField('distanceM', this.value)"></label>
  <label>시간(분)<input type="number" inputmode="numeric" value="${val(log.minutes)}" onchange="saveSwimLogField('minutes', this.value)"></label>
  <label>힘든 정도(1~5)<input type="number" inputmode="numeric" min="1" max="5" value="${val(log.rpe)}" onchange="saveSwimLogField('rpe', this.value)"></label>
</div>
<details class="mini-details"><summary>선택 입력 · SWOLF·스트로크</summary><div class="dl-grid">
  <label>SWOLF 평균<input type="number" inputmode="decimal" value="${val(log.avgSwolf)}" onchange="saveSwimLogField('avgSwolf', this.value)"></label>
  <label>스트로크 수<input type="number" inputmode="numeric" value="${val(log.strokeCount)}" onchange="saveSwimLogField('strokeCount', this.value)"></label>
</div></details>
<div class="day-hint">토요일 메인 수영 전날(금)은 휴식, B 루틴은 실패세트 없이 끝내는 게 이 일정의 전제예요.</div>`;
}
function coreCardHtml() {
  const log = getCoreLog(todayStr());
  const checks = log.checks || {};
  const doneCount = CORE_ROUTINE.filter((x) => checks[x.id]).length;
  return `<div class="day-title">홈코어 10분 <span class="day-count">${doneCount}/${CORE_ROUTINE.length}</span></div>
<div class="core-list">${CORE_ROUTINE.map((x) => `<button type="button" class="core-item${checks[x.id] ? ' on' : ''}" onclick="toggleCoreItem('${x.id}')" aria-pressed="${!!checks[x.id]}"><span class="core-box">${checks[x.id] ? '✓' : ''}</span><span class="core-text"><b>${escapeHtml(x.name)}</b> <em>${x.dose}</em><small>${escapeHtml(x.cue)}</small></span></button>`).join('')}</div>
<button type="button" class="btn-primary" onclick="finishCore()"${doneCount ? '' : ' disabled'}>${log.done ? '✓ 홈코어 완료됨' : '홈코어 완료'}</button>
<div class="day-hint">진료 목표(갈비뼈-골반 중립·코어 안정성)용 기본 루틴이에요. 담당 선생님 처방이 따로 있으면 그걸 우선.</div>`;
}
function toggleSwimDone() {
  const today = todayStr();
  const done = !swimDoneOn(today);
  saveSwimLogEntry(today, done ? { done: true, doneAt: new Date().toISOString() } : { done: false, distanceM: undefined, minutes: undefined });
  showToast(done ? '🏊 수영 완료 기록' : '수영 완료 취소');
  afterActivityChange();
}
function saveSwimLogField(field, value) {
  const patch = { [field]: value === '' ? undefined : parseFloat(value) };
  if ((field === 'distanceM' || field === 'minutes') && value !== '') patch.done = true;
  saveSwimLogEntry(todayStr(), patch);
  afterActivityChange(true);
}
function toggleCoreItem(id) {
  const today = todayStr();
  const log = getCoreLog(today);
  const checks = { ...(log.checks || {}), [id]: !(log.checks || {})[id] };
  const all = CORE_ROUTINE.every((x) => checks[x.id]);
  saveCoreLogEntry(today, { checks, ...(all ? { done: true, doneAt: new Date().toISOString() } : {}) });
  if (all && !log.done) { showToast('🧘 홈코어 완료!'); vibrate(60); }
  afterActivityChange();
}
function finishCore() {
  saveCoreLogEntry(todayStr(), { done: true, doneAt: new Date().toISOString() });
  showToast('🧘 홈코어 완료 기록');
  afterActivityChange();
}
function afterActivityChange(skipCard) {
  if (!skipCard) renderDayCard();
  buildWeekStrip();
  renderWeekChip();
}
function submitRecoveryCheck() {
  const flags = {
    lat: !!document.getElementById('mrcLat')?.checked,
    fatigue: !!document.getElementById('mrcFatigue')?.checked,
    shoulderRom: !!document.getElementById('mrcRom')?.checked,
  };
  const shifted = Object.values(flags).some(Boolean);
  saveWeeklyRecoveryEntry(Progression.isoWeekKey(todayStr()), { flags, shifted, fromKey: recoveryCheckDayKey(), answeredAt: new Date().toISOString(), version: 2 });
  showToast(shifted ? '🔁 오늘은 회복 · A는 수요일, B는 금요일로 이동' : '✅ 컨디션 좋음 — 원래 일정대로');
  buildWeekStrip();
  setDayMode(shifted ? 'X' : 'A', shifted ? 'rest' : undefined);
}
function undoRecoveryShift() {
  saveWeeklyRecoveryEntry(Progression.isoWeekKey(todayStr()), { shifted: false });
  showToast('원래 일정으로 되돌림');
  buildWeekStrip();
  renderDailyTab();
  const next = resolveDayMode();
  setDayMode(next.mode, next.sub);
}

/* ═══ 루틴 카드 ═══ */
function exRestSecs(ex) {
  return ex.restSecs || 90;
}
function isExerciseFinished(rec, ex) {
  if (rec.stopped) return true;
  if (!rec.allDone) return false;
  return !ex.repMax || String(rec.lastRir ?? '') !== '';
}
function renderRoutine() {
  const content = document.getElementById('routineContent');
  if (!content) return;
  if (!currentRoutine) {
    content.innerHTML = '';
    updateProgress();
    return;
  }
  const rk = currentRoutine;
  const r = ROUTINES[rk];
  const today = todayStr();
  const entries = recEntries();
  const openIdx = getCurrentExerciseIdx();
  content.innerHTML = r.exercises.map((_, idx) => exerciseCardHtml(rk, idx, today, entries, idx === openIdx)).join('');
  updateProgress();
}
function exerciseCardHtml(rk, idx, today, entries, isOpen) {
  const ex = effectiveExercise(rk, idx, today);
  const rec = getRecord(`${rk}_${idx}_${today}`);
  const hist = routineHistory(rk, idx, ex, entries);
  const finished = isExerciseFinished(rec, ex);
  const inc = getIncrement(ex);
  const smart = getSmartRec(rk, idx, ex, finished && rec.summary ? [{ date: today, rec }, ...hist] : hist, entries, finished);
  const prev = hist[0]?.rec;
  const fallback = !prev ? exerciseHistory(ex.id, entries, true)[0] : null;
  let checkedCount = 0;
  let rows = '';
  for (let s = 0; s < ex.sets; s++) {
    const todayKg = rec['kg_' + s];
    const todayRp = rec['reps_' + s];
    let kgVal = '';
    let rpVal = '';
    let prefilled = false;
    if (todayKg !== undefined || todayRp !== undefined) {
      kgVal = todayKg || todayKg === 0 ? todayKg : '';
      rpVal = todayRp || '';
    } else if (prev) {
      kgVal = prev['kg_' + s] ?? '';
      rpVal = prev['reps_' + s] ?? '';
      prefilled = true;
    } else if (fallback) {
      kgVal = Progression.workingWeight(fallback.rec, ex.sets) || fallback.rec['kg_0'] || '';
      prefilled = true;
    } else if (ex.defKg) {
      kgVal = ex.defKg;
      prefilled = true;
    }
    if (kgVal === 0 && !rec['kg_' + s]) kgVal = '';
    const checked = !!rec['checked_' + s];
    if (checked) checkedCount++;
    rows += `<div class="set-row${checked ? ' checked' : ''}" id="setRow_${idx}_${s}">
  <span class="set-no">${s + 1}</span>
  <div class="stepper"><button class="adj-s" type="button" onclick="adj('kg',${idx},${s},-1)" data-idx="${idx}" data-s="${s}" data-type="kg" data-delta="-1" aria-label="${s + 1}세트 중량 ${inc}kg 감소">−</button><input class="rec-inp${prefilled ? ' prefilled' : ''}" type="number" inputmode="decimal" placeholder="kg" id="kg_${idx}_${s}" value="${kgVal}" oninput="onInpChange(${idx},${s})" aria-label="${s + 1}세트 중량 kg"><button class="adj-s" type="button" onclick="adj('kg',${idx},${s},1)" data-idx="${idx}" data-s="${s}" data-type="kg" data-delta="1" aria-label="${s + 1}세트 중량 ${inc}kg 증가">+</button></div>
  <div class="stepper reps"><button class="adj-s" type="button" onclick="adj('rp',${idx},${s},-1)" data-idx="${idx}" data-s="${s}" data-type="rp" data-delta="-1" aria-label="${s + 1}세트 횟수 1회 감소">−</button><input class="rec-inp${prefilled ? ' prefilled' : ''}" type="number" inputmode="numeric" placeholder="회" id="rp_${idx}_${s}" value="${rpVal}" oninput="onInpChange(${idx},${s})" aria-label="${s + 1}세트 반복 횟수"><button class="adj-s" type="button" onclick="adj('rp',${idx},${s},1)" data-idx="${idx}" data-s="${s}" data-type="rp" data-delta="1" aria-label="${s + 1}세트 횟수 1회 증가">+</button></div>
  <button class="set-check-btn${checked ? ' checked' : ''}" id="chk_${idx}_${s}" onclick="toggleSetCheck(${idx},${s})" type="button" aria-pressed="${checked}" aria-label="${s + 1}세트 완료">✓</button>
</div>`;
  }
  const applyBtn = smart.kg > 0 && !finished && ['INCREASE', 'REDUCE', 'START'].includes(smart.action)
    ? `<button class="crb-apply-btn" type="button" onclick="applyRec(${idx},${smart.kg},${smart.reps || 0})">${smart.kg}kg 적용</button>` : '';
  const insight = `<div class="top-insight ${smart.action === 'PLATEAU' ? 'plateau' : 'rec'}" id="progress_${idx}"><span class="ti-icon">${REC_ICONS[smart.action] || '🎯'}</span><span class="ti-text">${escapeHtml(smart.msg)}</span>${applyBtn}</div>`;
  const prevLine = prev
    ? `<div class="rec-prev">지난번 ${shortDate(hist[0].date)} · <b>${recBrief(prev, ex.sets)}</b>${prev.lastRir !== undefined && prev.lastRir !== '' ? ` · RIR ${escapeHtml(prev.lastRir === '?' ? '모름' : prev.lastRir)}` : ''}</div>`
    : fallback ? `<div class="rec-prev">이 루틴 첫 기록 · 최근 ${ROUTINES[fallback.routineKey].label} ${shortDate(fallback.date)} <b>${recBrief(fallback.rec)}</b></div>` : '';
  const rirVal = String(rec.lastRir ?? '');
  const needRir = ex.repMax && rec.allDone && rirVal === '';
  const rirRow = ex.repMax
    ? `<div class="rir-row${needRir ? ' need' : ''}" id="rirRow_${idx}"><span class="rir-lbl">${needRir ? '마지막 세트 RIR 고르면 다음 종목으로' : '마지막 세트 RIR'}</span><div class="rir-chips">${[['0', '0'], ['1', '1'], ['2', '2'], ['3+', '3+'], ['?', '모름']].map(([v, l]) => `<button type="button" class="rir-chip${rirVal === v ? ' pick' : ''}" onclick="setRir(${idx},'${v}')" aria-pressed="${rirVal === v}">${l}</button>`).join('')}</div></div>`
    : '';
  const painVal = rec.pain || '';
  const extra = `<details class="rec-extra-wrap"><summary>통증 · 메모 · 빠른 입력</summary>
<div class="rec-extra"><select id="pain_${idx}" onchange="saveEx(${idx},true)"><option value="">통증 없음</option><option value="muscle"${painVal === 'muscle' ? ' selected' : ''}>근육 자극</option><option value="joint"${painVal === 'joint' ? ' selected' : ''}>관절 시큰</option><option value="nerve"${painVal === 'nerve' ? ' selected' : ''}>저림/방사통</option></select>
<textarea class="rec-note" id="note_${idx}" placeholder="오늘 느낌 메모: 광배 느낌, 허리 당김 등" onchange="saveEx(${idx},true)">${escapeHtml(rec.note || '')}</textarea></div>
<div class="quick-row"><button class="quick-btn" onclick="copyPrevious(${idx})" type="button">지난 기록 복사</button><button class="quick-btn" onclick="sameAsFirst(${idx})" type="button">1세트로 통일</button><button class="quick-btn danger" onclick="stopForPain(${idx})" type="button">통증 중단</button></div></details>`;
  const incChips = [1, 2, 2.5, 5].map((v) => `<button type="button" class="inc-chip${inc === v ? ' pick' : ''}" onclick="setIncrement(${idx},${v})">${v}kg</button>`).join('');
  const base = baseExercise(rk, idx);
  const altBtns = (base.alts || []).length
    ? `<div class="dl"><div class="dl-label">기구가 없으면 대체</div><div class="alt-row">${[{ id: base.id, name: base.name }, ...base.alts].map((a) => `<button type="button" class="inc-chip${a.id === ex.id ? ' pick' : ''}" onclick="switchVariant(${idx},'${a.id}')">${escapeHtml(a.name)}</button>`).join('')}</div></div>` : '';
  const detail = `<div class="ex-detail" id="exInfo_${idx}">
  <div class="dl"><div class="dl-label">⬆ 수축</div><div class="dl-text">${escapeHtml(ex.con)}</div></div>
  <div class="dl"><div class="dl-label">⬇ 이완</div><div class="dl-text">${escapeHtml(ex.ecc)}</div></div>
  ${ex.tip ? `<div class="tip-box">💡 ${escapeHtml(ex.tip)}</div>` : ''}
  ${ex.warn ? `<div class="warn-box">${escapeHtml(ex.warn)}</div>` : ''}
  <div class="dl"><div class="dl-label">증량 단위 (± 버튼·증량 추천)</div><div class="alt-row">${incChips}</div></div>
  ${altBtns}
</div>`;
  const status = rec.stopped ? '중단' : finished ? '✓' : `${checkedCount}/${ex.sets}`;
  const summaryLine = (finished || rec.stopped) && rec.summary ? `<div class="ex-summary" onclick="toggleCard(${idx})">${escapeHtml(recBrief(rec, ex.sets))}${rec.lastRir && rec.lastRir !== '?' ? ` · RIR ${escapeHtml(rec.lastRir)}` : ''}${rec.stopped ? ' · 통증 중단' : ''}</div>` : '';
  const target = ex.repMax ? `${ex.sets}세트 · ${ex.reps}회 · 휴식 ${formatRestTime(exRestSecs(ex))}` : `${ex.sets}세트 · ${ex.reps} · ${ex.target}`;
  return `<div class="ex-card${isOpen ? ' open' : ''}${finished ? ' done' : ''}${rec.stopped ? ' stopped' : ''}" id="ex-${idx}">
<div class="ex-head" onclick="toggleCard(${idx})" role="button" tabindex="0" aria-expanded="${isOpen}" aria-label="${escapeHtml(ex.name)} 펼치기/접기">
  <div class="ex-num">${String(idx + 1).padStart(2, '0')}</div>
  <div class="ex-name-wrap"><span class="ex-name">${escapeHtml(ex.name)}<button class="ex-info-btn" onclick="event.stopPropagation();toggleExInfo(${idx})" type="button" aria-label="${escapeHtml(ex.name)} 폼 가이드·설정">ⓘ</button></span><span class="ex-target">${escapeHtml(target)}</span></div>
  <div class="ex-right"><span class="ex-status" id="exStatus_${idx}">${status}</span><span class="ex-chev">▾</span></div>
</div>
${summaryLine}${detail}
<div class="rec-body">${insight}${prevLine}<div class="set-head"><span></span><span>kg (±${inc})</span><span>회</span><span></span></div><div class="set-list">${rows}</div>${rirRow}${extra}</div>
</div>`;
}
function toggleCard(idx) {
  const card = document.getElementById('ex-' + idx);
  if (!card) return;
  card.classList.toggle('open');
  card.querySelector('.ex-head')?.setAttribute('aria-expanded', String(card.classList.contains('open')));
}
function toggleExInfo(idx) {
  document.getElementById('exInfo_' + idx)?.classList.toggle('show');
}
function rerenderCard(idx, keepOpen) {
  const card = document.getElementById('ex-' + idx);
  if (!card || !currentRoutine) return;
  const open = keepOpen ?? card.classList.contains('open');
  const infoOpen = document.getElementById('exInfo_' + idx)?.classList.contains('show');
  const extraOpen = card.querySelector('.rec-extra-wrap')?.open;
  const wrap = document.createElement('div');
  wrap.innerHTML = exerciseCardHtml(currentRoutine, idx, todayStr(), recEntries(), open);
  const next = wrap.firstElementChild;
  card.replaceWith(next);
  if (infoOpen) document.getElementById('exInfo_' + idx)?.classList.add('show');
  if (extraOpen) { const d = next.querySelector('.rec-extra-wrap'); if (d) d.open = true; }
}
function setIncrement(idx, v) {
  const ex = effectiveExercise(currentRoutine, idx);
  sls('increment:' + ex.id, v);
  showToast(`${ex.name} 증량 단위 ${v}kg`);
  rerenderCard(idx);
}
function switchVariant(idx, id) {
  const rKey = `${currentRoutine}_${idx}_${todayStr()}`;
  const rec = getRecord(rKey);
  const ex = effectiveExercise(currentRoutine, idx);
  if (ex.id === id) return;
  if (Object.keys(rec).some((k) => k.startsWith('checked_') && rec[k])) {
    showToast('이미 세트를 완료해서 오늘은 변경 불가');
    return;
  }
  const fresh = { exerciseId: id };
  saveRecord(rKey, fresh);
  const next = effectiveExercise(currentRoutine, idx);
  showToast(next.isVariant ? `🔁 오늘은 ${next.name}로 대체` : `원래 종목(${next.name})으로`);
  rerenderCard(idx, true);
  document.getElementById('exInfo_' + idx)?.classList.add('show');
  updateProgress();
}

/* ── 세트 입력 ── */
function applyRec(idx, kg, reps) {
  const ex = effectiveExercise(currentRoutine, idx);
  for (let s = 0; s < ex.sets; s++) {
    const kgEl = document.getElementById(`kg_${idx}_${s}`);
    const rpEl = document.getElementById(`rp_${idx}_${s}`);
    if (kgEl && !document.getElementById(`chk_${idx}_${s}`)?.classList.contains('checked')) {
      kgEl.value = kg;
      kgEl.classList.remove('prefilled');
      if (rpEl && reps) { rpEl.value = reps; rpEl.classList.add('prefilled'); }
    }
  }
  saveEx(idx, true);
  showToast(`✅ ${kg}kg 적용${reps ? ` · ${reps}회부터` : ''}`);
}
/* 길게 누르면 가속되는 ± 조정 (20kg 차이를 8번 누르지 않도록) */
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
['pointerup', 'pointercancel', 'pointerleave'].forEach((evt) => document.addEventListener(evt, clearAdjHold));
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.adj-s');
  if (btn && btn === adjHoldBtn && adjHoldFired) {
    e.preventDefault();
    e.stopImmediatePropagation();
    adjHoldFired = false;
  }
}, true);
/* steps: kg는 증량 단위 배수, 횟수는 1회 배수 */
function adj(type, idx, s, steps) {
  const el = document.getElementById(type === 'kg' ? `kg_${idx}_${s}` : `rp_${idx}_${s}`);
  if (!el) return;
  const v = parseFloat(el.value) || 0;
  if (type === 'kg') {
    const inc = getIncrement(effectiveExercise(currentRoutine, idx));
    el.value = Math.max(0, roundTo(v + steps * inc, 0.25));
  } else el.value = Math.max(0, Math.round(v + steps));
  el.classList.remove('prefilled');
  onInpChange(idx, s);
}
function onInpChange(idx, s) {
  document.getElementById(`kg_${idx}_${s}`)?.classList.remove('prefilled');
  document.getElementById(`rp_${idx}_${s}`)?.classList.remove('prefilled');
  clearTimeout(window['_t' + idx]);
  window['_t' + idx] = setTimeout(() => saveEx(idx, true), 600);
}
function readSetInputs(idx, ex, rec) {
  const parts = [];
  for (let s = 0; s < ex.sets; s++) {
    const kgEl = document.getElementById(`kg_${idx}_${s}`);
    const rpEl = document.getElementById(`rp_${idx}_${s}`);
    if (kgEl) rec['kg_' + s] = parseFloat(kgEl.value) || 0;
    if (rpEl) rec['reps_' + s] = parseInt(rpEl.value) || 0;
    const kg = rec['kg_' + s], reps = rec['reps_' + s];
    if (reps) parts.push(kg ? `${kg}kg×${reps}` : `${reps}회`);
  }
  rec.summary = parts.join(' / ');
  const pain = document.getElementById(`pain_${idx}`);
  const note = document.getElementById(`note_${idx}`);
  if (pain) rec.pain = pain.value || '';
  if (note) rec.note = note.value || '';
  return rec;
}
function stampProgression(idx, rec, ex) {
  rec.totalReps = Progression.totalReps(rec, ex.sets);
  if (ex.repMax) rec.progressionStatus = Progression.evaluateDoubleProgression(ex, [{ date: todayStr(), rec }, ...routineHistory(currentRoutine, idx, ex)]).state;
}
function saveEx(idx, silent) {
  if (!currentRoutine) return;
  const ex = effectiveExercise(currentRoutine, idx);
  const rKey = `${currentRoutine}_${idx}_${todayStr()}`;
  const rec = getRecord(rKey);
  rec.exerciseId = ex.id;
  readSetInputs(idx, ex, rec);
  stampProgression(idx, rec, ex);
  clearTimeout(window['_t' + idx]);
  saveRecord(rKey, rec);
  if (!silent) showToast('💾 저장됨');
  updateProgress();
}
function toggleSetCheck(idx, s) {
  const btn = document.getElementById(`chk_${idx}_${s}`);
  if (!btn) return;
  const isChecked = btn.classList.toggle('checked');
  btn.setAttribute('aria-pressed', String(isChecked));
  document.getElementById(`setRow_${idx}_${s}`)?.classList.toggle('checked', isChecked);
  const rKey = `${currentRoutine}_${idx}_${todayStr()}`;
  const rec = getRecord(rKey);
  const ex = effectiveExercise(currentRoutine, idx);
  rec.exerciseId = ex.id;
  readSetInputs(idx, ex, rec);
  rec['checked_' + s] = isChecked;
  const wasDone = !!rec.allDone;
  rec.allDone = Array.from({ length: ex.sets }, (_, i) => !!rec['checked_' + i]).every(Boolean);
  if (isChecked) {
    const lastSet = rec.allDone;
    const restSecs = exRestSecs(ex) + (lastSet && rec.lastRir === '0' ? 30 : 0);
    setRestDuration(restSecs, ex.name);
    toggleRest(true);
    if (!lastSet) showToast(`✅ ${ex.name} ${s + 1}세트 완료 · 휴식 ${formatRestTime(restSecs)} 시작`);
  } else showToast('↩️ 되돌림 — 다시 누르면 완료 처리');
  if (rec.allDone && !wasDone) {
    const maxKg = Progression.topWeight(rec, ex.sets);
    const bestBefore = Math.max(0, ...exerciseHistory(ex.id, null, true).map((h) => Progression.topWeight(h.rec, ex.sets)));
    const prKey = `pr:${currentRoutine}_${idx}`;
    if (!ex.isVariant && maxKg > (gls(prKey) || 0)) sls(prKey, maxKg);
    if (maxKg > 0 && maxKg > bestBefore && bestBefore > 0) showToast(`🏆 PR! ${ex.name} ${maxKg}kg`);
    else showToast(ex.repMax && String(rec.lastRir ?? '') === '' ? `✅ ${ex.name} 완료 · 마지막 세트 RIR 선택` : `✅ ${ex.name} 완료!`);
    vibrate(60);
  }
  stampProgression(idx, rec, ex);
  saveRecord(rKey, rec);
  const finished = isExerciseFinished(rec, ex);
  rerenderCard(idx, !finished);
  if (rec.allDone && !wasDone && finished) openNextExercise(idx);
  else if (rec.allDone && !finished) setTimeout(() => document.getElementById('rirRow_' + idx)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  updateProgress();
}
function setRir(idx, v) {
  const rKey = `${currentRoutine}_${idx}_${todayStr()}`;
  const rec = getRecord(rKey);
  const ex = effectiveExercise(currentRoutine, idx);
  const wasFinished = isExerciseFinished(rec, ex);
  rec.exerciseId = ex.id;
  readSetInputs(idx, ex, rec);
  rec.lastRir = v;
  stampProgression(idx, rec, ex);
  saveRecord(rKey, rec);
  const finished = isExerciseFinished(rec, ex);
  rerenderCard(idx, !finished);
  if (finished && !wasFinished) {
    showToast(`✅ ${ex.name} 완료 · RIR ${v === '?' ? '모름' : v}`);
    openNextExercise(idx);
  }
  updateProgress();
}
function openNextExercise(idx) {
  document.querySelectorAll('.ex-card.open').forEach((c) => c.classList.remove('open'));
  const nextIdx = getCurrentExerciseIdx();
  const next = nextIdx >= 0 ? document.getElementById('ex-' + nextIdx) : document.getElementById('completeBanner');
  if (!next) return;
  if (nextIdx >= 0) next.classList.add('open');
  setTimeout(() => next.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}
function copyPrevious(idx) {
  const ex = effectiveExercise(currentRoutine, idx);
  const hist = routineHistory(currentRoutine, idx, ex);
  if (!hist.length) { showToast('이 루틴의 이전 기록 없음'); return; }
  const rec = hist[0].rec;
  for (let s = 0; s < ex.sets; s++) {
    const kg = document.getElementById(`kg_${idx}_${s}`);
    const rp = document.getElementById(`rp_${idx}_${s}`);
    if (kg && rec['kg_' + s] !== undefined) kg.value = rec['kg_' + s];
    if (rp && rec['reps_' + s] !== undefined) rp.value = rec['reps_' + s];
  }
  saveEx(idx, true);
  rerenderCard(idx, true);
  showToast('지난 기록 복사됨');
}
function sameAsFirst(idx) {
  const ex = effectiveExercise(currentRoutine, idx);
  const kg0 = document.getElementById(`kg_${idx}_0`)?.value || '';
  const rp0 = document.getElementById(`rp_${idx}_0`)?.value || '';
  if (!kg0 && !rp0) { showToast('1세트 값을 먼저 입력'); return; }
  for (let s = 1; s < ex.sets; s++) {
    const kg = document.getElementById(`kg_${idx}_${s}`);
    const rp = document.getElementById(`rp_${idx}_${s}`);
    if (kg0 && kg) kg.value = kg0;
    if (rp0 && rp) rp.value = rp0;
  }
  saveEx(idx, true);
  rerenderCard(idx, true);
  showToast('전체 세트 통일됨');
}
function stopForPain(idx) {
  const pain = document.getElementById(`pain_${idx}`);
  if (pain && !pain.value) pain.value = 'joint';
  const rKey = `${currentRoutine}_${idx}_${todayStr()}`;
  const ex = effectiveExercise(currentRoutine, idx);
  const rec = getRecord(rKey);
  rec.exerciseId = ex.id;
  readSetInputs(idx, ex, rec);
  rec.stopped = true;
  stampProgression(idx, rec, ex);
  saveRecord(rKey, rec);
  showToast('통증 중단 기록됨 — 오늘 해당 부위 추가 자극 금지');
  vibrate([80, 40, 80]);
  rerenderCard(idx, false);
  openNextExercise(idx);
  updateProgress();
}
function getCurrentExerciseIdx() {
  if (!currentRoutine) return 0;
  const r = ROUTINES[currentRoutine];
  const today = todayStr();
  for (let i = 0; i < r.exercises.length; i++) {
    if (!isExerciseFinished(getRecord(`${currentRoutine}_${i}_${today}`), effectiveExercise(currentRoutine, i, today))) return i;
  }
  return -1;
}
function getDoneCount(rk = currentRoutine) {
  if (!rk) return 0;
  const today = todayStr();
  return ROUTINES[rk].exercises.filter((_, i) => isExerciseFinished(getRecord(`${rk}_${i}_${today}`), effectiveExercise(rk, i, today))).length;
}
function estimateRemainingMinutes(rk = currentRoutine) {
  if (!rk) return 0;
  const today = todayStr();
  let secs = 0;
  ROUTINES[rk].exercises.forEach((_, i) => {
    const ex = effectiveExercise(rk, i, today);
    const rec = getRecord(`${rk}_${i}_${today}`);
    if (isExerciseFinished(rec, ex)) return;
    let left = 0;
    for (let s = 0; s < ex.sets; s++) if (!rec['checked_' + s]) left++;
    secs += left * (exRestSecs(ex) + 40) + (left === ex.sets ? 90 : 0);
  });
  return Math.round(secs / 60);
}
function computeVolume(rk, date) {
  const d = date || todayStr();
  let vol = 0;
  ROUTINES[rk].exercises.forEach((ex, i) => {
    const rec = getRecord(`${rk}_${i}_${d}`);
    for (let s = 0; s < ex.sets; s++) vol += (+rec['kg_' + s] || 0) * (+rec['reps_' + s] || 0);
  });
  return Math.round(vol);
}

/* ═══ 진행 표시 · 완료 ═══ */
function updateProgress() {
  const fill = document.getElementById('progFill');
  const text = document.getElementById('progText');
  const title = document.getElementById('progTitle');
  const banner = document.getElementById('completeBanner');
  if (!currentRoutine) {
    if (fill) fill.style.width = '0%';
    if (text) text.textContent = '';
    const plan = todayPlan();
    if (title) title.textContent = `오늘 계획 · ${plan.plan}`;
    if (banner) banner.classList.remove('show');
    return;
  }
  const r = ROUTINES[currentRoutine];
  const done = getDoneCount();
  const total = r.exercises.length;
  if (fill) fill.style.width = `${total ? Math.round((done / total) * 100) : 0}%`;
  if (text) text.textContent = done >= total ? '완료' : `${done}/${total} · ~${estimateRemainingMinutes()}분`;
  if (title) title.textContent = `${r.label} · ${r.tag}`;
  if (done === total && total > 0) {
    const completion = finalizeWorkoutCompletion(currentRoutine, todayStr());
    if (banner && banner.dataset.id !== completion.id) {
      renderCompleteBanner(completion);
      banner.dataset.id = completion.id;
    }
    banner?.classList.add('show');
    enqueueNotionCompletion(completion);
  } else banner?.classList.remove('show');
}
function nextSessionPlan(rk, date) {
  const entries = recEntries();
  return ROUTINES[rk].exercises.map((_, idx) => {
    const ex = effectiveExercise(rk, idx, date);
    const rec = getRecord(`${rk}_${idx}_${date}`);
    if (!rec.summary) return null;
    const hist = [{ date, rec }, ...routineHistory(rk, idx, ex, entries)];
    const smart = getSmartRec(rk, idx, ex, hist, entries, true);
    return { idx, name: ex.name, action: smart.action, kg: smart.kg, msg: smart.msg.replace('다음 세션 → ', '') };
  }).filter(Boolean);
}
function finalizeWorkoutCompletion(routineKey, date) {
  const key = `workout:${routineKey}:${date}`;
  let completion = gls(key);
  if (!completion) {
    const routine = ROUTINES[routineKey];
    const totalSets = routine.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const plan = nextSessionPlan(routineKey, date);
    completion = CompletionSync.buildWorkoutCompletion({
      routineKey,
      routineLabel: routine.label,
      date,
      completedAt: new Date().toISOString(),
      volumeKg: computeVolume(routineKey, date),
      totalSets,
      readiness: { ...getReadiness(), score: readinessScore() },
      exercises: routine.exercises.map((_, idx) => {
        const ex = effectiveExercise(routineKey, idx, date);
        const rec = getRecord(`${routineKey}_${idx}_${date}`);
        return {
          id: ex.id || null,
          name: ex.name,
          summary: rec.summary || '',
          lastRir: rec.lastRir ?? '',
          totalReps: rec.totalReps || 0,
          progressionStatus: rec.progressionStatus || '',
          pain: rec.pain || '',
          note: rec.note || '',
          stopped: !!rec.stopped,
          next: plan.find((p) => p.idx === idx)?.msg || '',
        };
      }),
    });
    sls(key, completion);
    sls('done:' + date, true);
    addHistory({ id: completion.id, date, routine: routine.label, summary: `${completion.volumeKg}kg · ${totalSets}세트` });
    buildWeekStrip();
    renderWeekChip();
  }
  return completion;
}
function renderCompleteBanner(completion) {
  const banner = document.getElementById('completeBanner');
  if (!banner) return;
  const completed = new Date(completion.completedAt);
  const plan = nextSessionPlan(completion.routineKey, completion.date);
  const ups = plan.filter((p) => p.action === 'INCREASE');
  const cautions = plan.filter((p) => p.action === 'REDUCE' || p.action === 'PLATEAU');
  const score = completion.readiness?.score;
  const nextLines = ups.length
    ? ups.map((p) => `<li>📈 ${escapeHtml(p.name)} ${p.kg}kg</li>`).join('')
    : '<li>전 종목 현재 중량 유지 · 반복 +1회 목표</li>';
  const cautionLines = cautions.map((p) => `<li>${p.action === 'REDUCE' ? '📉' : '📊'} ${escapeHtml(p.name)} — ${escapeHtml(p.msg)}</li>`).join('');
  banner.innerHTML = `<div class="done-title">🎉 ${escapeHtml(completion.routineLabel)} 완료</div>
<p class="done-time">${completed.getHours()}시 ${String(completed.getMinutes()).padStart(2, '0')}분 · 자동 저장됨</p>
<div class="complete-stats"><div class="cs"><span class="cs-val">${completion.exercises.length}</span><div class="cs-label">종목</div></div><div class="cs"><span class="cs-val">${formatKg(completion.volumeKg)}</span><div class="cs-label">총 볼륨</div></div><div class="cs"><span class="cs-val">${completion.totalSets}</span><div class="cs-label">세트</div></div></div>
<div class="done-next"><b>다음 세션 예고</b><ul>${nextLines}${cautionLines}</ul></div>
<div class="done-advice">${score === null || score === undefined ? '컨디션 미입력' : `컨디션 ${score}점`} · 단백질 ${PROTEIN_TARGET_TEXT} · 수면 7시간+${completion.routineKey === 'B' ? ' · 토요일 메인 수영 전 회복 우선' : ''}</div>
<div class="done-btns"><button class="cal-btn" id="calBtn" type="button" onclick="copyWorkoutSummary()">📋 요약 복사</button><button class="cal-btn" type="button" onclick="exportBackup()">📤 백업</button></div>
<p class="notion-sync-status" id="notionSyncStatus"></p>
<pre class="summary-fallback" id="summaryFallback" hidden></pre>`;
}
function buildWorkoutSummary() {
  const rk = currentRoutine;
  const r = ROUTINES[rk];
  const today = todayStr();
  const totalSets = r.exercises.reduce((sum, e) => sum + e.sets, 0);
  const logs = r.exercises.map((_, i) => {
    const ex = effectiveExercise(rk, i, today);
    const rec = getRecord(`${rk}_${i}_${today}`);
    const extra = [
      rec.lastRir !== undefined && rec.lastRir !== '' ? `RIR ${rec.lastRir === '?' ? '모름' : rec.lastRir}` : '',
      rec.pain ? `통증 ${rec.pain}` : '',
      rec.note ? `메모 ${rec.note}` : '',
    ].filter(Boolean).join(' / ');
    return rec.summary ? `- ${ex.name}: ${rec.summary}${extra ? ' (' + extra + ')' : ''}` : null;
  }).filter(Boolean).join('\n');
  const rd = getReadiness();
  const score = readinessScore();
  const condition = score === null ? '컨디션: 미입력' : `컨디션: 수면 ${rd.sleep}/5 · 피로 ${rd.fatigue}/5 · 통증 ${rd.pain}/5 (회복 ${score}점)`;
  const next = nextSessionPlan(rk, today).map((p) => `- ${p.name}: ${p.msg}`).join('\n');
  return `💪 ${r.label} 완료\n날짜: ${today}\n총 볼륨: ${computeVolume(rk)}kg\n총 세트: ${totalSets}세트\n${condition}\n\n${logs || '기록 없음'}\n\n다음 세션 예고\n${next}\n\n(분석 요청: 위 기록 기준으로 다음 세션 중량·볼륨·회복을 판단해 주세요.)`;
}
function copyWorkoutSummary() {
  if (!currentRoutine) return;
  const btn = document.getElementById('calBtn');
  const text = buildWorkoutSummary();
  const fallback = () => {
    const el = document.getElementById('summaryFallback');
    if (el) { el.hidden = false; el.textContent = text; }
    showToast('📋 요약을 화면에 표시했어');
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (btn) btn.textContent = '✅ 복사됨';
      showToast('📋 운동 요약 복사됨');
    }).catch(fallback);
  } else fallback();
}

/* ── 하체 재도입: 헬스일 루틴 아래에 인라인 기록 ── */
function renderLowerBodyInline() {
  const el = document.getElementById('lowerBodyInline');
  if (!el) return;
  if (!currentRoutine || currentRoutine === 'C') { el.innerHTML = ''; return; }
  const progress = getLowerBodyProgress();
  const stage = LOWER_BODY_STAGES[progress.stage - 1];
  const todaySession = (progress.sessions || []).slice().reverse().find((s) => s.date === todayStr());
  const head = `<div class="lb-inline-head"><span class="lb-stage-num">하체 재도입 STAGE ${progress.stage}/5</span><b>${escapeHtml(stage.name)}</b><span>${stage.setsReps} · RIR ${stage.rir}</span></div>`;
  if (todaySession) {
    const passed = Progression.isSessionPassed(todaySession.checks);
    el.innerHTML = `<div class="lb-inline">${head}<div class="lb-inline-done">${passed ? '✅ 오늘 세션 통과 기록됨' : '⚠️ 오늘 세션 기록됨 (일부 조건 미충족)'}</div></div>`;
    return;
  }
  el.innerHTML = `<details class="lb-inline"><summary>${head}<span class="lb-inline-cta">세션 기록 ▾</span></summary>${lowerBodyChecksHtml('lbi')}<button type="button" class="btn-primary" onclick="logLowerBodySession('lbi')">오늘 세션 기록</button><div class="lb-regress-hint">⚠️ 통증 3/10 이상 또는 저림·방사통이면 데일리 탭에서 이전 단계로</div></details>`;
}
function lowerBodyChecksHtml(prefix) {
  return `<div class="lb-session-form">
  <label class="chk-row"><input type="checkbox" id="${prefix}PainOk"> 운동 중 통증 0~2/10</label>
  <label class="chk-row"><input type="checkbox" id="${prefix}NoIncrease"> 세트 진행해도 통증 증가 없음</label>
  <label class="chk-row"><input type="checkbox" id="${prefix}NoFlare"> 다음날 기존 증상 악화 없음(직전 세션 기준)</label>
  <label class="chk-row"><input type="checkbox" id="${prefix}SymmetryOk"> 좌우 대칭 무너짐 없음</label>
</div>`;
}

/* ═══ REST TIMER (하단 독) ═══ */
let restInterval = null,
  restLeft = 90,
  restTotal = 90,
  restRunning = false,
  restEndAt = null,
  restWakeLock = null;
let bottomDockMode = 'nav';
function setBottomDockMode(mode) {
  bottomDockMode = mode === 'rest' ? 'rest' : 'nav';
  document.getElementById('bottomDock')?.classList.toggle('mode-rest', bottomDockMode === 'rest');
  const toggle = document.getElementById('dockToggle');
  if (toggle) {
    toggle.textContent = bottomDockMode === 'rest' ? '☰' : '⏱';
    toggle.setAttribute('aria-label', bottomDockMode === 'rest' ? '탭 메뉴 보기' : '휴식 타이머 보기');
  }
}
function toggleBottomDockMode() {
  setBottomDockMode(bottomDockMode === 'rest' ? 'nav' : 'rest');
}
function setRestDuration(secs, name) {
  restTotal = secs;
  if (!restRunning) restLeft = secs;
  const hint = document.getElementById('brbHint');
  if (hint) hint.textContent = name ? `${name} 기본 ${formatRestTime(secs)}` : '';
  renderRestTimer();
}
function renderRestTimer(state = '') {
  const display = restLeft <= 0 ? 'GO! 💪' : formatRestTime(restLeft);
  const brbDisplay = document.getElementById('brbDisplay');
  const brbBtn = document.getElementById('brbBtn');
  const brbFill = document.getElementById('brbFill');
  const brbBar = document.getElementById('bottomRestBar');
  if (brbDisplay) brbDisplay.textContent = display;
  if (brbBtn) brbBtn.textContent = restRunning ? '건너뛰기' : '시작';
  if (brbFill) brbFill.style.width = restLeft <= 0 ? '100%' : `${Math.max(0, (restLeft / restTotal) * 100)}%`;
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
  renderRestTimer(restLeft <= 10 && restRunning ? 'danger' : restLeft <= 30 && restRunning ? 'warn' : '');
}
/* 휴식 종료음 (기본 off — 설정·타이머에서 토글) */
let audioCtx = null;
function soundOn() {
  return !!gls('soundOn');
}
function ensureAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {}
}
function renderSoundButtons() {
  const on = soundOn();
  document.querySelectorAll('[data-sound-btn]').forEach((b) => { b.textContent = on ? '🔔' : '🔕'; b.setAttribute('aria-pressed', String(on)); });
  const setting = document.getElementById('soundSetting');
  if (setting) setting.checked = on;
}
function toggleSound() {
  const on = !soundOn();
  sls('soundOn', on);
  if (on) ensureAudio();
  renderSoundButtons();
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
async function acquireWakeLock() {
  try { restWakeLock = await navigator.wakeLock?.request('screen'); } catch {}
}
function releaseWakeLock() {
  try { restWakeLock?.release(); } catch {}
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
    vibrate([100, 50, 100]);
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
  if (restRunning) {
    restEndAt = Date.now() + restTotal * 1000;
    restLeft = restTotal;
    renderRestTimer();
    return;
  }
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

/* ═══ NOTION (운동 완료 요약 1페이지만) ═══ */
const NOTION_WEBHOOK_CONFIG = 'notionWebhookConfig';
const NOTION_WEBHOOK_OUTBOX = 'notionWebhookOutbox';
const NOTION_WEBHOOK_DELIVERED = 'notionWebhookDelivered';
const DEFAULT_NOTION_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwCr7_TgbOX3rPYl3aQX_DR7DEgB8NMP8Wgor1YE2YCdm9xNTTeMk5Wp9TFVjI2QQKKDA/exec';
let notionWebhookFlushRunning = false;

function getNotionWebhookConfig() {
  const saved = gls(NOTION_WEBHOOK_CONFIG);
  if (saved) return { enabled: !!saved.enabled, url: saved.url || '', secret: saved.secret || '' };
  const legacy = gls('healthWebhookConfig');
  if (legacy) return { enabled: !!legacy.enabled, url: legacy.url || '', secret: '' };
  const legacyUrl = (gls('webhookUrl') || '').trim();
  if (legacyUrl) return { enabled: gls('webhookEnabled') !== false, url: legacyUrl, secret: '' };
  return { enabled: true, url: DEFAULT_NOTION_WEBHOOK_URL, secret: '' };
}
function isValidWebhookUrl(value) {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
/* GAS 중계기는 WEBHOOK_SECRET이 설정되면 ?secret= 없는 요청을 거절한다.
   no-cors라 앱에서는 거절을 볼 수 없으므로, 시크릿은 URL에 반드시 붙여 보낸다. */
function webhookEndpoint(config) {
  if (!config.secret) return config.url;
  const u = new URL(config.url);
  if (!u.searchParams.has('secret')) u.searchParams.set('secret', config.secret);
  return u.toString();
}
function setNotionSyncStatus(message, isError) {
  const el = document.getElementById('notionSyncStatus');
  if (el) {
    el.textContent = message || '';
    el.classList.toggle('error', !!isError);
  }
}
function hydrateNotionWebhookSettings() {
  const config = getNotionWebhookConfig();
  const enabled = document.getElementById('notionWebhookEnabled');
  const url = document.getElementById('notionWebhookUrl');
  const secret = document.getElementById('notionWebhookSecret');
  if (enabled) enabled.checked = !!config.enabled;
  if (url) url.value = config.url || '';
  if (secret) secret.value = config.secret || '';
  const hint = document.getElementById('notionSecretHint');
  if (hint) {
    let hasSecret = !!config.secret;
    try { hasSecret = hasSecret || new URL(config.url).searchParams.has('secret'); } catch {}
    hint.textContent = hasSecret ? '✅ 시크릿 포함해서 전송 중' : '⚠️ 시크릿 없음 — 중계기에 WEBHOOK_SECRET이 설정돼 있으면 기록이 조용히 거절돼요';
  }
}
function saveNotionWebhookSettings() {
  const enabled = !!document.getElementById('notionWebhookEnabled')?.checked;
  const url = document.getElementById('notionWebhookUrl')?.value.trim() || '';
  const secret = document.getElementById('notionWebhookSecret')?.value.trim() || '';
  if (enabled && !isValidWebhookUrl(url)) {
    showToast('⚠️ HTTPS 웹훅 URL을 확인해줘');
    return false;
  }
  sls(NOTION_WEBHOOK_CONFIG, { enabled, url, secret });
  hydrateNotionWebhookSettings();
  showToast(enabled ? '✅ Notion 자동 기록 켜짐' : 'Notion 자동 기록 꺼짐');
  if (enabled) flushNotionWebhookOutbox();
  return true;
}
async function postNotionWebhook(config, payload) {
  await fetch(webhookEndpoint(config), {
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
    await postNotionWebhook(config, {
      schemaVersion: 1,
      event: 'webhook.test',
      eventId: `test:${Date.now()}`,
      createdAt: new Date().toISOString(),
      destination: { type: 'notion' },
      notion: { title: '내 루틴 시험 기록', markdown: '# 내 루틴 시험 기록\n\nNotion 연동이 정상입니다.' },
      message: '내 루틴 Notion 웹훅 시험 전송',
    });
    showToast('📨 시험 전송을 중계기에 전달했어 — Notion에서 확인');
  } catch (error) {
    console.error('[notion webhook] test failed', error);
    showToast('⚠️ 시험 전송 실패 — URL·네트워크 확인');
  }
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
  sls(NOTION_WEBHOOK_OUTBOX, CompletionSync.enqueue(gls(NOTION_WEBHOOK_OUTBOX) || [], event));
  setNotionSyncStatus('📨 Notion 기록 대기 중…');
  flushNotionWebhookOutbox();
}
async function flushNotionWebhookOutbox() {
  if (notionWebhookFlushRunning) return;
  const config = getNotionWebhookConfig();
  if (!config.enabled || !isValidWebhookUrl(config.url)) return;
  let outbox = gls(NOTION_WEBHOOK_OUTBOX) || [];
  /* 종목 단위 기록은 폐지(요약 1페이지만). 남아 있던 종목 이벤트는 보내지 않고 버린다 */
  if (outbox.some((item) => item.event === 'exercise.completed')) {
    outbox = outbox.filter((item) => item.event !== 'exercise.completed');
    sls(NOTION_WEBHOOK_OUTBOX, outbox);
  }
  if (!outbox.length) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    setNotionSyncStatus('📴 오프라인 — 연결되면 Notion에 자동 기록');
    return;
  }
  notionWebhookFlushRunning = true;
  try {
    for (const event of [...outbox]) {
      try {
        await postNotionWebhook(config, event);
        outbox = CompletionSync.markDelivered(outbox, event.eventId);
        sls(NOTION_WEBHOOK_OUTBOX, outbox);
        const delivered = gls(NOTION_WEBHOOK_DELIVERED) || [];
        if (!delivered.includes(event.eventId)) sls(NOTION_WEBHOOK_DELIVERED, [...delivered, event.eventId].slice(-400));
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
/* ═══ 기록 탭: 이번 주 / 종목 진행 / 몸·영양 추세 / 최근 기록 ═══ */
function buildHistory() {
  const index = activityIndex();
  buildWeekReport(index);
  buildExerciseProgress();
  renderWeeklySummary();
  buildHistLog(index);
}

/* 루틴 칸 또는 대체 종목 id로 직접세트 부위를 찾는다 */
function slotExerciseForRecord(rk, idx, rec) {
  const base = ROUTINES[rk]?.exercises[idx];
  if (!base) return null;
  if (!rec.exerciseId || rec.exerciseId === base.id) return base;
  return (base.alts || []).some((a) => a.id === rec.exerciseId) ? base : null;
}
function getWeeklyDirectSets(dates) {
  const totals = {};
  Object.keys(DIRECT_SET_GOALS).forEach((muscle) => { totals[muscle] = 0; });
  Object.keys(_cache).forEach((key) => {
    const match = key.match(/^rec:([AB])_(\d+)_(\d{4}-\d{2}-\d{2})$/);
    if (!match || !dates.has(match[3])) return;
    const rec = gls(key) || {};
    const ex = slotExerciseForRecord(match[1], Number(match[2]), rec);
    if (!ex?.directMuscle) return;
    let completed = 0;
    for (let s = 0; s < ex.sets; s++) if (rec['checked_' + s] || (rec.allDone && rec['reps_' + s])) completed++;
    totals[ex.directMuscle] += completed;
  });
  return totals;
}
function getProgressionRows() {
  const entries = recEntries();
  const rows = [];
  ['A', 'B'].forEach((rk) => ROUTINES[rk].exercises.forEach((base, idx) => {
    if (!base.repMax) return;
    const ex = { ...base, baseId: base.id, isVariant: false };
    const hist = Progression.selectHistory(entries, { routineKey: rk, exerciseId: ex.id, legacyIdx: idx });
    if (!hist.length) return;
    const status = Progression.evaluateDoubleProgression(ex, hist);
    const plateau = Progression.isPlateau(ex, hist);
    rows.push({ rk, name: ex.name, label: plateau && status.state !== 'increase' ? '정체 3세션' : status.label, state: plateau && status.state !== 'increase' ? 'plateau' : status.state });
  }));
  return rows;
}
function buildWeekReport(index) {
  const el = document.getElementById('weekReport');
  if (!el) return;
  const counts = weekActivityCounts(0, index);
  const lastCounts = weekActivityCounts(1, index);
  const streak = weeklyGoalStreak(index);
  const goal = (key, label, icon) => {
    const done = counts[key];
    const target = WEEKLY_TARGETS[key];
    const pct = Math.min(100, Math.round((done / target) * 100));
    return `<div class="goal-item${done >= target ? ' met' : ''}"><div class="goal-top"><span>${icon} ${label}</span><b>${done}/${target}</b></div><div class="goal-bar"><div style="width:${pct}%"></div></div><small>지난주 ${lastCounts[key]}회</small></div>`;
  };
  const dates = new Set(weekDates(0));
  const directSets = getWeeklyDirectSets(dates);
  const directHtml = Object.entries(DIRECT_SET_GOALS).map(([muscle, target]) => {
    const done = directSets[muscle];
    return `<div class="ds-row"><span>${muscle}</span><div class="ds-bar"><div style="width:${Math.min(100, Math.round((done / target) * 100))}%"></div></div><b>${done}/${target}</b></div>`;
  }).join('');
  const rows = getProgressionRows();
  const stateIcon = { increase: '📈', 'top-once': '⬆️', adapting: '🆕', up: '↗️', down: '↘️', maintain: '⚖️', plateau: '📊', insufficient: '·' };
  const progHtml = rows.length
    ? rows.map((r) => `<div class="pg-row ${r.state}"><span class="pg-rk">${r.rk}</span><span class="pg-name">${escapeHtml(r.name)}</span><span class="pg-state">${stateIcon[r.state] || ''} ${escapeHtml(r.label)}</span></div>`).join('')
    : '<div class="pc-empty">완료 기록을 쌓으면 종목별 진행 상태가 표시돼요.</div>';
  el.innerHTML = `
<div class="goal-head"><div><div class="report-kicker">이번 주 목표</div><div class="report-title">${weekGoalMet(counts) ? '달성 ✅' : '진행 중'}</div></div><div class="report-badge">${streak ? `${streak}주 연속 달성` : '연속 달성 0주'}</div></div>
<div class="goal-grid">${goal('gym', '헬스', '🏋️')}${goal('swim', '수영', '🏊')}${goal('core', '홈코어', '🧘')}</div>
<div class="goal-note">연속 달성 = 헬스 ${WEEKLY_TARGETS.gym}회 + 수영 ${WEEKLY_TARGETS.swim}회 이상인 주</div>
${reminderCardsHtml(index)}
<div class="report-sub"><b>주간 직접세트</b><span>완료 체크한 세트 기준</span></div><div class="ds-list">${directHtml}</div>
<div class="report-sub"><b>더블 프로그레션</b><span>루틴별 같은 종목끼리 비교</span></div><div class="pg-list">${progHtml}</div>
<div class="report-sub"><b>이번 달 출석</b><span>🏋️ 헬스 · 🏊 수영 · 🧘 코어</span></div>${calendarHtml(index)}`;
}
/* 디로드·진료 재평가 알림 (확인하면 숨김) */
function reminderCardsHtml(index) {
  const cards = [];
  const gymStreak = gymWeeksStreak(index);
  const dismissed = gls('deloadDismissed');
  const since = dismissed ? gymStreak - (dismissed.streak || 0) : gymStreak;
  if (gymStreak >= DELOAD_AFTER_WEEKS && (!dismissed || since >= DELOAD_AFTER_WEEKS || since < 0))
    cards.push(`<div class="remind-card"><b>🔋 ${gymStreak}주 연속 헬스 목표 달성</b><span>다음 주는 디로드(세트 절반, RIR 3~4)를 고려할 시점이에요. 관절·수면이 괜찮으면 그대로 진행해도 돼요.</span><button type="button" class="quick-btn" onclick="dismissDeload(${gymStreak})">확인</button></div>`);
  const clinical = gls('clinicalProfile') || CLINICAL_PROFILE;
  const weeks = clinical.medicalRecommendation?.durationWeeks || 8;
  const reviewDate = addDays(clinical.assessedAt, weeks * 7);
  if (todayStr() >= reviewDate && !gls('clinicalReviewDismissed'))
    cards.push(`<div class="remind-card"><b>🩺 진료 권고 기간(${weeks}주) 종료 · ${shortDate(reviewDate)}</b><span>권고됐던 ${escapeHtml(clinical.medicalRecommendation?.activity || '')} 대신 지금 코어 작업은 홈코어뿐이에요. 다음 진료 때 코어 처방을 다시 확인해 보세요.</span><button type="button" class="quick-btn" onclick="dismissClinicalReview()">확인</button></div>`);
  return cards.join('');
}
function dismissDeload(streak) {
  sls('deloadDismissed', { streak, at: todayStr() });
  buildHistory();
}
function dismissClinicalReview() {
  sls('clinicalReviewDismissed', todayStr());
  buildHistory();
}
function calendarHtml(index) {
  const now = new Date();
  const yr = now.getFullYear(), mo = now.getMonth();
  const first = new Date(yr, mo, 1).getDay();
  const days = new Date(yr, mo + 1, 0).getDate();
  const startOff = (first + 6) % 7;
  const prefix = `${yr}-${String(mo + 1).padStart(2, '0')}-`;
  let html = `<div class="cal-box"><div class="cal-month">${yr}년 ${mo + 1}월</div><div class="cal-dow">${['월', '화', '수', '목', '금', '토', '일'].map((d) => `<div class="cal-dow-lbl">${d}</div>`).join('')}</div><div class="cal-days">`;
  for (let i = 0; i < startOff; i++) html += '<div class="cd empty"></div>';
  for (let d = 1; d <= days; d++) {
    const date = prefix + String(d).padStart(2, '0');
    const marks = `${index.gym.has(date) ? '<i class="m-gym"></i>' : ''}${index.swim.has(date) ? '<i class="m-swim"></i>' : ''}${index.core.has(date) ? '<i class="m-core"></i>' : ''}`;
    html += `<div class="cd${d === now.getDate() ? ' today' : ''}${marks ? ' has' : ''}"><span>${d}</span><span class="cd-marks">${marks}</span></div>`;
  }
  return html + '</div><div class="cal-legend"><i class="m-gym"></i>헬스 <i class="m-swim"></i>수영 <i class="m-core"></i>코어</div></div>';
}

/* ── 종목 진행: 복합 종목은 추정 1RM, 고립 종목은 작업중량×총반복 ── */
let selectedChartEx = '';
function progressExerciseList() {
  const seen = new Map();
  ['A', 'B', 'C'].forEach((rk) => ROUTINES[rk].exercises.forEach((ex) => {
    if (!seen.has(ex.id)) seen.set(ex.id, { id: ex.id, name: ex.name, sets: ex.sets, compound: !!ex.compound });
    (ex.alts || []).forEach((a) => { if (!seen.has(a.id)) seen.set(a.id, { id: a.id, name: a.name, sets: ex.sets, compound: !!ex.compound, alt: true }); });
  }));
  const entries = recEntries();
  return [...seen.values()].map((x) => ({ ...x, count: exerciseHistory(x.id, entries).length })).filter((x) => x.count > 0 || !x.alt);
}
function buildExerciseProgress() {
  const list = progressExerciseList();
  const sel = document.getElementById('chartSel');
  if (!sel) return;
  if (!selectedChartEx || !list.some((x) => x.id === selectedChartEx)) selectedChartEx = (list.find((x) => x.count) || list[0])?.id || '';
  sel.innerHTML = list.map((x) => `<button type="button" class="cchip${x.id === selectedChartEx ? ' act' : ''}" data-id="${escapeHtml(x.id)}" aria-pressed="${x.id === selectedChartEx}">${escapeHtml(x.name)}${x.count ? '' : ' ·'}</button>`).join('');
  renderExerciseProgress();
}
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.cchip');
  if (!chip) return;
  selectedChartEx = chip.dataset.id;
  buildExerciseProgress();
});
function sessionMetric(rec, sets, compound) {
  const values = Progression.setValues(rec, Math.max(sets, 8)).filter((s) => s.kg || s.reps);
  if (compound) return Math.max(0, ...values.map((s) => e1rm(s.kg, s.reps)));
  const kg = Progression.workingWeight(rec, sets) || Progression.topWeight(rec, sets);
  return kg * values.reduce((sum, s) => sum + s.reps, 0);
}
function renderExerciseProgress() {
  const area = document.getElementById('chartArea');
  const prBox = document.getElementById('prBox');
  if (!area || !prBox) return;
  const meta = progressExerciseList().find((x) => x.id === selectedChartEx);
  if (!meta) { area.innerHTML = '<div class="chart-empty">기록 없음</div>'; prBox.innerHTML = ''; return; }
  const hist = exerciseHistory(meta.id).slice().reverse();
  const data = hist.map((h) => ({ x: h.date, y: sessionMetric(h.rec, meta.sets, meta.compound), rk: h.routineKey })).filter((d) => d.y > 0);
  const metricLabel = meta.compound ? '추정 1RM (kg)' : '작업중량 × 총반복';
  if (!data.length) {
    area.innerHTML = `<div class="chart-empty">아직 기록 없음 · 지표: ${metricLabel}</div>`;
    prBox.innerHTML = '';
    return;
  }
  const W = Math.min(area.clientWidth || 320, 600), H = 160;
  const pad = { t: 22, r: 20, b: 32, l: 46 };
  const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;
  const minY = Math.min(...data.map((d) => d.y)) * 0.94, maxY = Math.max(...data.map((d) => d.y)) * 1.06;
  const xS = (i) => pad.l + (i / (data.length - 1 || 1)) * pw;
  const yS = (v) => pad.t + ph - ((v - minY) / (maxY - minY || 1)) * ph;
  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block" role="img" aria-label="${escapeHtml(meta.name)} ${metricLabel} 추세">`;
  for (let i = 0; i <= 4; i++) {
    const v = minY + ((maxY - minY) * i) / 4, y = yS(v);
    svg += `<line x1="${pad.l}" y1="${y}" x2="${W - pad.r}" y2="${y}" stroke="var(--border)" stroke-width="1"/><text x="${pad.l - 5}" y="${y + 4}" text-anchor="end" fill="var(--text-3)" font-size="10">${Math.round(v)}</text>`;
  }
  const pts = data.map((d, i) => `${xS(i)},${yS(d.y)}`).join(' ');
  svg += `<polyline points="${pts}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    const x = xS(i), y = yS(d.y);
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="${d.rk === 'B' ? 'var(--green)' : 'var(--accent)'}"/>`;
    if (i === data.length - 1 || i === 0 || data.length <= 6) svg += `<text x="${x}" y="${H - 4}" text-anchor="middle" fill="var(--text-3)" font-size="9">${shortDate(d.x)}</text>`;
  });
  const last = data[data.length - 1];
  svg += `<text x="${xS(data.length - 1)}" y="${yS(last.y) - 9}" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="bold">${Math.round(last.y)}</text></svg>`;
  area.innerHTML = `${svg}<div class="chart-legend">${metricLabel} · <i class="lg-a"></i>A <i class="lg-b"></i>B</div>`;
  /* PR: 최고 중량 세트, 현재 작업중량에서 최다 반복 세트 */
  let heavy = null;
  hist.forEach((h) => Progression.setValues(h.rec, 8).forEach((s) => {
    if (s.kg && s.reps && (!heavy || s.kg > heavy.kg || (s.kg === heavy.kg && s.reps > heavy.reps))) heavy = { ...s, date: h.date };
  }));
  const latest = hist[hist.length - 1];
  const curKg = latest ? Progression.workingWeight(latest.rec, meta.sets) || Progression.topWeight(latest.rec, meta.sets) : 0;
  let repPr = null;
  hist.forEach((h) => Progression.setValues(h.rec, 8).forEach((s) => {
    if (s.kg === curKg && s.reps && (!repPr || s.reps > repPr.reps)) repPr = { ...s, date: h.date };
  }));
  const recent = hist.slice(-5).reverse().map((h) => `<div class="pr-row"><span class="pr-date">${shortDate(h.date)} ${h.routineKey}</span><span class="pr-sum">${escapeHtml(recBrief(h.rec))}</span><span class="pr-rir">${h.rec.lastRir && h.rec.lastRir !== '?' ? 'RIR ' + escapeHtml(h.rec.lastRir) : ''}</span></div>`).join('');
  prBox.innerHTML = `<div class="pr-grid"><div class="pr-card"><span>🏆 최고 중량</span><b>${heavy ? `${heavy.kg}kg × ${heavy.reps}` : '—'}</b><small>${heavy ? shortDate(heavy.date) : ''}</small></div><div class="pr-card"><span>🔁 ${curKg ? curKg + 'kg' : '현재 중량'} 최다 반복</span><b>${repPr ? `${repPr.reps}회` : '—'}</b><small>${repPr ? shortDate(repPr.date) : ''}</small></div></div><div class="pr-recent">${recent}</div>`;
}

/* ── 몸·영양 추세 ── */
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
  const pDelta = Progression.weeklyAverageDelta(seriesFromLog('dailyLog', 'proteinG'), today);
  const sDelta = Progression.weeklyAverageDelta(seriesFromLog('dailyLog', 'sodiumMg'), today);
  const swDelta = Progression.weeklyAverageDelta(seriesFromLog('swimLogs', 'avgSwolf'), today);
  const swimDist = weekDates(0).reduce((sum, d) => sum + (Number(getSwimLog(d).distanceM) || 0), 0);
  const progress = getLowerBodyProgress();
  const streak = Progression.consecutivePassedAtStage(progress.sessions, progress.stage);
  const fmt = (v, unit, digits) => (v === null ? '—' : `${v.toFixed(digits ?? 1)}${unit}`);
  const fmtDelta = (v, unit, digits) => (v === null ? '' : ` (${v > 0 ? '+' : ''}${v.toFixed(digits ?? 1)}${unit})`);
  const protein = pDelta.thisAvg === null ? '—' : `${Math.round(pDelta.thisAvg)}g ${pDelta.thisAvg >= PROTEIN_TARGET_MIN ? '✅' : `· 목표 ${PROTEIN_TARGET_TEXT}`}`;
  el.innerHTML = `
<div class="ws-summary-row"><span class="ws-summary-lbl">7일 평균 체중</span><span class="ws-summary-val">${fmt(wDelta.thisAvg, 'kg')}${fmtDelta(wDelta.delta, 'kg')}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">7일 평균 단백질</span><span class="ws-summary-val">${protein}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">7일 평균 나트륨</span><span class="ws-summary-val">${fmt(sDelta.thisAvg, 'mg', 0)}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">이번 주 수영 거리</span><span class="ws-summary-val">${swimDist ? swimDist.toLocaleString() + 'm' : '—'}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">SWOLF 평균</span><span class="ws-summary-val">${fmt(swDelta.thisAvg, '')}${fmtDelta(swDelta.delta, '')}</span></div>
<div class="ws-summary-row"><span class="ws-summary-lbl">하체 재도입</span><span class="ws-summary-val">STAGE ${progress.stage} · 연속 ${streak}회 통과</span></div>`;
}

/* ── 최근 기록: 헬스(탭하면 종목 상세) + 수영·홈코어 ── */
function buildHistLog(index) {
  const logWrap = document.getElementById('histLog');
  if (!logWrap) return;
  const items = getHistory().map((h) => ({ date: h.date, kind: 'gym', title: h.routine, detail: h.summary || '', id: h.id }));
  Object.entries(gls('swimLogs') || {}).forEach(([date, log]) => {
    if (!index.swim.has(date)) return;
    const parts = [log.distanceM ? `${log.distanceM}m` : '', log.minutes ? `${log.minutes}분` : '', log.rpe ? `힘듦 ${log.rpe}/5` : ''].filter(Boolean);
    items.push({ date, kind: 'swim', title: '수영', detail: parts.join(' · ') || '완료' });
  });
  Object.entries(gls('coreLogs') || {}).forEach(([date, log]) => {
    if (!log.done) return;
    items.push({ date, kind: 'core', title: '홈코어', detail: `${CORE_ROUTINE.filter((x) => log.checks?.[x.id]).length}/${CORE_ROUTINE.length}종목` });
  });
  items.sort((a, b) => b.date.localeCompare(a.date));
  if (!items.length) {
    logWrap.innerHTML = '<div class="pc-empty center">아직 기록이 없어요</div>';
    return;
  }
  const icon = { gym: '🏋️', swim: '🏊', core: '🧘' };
  logWrap.innerHTML = `<div class="hist-log">${items.slice(0, 30).map((h) => {
    const snap = h.kind === 'gym' && h.id ? gls(`workout:${h.id.split(':')[1]}:${h.date}`) : null;
    const detail = snap ? `<div class="hist-ex">${snap.exercises.filter((e) => e.summary).map((e) => `<div><b>${escapeHtml(e.name)}</b> ${escapeHtml(e.summary)}${e.lastRir && e.lastRir !== '?' ? ` · RIR ${escapeHtml(e.lastRir)}` : ''}${e.pain ? ' · ⚠️통증' : ''}</div>`).join('')}</div>` : '';
    const inner = `<span class="hist-date">${shortDate(h.date)}</span><span class="hist-main"><span class="hist-routine">${icon[h.kind]} ${escapeHtml(h.title)}</span><span class="hist-detail">${escapeHtml(h.detail)}</span></span>`;
    return detail ? `<details class="hist-log-item"><summary>${inner}<span class="sec-chev">▾</span></summary>${detail}</details>` : `<div class="hist-log-item">${inner}</div>`;
  }).join('')}</div>`;
}

/* ═══ 데일리 탭: 주간 스케줄 / 칼로리 / 오늘 기록 / 하체 재도입 트래커 ═══ */
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
function renderWeeklySchedule() {
  const el = document.getElementById('weeklyScheduleBox');
  if (!el) return;
  const { schedule, droppedDay, shifted } = getEffectiveWeeklySchedule();
  const todayIdx = weekIndex();
  const note = shifted
    ? `<div class="ws-note">⚠️ 이번 주는 회복 체크로 일정이 하루씩 밀렸어${droppedDay ? ` · ${escapeHtml(droppedDay.plan)}은 이번 주 생략` : ''} <button type="button" class="link-btn" onclick="undoRecoveryShift()">원래 일정으로</button></div>`
    : '';
  el.innerHTML = note + Progression.WEEK_ORDER.map((k, i) => {
    const day = schedule[k];
    return `<div class="ws-row${i === todayIdx ? ' today' : ''}"><span class="ws-day">${day.label}</span><span class="ws-label">${escapeHtml(day.plan)}</span></div>`;
  }).join('');
}
let selectedWorkoutType = null;
function getTodayWorkoutType() {
  if (selectedWorkoutType) return selectedWorkoutType;
  return todayPlan()?.kcal || 'rest';
}
function selectWorkoutType(type) {
  selectedWorkoutType = type;
  renderCalorieTable();
}
function renderCalorieTable() {
  const el = document.getElementById('calorieTableBox');
  if (!el) return;
  const active = getTodayWorkoutType();
  const chips = Object.keys(CALORIE_TABLE)
    .map((k) => `<button type="button" class="routine-chip${k === active ? ' active' : ''}" onclick="selectWorkoutType('${k}')">${CALORIE_TABLE[k].label}</button>`)
    .join('');
  const row = CALORIE_TABLE[active];
  el.innerHTML = `<div class="cal-type-row">${chips}</div><div class="cal-target-card"><div class="cal-target-kcal">${row.kcal} kcal</div><div class="cal-target-macros"><span>단백질 ${row.proteinG}</span><span>지방 ${row.fatG}</span></div></div>`;
}
function saveDailyLogField(field, value) {
  saveDailyLogEntry(todayStr(), { [field]: value === '' ? undefined : parseFloat(value) });
}
function renderDailyLogForm() {
  const el = document.getElementById('dailyLogBox');
  if (!el) return;
  const log = getDailyLog(todayStr());
  el.innerHTML = `
<div class="dl-grid">
  <label>공복체중(kg)<input type="number" inputmode="decimal" value="${log.bodyweightKg ?? ''}" onchange="saveDailyLogField('bodyweightKg', this.value)"></label>
  <label>총 kcal<input type="number" inputmode="decimal" value="${log.kcal ?? ''}" onchange="saveDailyLogField('kcal', this.value)"></label>
  <label>단백질(g)<input type="number" inputmode="decimal" value="${log.proteinG ?? ''}" onchange="saveDailyLogField('proteinG', this.value)"></label>
  <label>나트륨(mg)<input type="number" inputmode="decimal" value="${log.sodiumMg ?? ''}" onchange="saveDailyLogField('sodiumMg', this.value)"></label>
</div>
<div class="day-hint">수영·홈코어 기록은 오늘 운동 탭 → "그 외"에서 해요.</div>`;
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
${lowerBodyChecksHtml('lb')}
<button type="button" class="btn-primary" onclick="logLowerBodySession('lb')">오늘 세션 기록</button>
<div class="lb-actions">
  <button type="button" class="quick-btn"${canAdvance ? '' : ' disabled'} onclick="advanceLowerBodyStage()">다음 단계로${canAdvance ? '' : ` (${streak}/${LOWER_BODY_ADVANCE_STREAK})`}</button>
  <button type="button" class="quick-btn danger" onclick="regressLowerBodyStage()">퇴행 — 이전 단계로</button>
</div>
<div class="lb-regress-hint">⚠️ 통증 3/10 이상 또는 저림·방사통 발생 시 즉시 이전 단계로</div>
<div class="lb-history">${renderLowerBodySessionHistory(progress.sessions)}</div>`;
}
function logLowerBodySession(prefix) {
  const p = prefix || 'lb';
  const progress = getLowerBodyProgress();
  const checks = {
    painOk: !!document.getElementById(p + 'PainOk')?.checked,
    noIncrease: !!document.getElementById(p + 'NoIncrease')?.checked,
    noNextDayFlare: !!document.getElementById(p + 'NoFlare')?.checked,
    symmetryOk: !!document.getElementById(p + 'SymmetryOk')?.checked,
  };
  progress.sessions = progress.sessions || [];
  progress.sessions.push({ date: todayStr(), stage: progress.stage, checks, loggedAt: new Date().toISOString() });
  saveLowerBodyProgress(progress);
  showToast(Progression.isSessionPassed(checks) ? '✅ 오늘 세션 기록됨 — 조건 통과' : '기록됨 — 일부 조건 미충족');
  renderLowerBodyTracker();
  renderLowerBodyInline();
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
  renderLowerBodyInline();
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
  renderLowerBodyInline();
}
function renderDailyTab() {
  renderWeeklySchedule();
  renderCalorieTable();
  renderDailyLogForm();
  renderLowerBodyTracker();
}

/* ═══ 탭 · 테마 · 접근성 ═══ */
function switchTabById(id) {
  const tabs = ['gym', 'history', 'daily', 'settings'];
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === 'tab-' + id));
  document.querySelectorAll('.bnav-btn').forEach((b, i) => {
    const active = tabs[i] === id;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  if (id === 'history') buildHistory();
  if (id === 'daily') renderDailyTab();
  if (id === 'settings') renderSettings();
  sls('activeTab', id);
}
function switchTab(id) {
  switchTabById(id);
}
/* 테마: 'auto'(기기 설정 따름) | 'light' | 'dark' */
function themePref() {
  const t = gls('theme');
  return t === 'dark' || t === 'light' ? t : 'auto';
}
function applyTheme() {
  const pref = themePref();
  const dark = pref === 'dark' || (pref === 'auto' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  document.body.classList.toggle('dark', !!dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1b1b33' : '#6c5ce7');
}
function setTheme(pref) {
  if (pref === 'auto') dls('theme');
  else sls('theme', pref);
  applyTheme();
  renderSettings();
}
try { window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); } catch {}
function renderSettings() {
  const seg = document.getElementById('themeSeg');
  if (seg) {
    const pref = themePref();
    seg.innerHTML = [['auto', '자동'], ['light', '라이트'], ['dark', '다크']]
      .map(([k, l]) => `<button type="button" class="${pref === k ? 'active' : ''}" onclick="setTheme('${k}')" aria-pressed="${pref === k}">${l}</button>`).join('');
  }
  renderSoundButtons();
  updateBackupNote();
  renderAutoBackupList();
  hydrateNotionWebhookSettings();
}
/* role="button" div 키보드 지원 */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest('[role="button"]');
  if (!el || el.tagName === 'BUTTON') return;
  e.preventDefault();
  el.click();
});


/* ═══ INIT ═══ */
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
    await migrateV14();
  } catch (error) {
    console.error('[storage migration] initialization failed', error);
  }
  applyRoutineOverrides();
  await runAutoBackupIfNeeded();
  applyTheme();
  const resolved = resolveDayMode();
  setDayMode(resolved.mode, resolved.sub, false);
  buildHeader();
  buildWeekStrip();
  renderRestTimer();
  renderSoundButtons();
  hydrateNotionWebhookSettings();
  flushNotionWebhookOutbox();
  const savedTab = gls('activeTab');
  if (['gym', 'history', 'daily', 'settings'].includes(savedTab)) switchTabById(savedTab);
});

window.addEventListener('online', flushNotionWebhookOutbox);

/* ═══ PWA ═══ */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
