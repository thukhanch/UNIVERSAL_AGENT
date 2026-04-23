const config = require('../config');
const { readStore, writeStore, appendLog, appendAppointment } = require('../lib/storage');
const { hasRealCalendarConfig } = require('../lib/guards');

function buildGoogleRequest(action, payload = {}) {
  if (!hasRealCalendarConfig()) {
    return {
      provider: 'google',
      prepared: false,
      error: 'Missing GOOGLE_API_KEY or CALENDARIO_ID'
    };
  }

  if (action === 'freebusy') {
    return {
      provider: 'google',
      prepared: true,
      method: 'POST',
      url: 'https://www.googleapis.com/calendar/v3/freeBusy',
      calendarId: config.calendarId,
      apiKeyPresent: true
    };
  }

  if (action === 'create') {
    return {
      provider: 'google',
      prepared: true,
      method: 'POST',
      url: `https://www.googleapis.com/calendar/v3/calendars/${config.calendarId}/events`,
      body: payload,
      apiKeyPresent: true
    };
  }

  if (action === 'cancel') {
    return {
      provider: 'google',
      prepared: true,
      method: 'DELETE',
      url: `https://www.googleapis.com/calendar/v3/calendars/${config.calendarId}/events/${payload.appointmentId}`,
      apiKeyPresent: true
    };
  }

  return { provider: 'google', prepared: false, error: 'Unsupported action' };
}

function listBusySlots() {
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('freebusy');
    appendLog('calendar.google.freebusy.prepared', request);
    return request;
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
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('create', event);
    appendLog('calendar.google.create.prepared', request);
    return request;
  }

  const appointment = { id: `appt_${Date.now()}`, provider: config.calendarProvider, ...event };
  appendAppointment(appointment);
  appendLog('calendar.create', appointment);
  return appointment;
}

function cancelAppointment(appointmentId) {
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('cancel', { appointmentId });
    appendLog('calendar.google.cancel.prepared', request);
    return request;
  }

  const store = readStore();
  store.appointments = store.appointments.filter((item) => item.id !== appointmentId);
  writeStore(store);
  appendLog('calendar.cancel', { appointmentId });
  return { cancelled: true, appointmentId, provider: config.calendarProvider };
}

module.exports = { listBusySlots, createAppointment, cancelAppointment, buildGoogleRequest };
