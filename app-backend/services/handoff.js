const config = require('../config');
const { readStore, writeStore, appendLog } = require('../lib/storage');

function createHandoff(body) {
  const store = readStore();
  const handoff = {
    id: `handoff_${Date.now()}`,
    target: config.humanPhone,
    customer: {
      name: body.profileName || 'Cliente',
      phone: body.from || 'desconhecido'
    },
    reason: 'human_handoff',
    conversationHistory: [
      {
        from: 'customer',
        text: body.text?.body || ''
      }
    ],
    currentStatus: 'paused_for_human'
  };
  store.handoffs.push(handoff);
  writeStore(store);
  appendLog('handoff.create', handoff);
  return handoff;
}

module.exports = { createHandoff };
