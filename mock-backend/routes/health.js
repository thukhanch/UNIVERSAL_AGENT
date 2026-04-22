function healthCheck() {
  return {
    service: 'universal-agent-mock-backend',
    status: 'ok'
  };
}

module.exports = { healthCheck };
