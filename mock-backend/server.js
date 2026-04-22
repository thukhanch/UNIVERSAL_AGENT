const http = require('http');
const { handleWhatsApp } = require('./routes/whatsapp');
const { getAvailability, createEvent, cancelEvent } = require('./routes/calendar');
const { createHandoff } = require('./routes/handoff');
const { healthCheck } = require('./routes/health');
const { listTemplates } = require('./routes/templates');
const { sendJson, ok, fail } = require('./lib/http');
const { validateRequired } = require('./lib/schema-validator');

const PORT = 3010;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
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

    if (req.method === 'GET' && req.url === '/templates') {
      sendJson(res, 200, ok({ templates: listTemplates() }));
      return;
    }

    if (req.method === 'POST' && req.url === '/validate/whatsapp-inbound') {
      const body = await parseBody(req);
      const validation = validateRequired(body, 'whatsapp_inbound.schema.json');
      sendJson(res, validation.valid ? 200 : 400, validation.valid ? ok(validation) : fail('Schema validation failed', validation));
      return;
    }

    if (req.method === 'POST' && req.url === '/whatsapp') {
      const body = await parseBody(req);
      const result = handleWhatsApp(body);
      if (result.validation && !result.validation.valid) {
        sendJson(res, 400, fail('Invalid WhatsApp inbound payload', result.validation));
        return;
      }
      if (result.intent === 'payment' || result.intent === 'complaint') {
        const handoff = createHandoff(body);
        sendJson(res, 200, ok({ ...result, handoff }));
        return;
      }
      sendJson(res, 200, ok(result));
      return;
    }

    if (req.method === 'GET' && req.url === '/calendar/freebusy') {
      sendJson(res, 200, ok({ busy: getAvailability() }));
      return;
    }

    if (req.method === 'POST' && req.url === '/calendar/events') {
      const body = await parseBody(req);
      const validation = validateRequired(body, 'google_calendar_event_create.schema.json');
      if (!validation.valid) {
        sendJson(res, 400, fail('Invalid event payload', validation));
        return;
      }
      const event = createEvent(body);
      sendJson(res, 200, ok(event));
      return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/calendar/events/')) {
      const eventId = req.url.split('/').pop();
      const result = cancelEvent(eventId);
      sendJson(res, 200, ok(result));
      return;
    }

    sendJson(res, 404, fail('Not found'));
  } catch (error) {
    sendJson(res, 500, fail(error.message));
  }
});

server.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
});
