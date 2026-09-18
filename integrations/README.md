# Notion 자동 기록 연결

1. Google Apps Script 프로젝트를 만들고 `notion-webhook.gs` 내용을 붙여 넣습니다.
2. 프로젝트 설정의 **스크립트 속성**에 `NOTION_TOKEN`을 저장합니다. 선택적으로 `WEBHOOK_SECRET`도 추가합니다.
3. 웹 앱으로 배포합니다. 실행 사용자는 본인, 액세스 권한은 웹훅을 호출할 수 있도록 설정합니다.
4. 발급된 `/exec` URL을 앱의 **설정 → Notion 자동 기록**에 입력합니다. `WEBHOOK_SECRET`을 썼다면 URL 뒤에 `?secret=...`을 붙입니다.
5. **시험 전송**을 눌러 Notion에 테스트 페이지가 생성되는지 확인합니다.

Notion 토큰은 GitHub 저장소나 브라우저에 저장하지 않습니다. 중계기는 완료 이벤트 ID를 보관해 같은 운동이 중복 생성되는 것을 막습니다.
