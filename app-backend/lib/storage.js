const fs = require('fs');
const config = require('../config');

function readStore() {
  return JSON.parse(fs.readFileSync(config.dataFile, 'utf8'));
}

function writeStore(data) {
  fs.writeFileSync(config.dataFile, JSON.stringify(data, null, 2));
}

function appendLog(type, payload) {
  const store = readStore();
  store.auditLogs.push({ at: new Date().toISOString(), type, payload });
  writeStore(store);
}

module.exports = { readStore, writeStore, appendLog };
