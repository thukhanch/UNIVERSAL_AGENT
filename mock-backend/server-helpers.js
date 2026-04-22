const path = require('path');
const { readJson, writeJson } = require('./lib/file-store');

const conversationsPath = path.join(__dirname, 'data', 'mock_conversations.json');

function classifyIntent(body) {
  const text = (body.text?.body || '').toLowerCase();
  if (text.includes('cancel')) return 'cancel';
  if (text.includes('reag')) return 'reschedule';
  if (text.includes('reembolso') || text.includes('pagamento') || text.includes('cobran')) return 'payment';
  if (text.includes('reclama') || text.includes('procon') || text.includes('advogado')) return 'complaint';
  if (text.includes('agendar') || text.includes('horário') || text.includes('horario')) return 'schedule';
  return 'info';
}

function buildResponse(body, intent) {
  const name = body.profileName || 'Cliente';

  if (body.type === 'audio') {
    return { message: 'Oi! Recebi seu áudio, mas no momento só consigo processar mensagens de texto por aqui. Pode me contar o que precisa em texto?' };
  }

  switch (intent) {
    case 'schedule':
      return { message: `Oi, ${name}! Encontrei estes horários disponíveis: 10h, 14h e 16h. Qual funciona melhor pra você?` };
    case 'cancel':
      return { message: `Cancelamento confirmado, ${name}. Quando quiser marcar novamente, é só me chamar aqui.` };
    case 'reschedule':
      return { message: `Claro, ${name}! Vou verificar novos horários para você agora.` };
    case 'payment':
    case 'complaint':
      return { message: `Entendo sua situação, ${name}. Vou encaminhar você para um atendente humano agora.` };
    default:
      return { message: `Oi, ${name}! Me conta qual serviço você gostaria de agendar e eu te ajudo com os próximos passos.` };
  }
}

function saveConversation(body, intent, response) {
  const store = readJson(conversationsPath);
  store.conversations.push({
    at: new Date().toISOString(),
    from: body.from || 'desconhecido',
    intent,
    input: body,
    response
  });
  writeJson(conversationsPath, store);
}

module.exports = { classifyIntent, buildResponse, saveConversation };
