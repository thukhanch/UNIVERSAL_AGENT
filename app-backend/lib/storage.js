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

function appendConversation(entry) {
  const store = readStore();
  store.conversations.push(entry);
  writeStore(store);
}

function appendAppointment(entry) {
  const store = readStore();
  store.appointments.push(entry);
  writeStore(store);
}

function appendHandoff(entry) {
  const store = readStore();
  store.handoffs.push(entry);
  writeStore(store);
}

module.exports = { readStore, writeStore, appendLog, appendConversation, appendAppointment, appendHandoff };
