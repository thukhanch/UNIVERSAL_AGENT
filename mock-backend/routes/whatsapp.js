const { classifyIntent, buildResponse, saveConversation } = require('../server-helpers');
const { validateRequired } = require('../lib/schema-validator');

function handleWhatsApp(body) {
  const validation = validateRequired(body, 'whatsapp_inbound.schema.json');
  if (!validation.valid) {
    return {
      validation,
      intent: null,
      response: null
    };
  }

  const intent = classifyIntent(body);
  const response = buildResponse(body, intent);
  saveConversation(body, intent, response);
  return { validation, intent, response };
}

module.exports = { handleWhatsApp };
