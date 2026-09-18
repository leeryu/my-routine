# My Routine

초보자가 헬스장에서 한 손으로 기록할 수 있게 만든 정적 PWA입니다. 오늘 운동, 기록, 설정의 3개 탭으로 구성됩니다.

## 구조

```text
index.html
css/style.css
js/app.js
js/completion-sync.js
integrations/notion-webhook.gs
```

## 배포

1. 저장소 루트에 위 파일/폴더를 그대로 업로드합니다.
2. GitHub Settings > Pages에서 Branch를 main, Folder를 /root로 설정합니다.
3. 생성된 GitHub Pages URL로 접속합니다.

## 보안

- 브라우저 코드에는 API 키가 없습니다.
- 운동 기록은 먼저 브라우저 `localStorage`에 저장됩니다.
- Notion 연동을 켜면 설정한 HTTPS 중계 웹훅으로 완료 기록을 전송합니다.
- Notion 토큰은 Google Apps Script의 스크립트 속성에만 저장합니다.

Notion 연결 방법은 [integrations/README.md](integrations/README.md)를 참고하세요.
```
