const config = require('../config');
const { fail } = require('../lib/http');
const { appendLog } = require('../lib/storage');
const { listBusySlots } = require('../services/calendar');
const { sendOutboundMessage } = require('../services/whatsapp');

function isAuthorized(req) {
  return req.headers['x-admin-token'] && req.headers['x-admin-token'] === config.adminToken;
}

async function handleAdminSmokeTest(req, body) {
  if (!isAuthorized(req)) {
    return { statusCode: 403, payload: fail('Forbidden') };
  }

  if (body.provider === 'calendar') {
    const result = await listBusySlots();
    appendLog('admin.smoke_test', { provider: 'calendar', executionMode: config.calendarExecutionMode, executed: result.executed });
    return { statusCode: result.error && result.executed ? 502 : 200, payload: result.error && result.executed ? fail(result.error, result) : { status: 'ok', data: result } };
  }

  if (body.provider === 'whatsapp') {
    if (!body.payload?.to || !body.payload?.text?.body) {
      return { statusCode: 400, payload: fail('Missing test WhatsApp payload', { required: ['payload.to', 'payload.text.body'] }) };
    }

    const result = await sendOutboundMessage({
      provider: 'meta',
      prepared: true,
      executed: false,
      executionMode: config.whatsappExecutionMode,
      endpoint: `https://graph.facebook.com/v21.0/${config.whatsappPhoneNumberId}/messages`,
      payload: {
        messaging_product: 'whatsapp',
        to: body.payload.to,
        type: 'text',
        text: {
          body: body.payload.text.body
        }
      },
      message: body.payload.text.body
    });

    appendLog('admin.smoke_test', { provider: 'whatsapp', executionMode: config.whatsappExecutionMode, executed: result.executed });
    return { statusCode: result.error && result.executed ? 502 : 200, payload: result.error && result.executed ? fail(result.error, result) : { status: 'ok', data: result } };
  }

  return { statusCode: 400, payload: fail('Unsupported provider', { provider: body.provider }) };
}

module.exports = { handleAdminSmokeTest };
