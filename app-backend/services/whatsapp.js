const config = require('../config');
const { appendLog } = require('../lib/storage');
const { hasRealWhatsAppConfig, getWhatsAppExecutionGuard } = require('../lib/guards');
const { executeJsonRequest } = require('../lib/http-client');

function classifyIntent(body) {
  const text = (body.text?.body || '').toLowerCase();
  if (text.includes('cancel')) return 'cancel';
  if (text.includes('reag')) return 'reschedule';
  if (text.includes('reembolso') || text.includes('pagamento') || text.includes('cobran')) return 'payment';
  if (text.includes('reclama') || text.includes('procon') || text.includes('advogado')) return 'complaint';
  if (text.includes('agendar') || text.includes('horário') || text.includes('horario')) return 'schedule';
  return 'info';
}

function parseInbound(body) {
  return {
    from: body.from,
    profileName: body.profileName || 'Cliente',
    type: body.type,
    text: body.text?.body || ''
  };
}

function buildMessageText(name, intent, type) {
  if (type === 'audio') {
    return 'Oi! Recebi seu áudio, mas no momento só consigo processar mensagens de texto por aqui. Pode me contar o que precisa em texto?';
  }

  switch (intent) {
    case 'schedule':
      return `Oi, ${name}! Encontrei estes horários disponíveis: 10h, 14h e 16h. Qual funciona melhor pra você?`;
    case 'cancel':
      return `Cancelamento confirmado, ${name}. Quando quiser marcar novamente, é só me chamar aqui.`;
    case 'reschedule':
      return `Claro, ${name}! Vou verificar novos horários para você agora.`;
    case 'payment':
    case 'complaint':
      return `Entendo sua situação, ${name}. Vou encaminhar você para um atendente humano agora.`;
    default:
      return `Oi, ${name}! Me conta qual serviço você gostaria de agendar e eu te ajudo com os próximos passos.`;
  }
}

function buildOutbound(body, intent) {
  const inbound = parseInbound(body);
  const message = buildMessageText(inbound.profileName, intent, inbound.type);

  if (config.whatsappProvider === 'meta') {
    if (!hasRealWhatsAppConfig()) {
      return {
        provider: 'meta',
        prepared: false,
        executed: false,
        executionMode: config.whatsappExecutionMode,
        error: 'Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID',
        message
      };
    }

    return {
      provider: 'meta',
      prepared: true,
      executed: false,
      executionMode: config.whatsappExecutionMode,
      endpoint: `https://graph.facebook.com/v21.0/${config.whatsappPhoneNumberId}/messages`,
      payload: {
        messaging_product: 'whatsapp',
        to: inbound.from,
        type: 'text',
        text: {
          body: message
        }
      },
      message
    };
  }

  return { provider: config.whatsappProvider, prepared: false, executed: false, executionMode: 'mock', message };
}

async function sendOutboundMessage(outbound) {
  if (outbound.provider !== 'meta') {
    return outbound;
  }

  if (!outbound.prepared) {
    return outbound;
  }

  const guard = getWhatsAppExecutionGuard();
  if (!guard.valid) {
    return {
      ...outbound,
      executed: false,
      error: `Missing ${guard.missing.join(' or ')}`
    };
  }

  if (config.whatsappExecutionMode !== 'live') {
    return outbound;
  }

  try {
    const remote = await executeJsonRequest({
      method: 'POST',
      url: outbound.endpoint,
      headers: {
        Authorization: `Bearer ${config.whatsappAccessToken}`
      },
      body: outbound.payload
    });

    const result = {
      ...outbound,
      executed: true,
      remoteStatus: remote.statusCode,
      remoteResponse: remote.body
    };

    appendLog('whatsapp.meta.send', {
      executionMode: config.whatsappExecutionMode,
      endpoint: outbound.endpoint,
      remoteStatus: remote.statusCode,
      remoteResponse: remote.body
    });

    if (!remote.ok) {
      result.error = 'Meta API request failed';
    }

    return result;
  } catch (error) {
    appendLog('whatsapp.meta.send.error', {
      executionMode: config.whatsappExecutionMode,
      endpoint: outbound.endpoint,
      error: error.message
    });

    return {
      ...outbound,
      executed: true,
      error: error.message
    };
  }
}

function logInbound(body) {
  appendLog('whatsapp.inbound', { provider: config.whatsappProvider, body });
}

module.exports = { classifyIntent, buildOutbound, sendOutboundMessage, logInbound, parseInbound, buildMessageText };
