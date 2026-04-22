const config = require('../config');
const { readStore, writeStore, appendLog } = require('../lib/storage');

function listBusySlots() {
  if (config.calendarProvider === 'real') {
    appendLog('calendar.real.freebusy.prepared', { calendarId: config.calendarId });
    return { provider: 'real', prepared: true, calendarId: config.calendarId };
  }

  return {
    provider: 'mock',
    busy: [
      { start: '2026-04-22T09:00:00-03:00', end: '2026-04-22T10:00:00-03:00' },
      { start: '2026-04-22T15:00:00-03:00', end: '2026-04-22T16:00:00-03:00' }
    ]
  };
}

function createAppointment(event) {
  const store = readStore();
  const appointment = { id: `appt_${Date.now()}`, provider: config.calendarProvider, ...event };
  store.appointments.push(appointment);
  writeStore(store);
  appendLog('calendar.create', appointment);
  return appointment;
}

function cancelAppointment(appointmentId) {
  const store = readStore();
  store.appointments = store.appointments.filter((item) => item.id !== appointmentId);
  writeStore(store);
  appendLog('calendar.cancel', { appointmentId });
  return { cancelled: true, appointmentId, provider: config.calendarProvider };
}

module.exports = { listBusySlots, createAppointment, cancelAppointment };
