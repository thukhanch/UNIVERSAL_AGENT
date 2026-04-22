const messageEl = document.getElementById('message');
const typeEl = document.getElementById('type');
const nameEl = document.getElementById('profileName');
const fromEl = document.getElementById('from');
const outputEl = document.getElementById('output');
const sendBtn = document.getElementById('sendBtn');

const scenarios = {
  schedule: 'Oi, quero agendar manicure amanhã',
  cancel: 'Preciso cancelar meu agendamento',
  refund: 'Quero reembolso agora',
  complaint: 'Quero reclamar do atendimento'
};

document.querySelectorAll('[data-scenario]').forEach((button) => {
  button.addEventListener('click', () => {
    messageEl.value = scenarios[button.dataset.scenario];
    typeEl.value = 'text';
  });
});

sendBtn.addEventListener('click', async () => {
  const payload = {
    messageId: `playground-${Date.now()}`,
    from: fromEl.value,
    profileName: nameEl.value,
    timestamp: new Date().toISOString(),
    type: typeEl.value
  };

  if (typeEl.value === 'text') {
    payload.text = { body: messageEl.value };
  } else {
    payload.audio = { id: 'audio-playground' };
  }

  const response = await fetch('http://localhost:3010/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  outputEl.textContent = JSON.stringify(data, null, 2);
});
