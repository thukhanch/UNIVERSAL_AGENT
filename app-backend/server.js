const http = require('http');
const config = require('./config');
const { sendJson, ok, fail } = require('./lib/http');
const { healthCheck } = require('./routes/health');
const { getMessageCatalog } = require('./routes/messages');
const { handleWhatsAppWebhook } = require('./routes/webhooks');
const { listBusySlots, createAppointment, cancelAppointment } = require('./services/calendar');
const { validateRequired } = require('./lib/schema-validator');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

const { getProviderWarnings } = require('./lib/guards');

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/health') {
      sendJson(res, 200, ok(healthCheck()));
      return;
    }

    if (req.method === 'GET' && req.url === '/messages/catalog') {
      sendJson(res, 200, ok(getMessageCatalog()));
      return;
    }

    if (req.method === 'POST' && req.url === '/webhooks/whatsapp') {
      const body = await parseBody(req);
      const result = await handleWhatsAppWebhook(body);
      if (result.validation && !result.validation.valid) {
        sendJson(res, 400, fail('Invalid WhatsApp webhook payload', result.validation));
        return;
      }
      if (result.response?.error && result.response.executed && result.response.provider === 'meta') {
        sendJson(res, 502, fail(result.response.error, result.response));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    if (req.method === 'GET' && req.url === '/calendar/freebusy') {
      const result = await listBusySlots();
      if (result.error && result.executed) {
        sendJson(res, 502, fail(result.error, result));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    if (req.method === 'POST' && req.url === '/calendar/events') {
      const body = await parseBody(req);
      const validation = validateRequired(body, 'google_calendar_event_create.schema.json');
      if (!validation.valid) {
        sendJson(res, 400, fail('Invalid calendar event payload', validation));
        return;
      }
      const result = await createAppointment(body);
      if (result.error && result.executed) {
        sendJson(res, 502, fail(result.error, result));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/calendar/events/')) {
      const appointmentId = req.url.split('/').pop();
      const result = await cancelAppointment(appointmentId);
      if (result.error && result.executed) {
        sendJson(res, 502, fail(result.error, result));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    sendJson(res, 404, fail('Not found'));
  } catch (error) {
    sendJson(res, 500, fail(error.message));
  }
});

server.listen(config.port, () => {
  console.log(`App backend running on http://localhost:${config.port}`);
  const warnings = getProviderWarnings();
  warnings.forEach((warning) => console.warn(`[provider-warning] ${warning}`));
});
