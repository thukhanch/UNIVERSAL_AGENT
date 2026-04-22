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
      const result = handleWhatsAppWebhook(body);
      if (result.validation && !result.validation.valid) {
        sendJson(res, 400, fail('Invalid WhatsApp webhook payload', result.validation));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    if (req.method === 'GET' && req.url === '/calendar/freebusy') {
      sendJson(res, 200, ok(listBusySlots()));
      return;
    }

    if (req.method === 'POST' && req.url === '/calendar/events') {
      const body = await parseBody(req);
      const validation = validateRequired(body, 'google_calendar_event_create.schema.json');
      if (!validation.valid) {
        sendJson(res, 400, fail('Invalid calendar event payload', validation));
        return;
      }
      sendJson(res, 200, ok(createAppointment(body)));
      return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/calendar/events/')) {
      const appointmentId = req.url.split('/').pop();
      sendJson(res, 200, ok(cancelAppointment(appointmentId)));
      return;
    }

    sendJson(res, 404, fail('Not found'));
  } catch (error) {
    sendJson(res, 500, fail(error.message));
  }
});

server.listen(config.port, () => {
  console.log(`App backend running on http://localhost:${config.port}`);
});
