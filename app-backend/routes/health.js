const config = require('../config');

function healthCheck() {
  return {
    service: 'universal-agent-app-backend',
    status: 'ok',
    mode: config.mode,
    whatsappProvider: config.whatsappProvider,
    calendarProvider: config.calendarProvider
  };
}

module.exports = { healthCheck };
