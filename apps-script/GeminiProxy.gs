/**
 * Gemini Proxy — keeps the API key server-side so it never appears in
 * public app bundles (Google auto-revokes any key found in public code).
 *
 * doPost { model, body } → forwards to generativelanguage generateContent
 * doGet → health check
 *
 * Deploy: Web app · Execute as Me · Anyone
 * NOTE: replace GEMINI_KEY before deploying. The repo copy keeps a placeholder.
 */

var GEMINI_KEY = 'PASTE_KEY_IN_APPS_SCRIPT_EDITOR_ONLY';

function doPost(e) {
  try {
    var req = JSON.parse(e.postData.contents);
    if (!req.model || !req.body) throw new Error('model and body required');
    var resp = UrlFetchApp.fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' +
        encodeURIComponent(req.model) + ':generateContent?key=' + GEMINI_KEY,
      {
        method: 'post',
        contentType: 'application/json',
        // The key is website-restricted; identify as the app origin.
        headers: { Referer: 'https://tduong628.github.io/' },
        payload: JSON.stringify(req.body),
        muteHttpExceptions: true,
      }
    );
    return ContentService.createTextOutput(resp.getContentText())
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: { message: String(err) } }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'gemini-proxy-ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
