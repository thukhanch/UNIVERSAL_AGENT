function createHandoff(body) {
  return {
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
}

module.exports = { createHandoff };
