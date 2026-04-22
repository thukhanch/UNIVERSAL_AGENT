const { classifyIntent, buildResponse, saveConversation } = require('../server-helpers');

function handleWhatsApp(body) {
  const intent = classifyIntent(body);
  const response = buildResponse(body, intent);
  saveConversation(body, intent, response);
  return { intent, response };
}

module.exports = { handleWhatsApp };
