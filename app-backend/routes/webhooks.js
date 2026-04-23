const { validateRequired } = require('../lib/schema-validator');
const { appendLog, appendConversation } = require('../lib/storage');
const { classifyIntent, buildOutbound, logInbound } = require('../services/whatsapp');
const { createHandoff } = require('../services/handoff');

function handleWhatsAppWebhook(body) {
  const validation = validateRequired(body, 'whatsapp_inbound.schema.json');
  if (!validation.valid) {
    return { validation, intent: null, response: null };
  }

  logInbound(body);
  const intent = classifyIntent(body);
  const response = buildOutbound(body, intent);

  appendConversation({
    at: new Date().toISOString(),
    from: body.from || 'desconhecido',
    intent,
    input: body,
    response
  });
  appendLog('conversation.save', { from: body.from || 'desconhecido', intent });

  if (intent === 'payment' || intent === 'complaint') {
    return { validation, intent, response, handoff: createHandoff(body) };
  }

  return { validation, intent, response };
}

module.exports = { handleWhatsAppWebhook };
