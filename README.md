# My Routine

헬스장에서 한 손으로 기록할 수 있게 만든 정적 PWA입니다. 오늘 운동, 기록, 데일리, 설정의 4개 탭으로 구성됩니다.

- 오늘 운동: 요일 일정(`WEEK_PLAN`)에 따라 헬스 A/B 또는 수영·홈코어·휴식 카드를 보여줍니다. 세트는 한 줄 입력, 마지막 세트 RIR로 더블 프로그레션 증량을 판정합니다.
- 기록: 이번 주 목표·직접세트·진행 상태, 종목별 추세와 PR, 몸·영양 추세, 최근 기록.
- 데일리: 주간 스케줄, 칼로리·매크로, 체중·영양 기록, 하체 재도입 트래커.

## 구조

```text
index.html
css/style.css
js/app.js
js/completion-sync.js
js/progression.js
js/storage-migration.js
integrations/notion-webhook.gs
```

## 배포

1. 저장소 루트에 위 파일/폴더를 그대로 업로드합니다.
2. GitHub Settings > Pages에서 Branch를 main, Folder를 /root로 설정합니다.
3. 생성된 GitHub Pages URL로 접속합니다.

## 보안

- 브라우저 코드에는 API 키가 없습니다.
- 운동 기록은 먼저 브라우저 `localStorage`에 저장됩니다.
- Notion 연동을 켜면 설정한 HTTPS 중계 웹훅으로 루틴 완료 요약 1건을 전송합니다. 중계기의 `WEBHOOK_SECRET`은 설정 탭에 입력하면 `?secret=`으로 붙여 보냅니다(기기에만 저장).
- Notion 토큰은 Google Apps Script의 스크립트 속성에만 저장합니다.

Notion 연결 방법은 [integrations/README.md](integrations/README.md)를 참고하세요.
```
