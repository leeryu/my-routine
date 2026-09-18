/**
 * Google Apps Script → Notion 중계기
 *
 * Script Properties에 아래 값을 저장한다.
 * - NOTION_TOKEN: Notion Personal Access Token (필수)
 * - WEBHOOK_SECRET: 임의의 긴 문자열 (권장)
 *
 * 웹 앱으로 배포한 뒤 URL 끝에 ?secret=WEBHOOK_SECRET 을 붙여
 * 내 루틴 앱의 Notion 중계 웹훅 URL에 입력한다.
 */
function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('NOTION_TOKEN');
    var expectedSecret = props.getProperty('WEBHOOK_SECRET');
    if (!token) throw new Error('NOTION_TOKEN is not configured');
    if (expectedSecret && (!e || !e.parameter || e.parameter.secret !== expectedSecret))
      throw new Error('invalid webhook secret');

    var event = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!event.eventId || !event.notion || !event.notion.markdown)
      throw new Error('invalid workout payload');

    var lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      var delivered = JSON.parse(props.getProperty('DELIVERED_EVENT_IDS') || '[]');
      if (delivered.indexOf(event.eventId) >= 0)
        return jsonResponse_({ ok: true, duplicate: true, eventId: event.eventId });

      var request = {
        method: 'post',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + token,
          'Notion-Version': '2026-03-11',
        },
        muteHttpExceptions: true,
        payload: JSON.stringify({
          icon: { emoji: '🏋️' },
          markdown: event.notion.markdown,
        }),
      };
      var response = fetchNotionWithRetry_(request);
      var status = response.getResponseCode();
      var body = JSON.parse(response.getContentText() || '{}');
      if (status < 200 || status >= 300)
        throw new Error('Notion ' + status + ': ' + (body.message || response.getContentText()));

      delivered.push(event.eventId);
      props.setProperty('DELIVERED_EVENT_IDS', JSON.stringify(delivered.slice(-100)));
      return jsonResponse_({ ok: true, eventId: event.eventId, notionUrl: body.url || null });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

function fetchNotionWithRetry_(request) {
  var response;
  for (var attempt = 0; attempt < 4; attempt++) {
    response = UrlFetchApp.fetch('https://api.notion.com/v1/pages', request);
    var status = response.getResponseCode();
    if (status !== 429 && status !== 529) return response;
    var headers = response.getAllHeaders();
    var retryAfter = Number(headers['Retry-After'] || headers['retry-after']);
    var seconds = retryAfter > 0 ? retryAfter : Math.min(Math.pow(2, attempt), 30);
    Utilities.sleep(seconds * 1000 + Math.floor(Math.random() * 250));
  }
  return response;
}

function jsonResponse_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
