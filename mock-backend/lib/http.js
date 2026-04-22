function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload, null, 2));
}

function ok(data) {
  return { status: 'ok', data };
}

function fail(message, details = null) {
  return { status: 'error', error: { message, details } };
}

module.exports = { sendJson, ok, fail };
