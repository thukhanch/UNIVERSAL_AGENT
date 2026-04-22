const config = require('../config');
const { appendLog } = require('../lib/storage');

function classifyIntent(body) {
  const text = (body.text?.body || '').toLowerCase();
  if (text.includes('cancel')) return 'cancel';
  if (text.includes('reag')) return 'reschedule';
  if (text.includes('reembolso') || text.includes('pagamento') || text.includes('cobran')) return 'payment';
  if (text.includes('reclama') || text.includes('procon') || text.includes('advogado')) return 'complaint';
  if (text.includes('agendar') || text.includes('horário') || text.includes('horario')) return 'schedule';
  return 'info';
}

function buildOutbound(body, intent) {
  const name = body.profileName || 'Cliente';

  if (body.type === 'audio') {
    return { provider: config.whatsappProvider, message: 'Oi! Recebi seu áudio, mas no momento só consigo processar mensagens de texto por aqui. Pode me contar o que precisa em texto?' };
  }

  switch (intent) {
    case 'schedule':
      return { provider: config.whatsappProvider, message: `Oi, ${name}! Encontrei estes horários disponíveis: 10h, 14h e 16h. Qual funciona melhor pra você?` };
    case 'cancel':
      return { provider: config.whatsappProvider, message: `Cancelamento confirmado, ${name}. Quando quiser marcar novamente, é só me chamar aqui.` };
    case 'reschedule':
      return { provider: config.whatsappProvider, message: `Claro, ${name}! Vou verificar novos horários para você agora.` };
    case 'payment':
    case 'complaint':
      return { provider: config.whatsappProvider, message: `Entendo sua situação, ${name}. Vou encaminhar você para um atendente humano agora.` };
    default:
      return { provider: config.whatsappProvider, message: `Oi, ${name}! Me conta qual serviço você gostaria de agendar e eu te ajudo com os próximos passos.` };
  }
}

function logInbound(body) {
  appendLog('whatsapp.inbound', { provider: config.whatsappProvider, body });
}

module.exports = { classifyIntent, buildOutbound, logInbound };
