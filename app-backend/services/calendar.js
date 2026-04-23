const config = require('../config');
const { readStore, writeStore, appendLog, appendAppointment } = require('../lib/storage');
const { hasRealCalendarConfig, getCalendarExecutionGuard } = require('../lib/guards');
const { executeJsonRequest } = require('../lib/http-client');

function buildGoogleRequest(action, payload = {}) {
  if (!hasRealCalendarConfig()) {
    return {
      provider: 'google',
      prepared: false,
      executed: false,
      executionMode: config.calendarExecutionMode,
      error: 'Missing GOOGLE_API_KEY or CALENDARIO_ID'
    };
  }

  if (action === 'freebusy') {
    return {
      provider: 'google',
      prepared: true,
      executed: false,
      executionMode: config.calendarExecutionMode,
      method: 'POST',
      url: `${config.googleCalendarBaseUrl}/freeBusy`,
      calendarId: config.calendarId,
      headers: {},
      body: {
        timeMin: payload.timeMin || new Date().toISOString(),
        timeMax: payload.timeMax || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [{ id: config.calendarId }]
      },
      apiKeyPresent: true
    };
  }

  if (action === 'create') {
    return {
      provider: 'google',
      prepared: true,
      executed: false,
      executionMode: config.calendarExecutionMode,
      method: 'POST',
      url: `${config.googleCalendarBaseUrl}/calendars/${config.calendarId}/events`,
      body: payload,
      headers: {},
      apiKeyPresent: true
    };
  }

  if (action === 'cancel') {
    return {
      provider: 'google',
      prepared: true,
      executed: false,
      executionMode: config.calendarExecutionMode,
      method: 'DELETE',
      url: `${config.googleCalendarBaseUrl}/calendars/${config.calendarId}/events/${payload.appointmentId}`,
      headers: {},
      apiKeyPresent: true
    };
  }

  return { provider: 'google', prepared: false, executed: false, executionMode: config.calendarExecutionMode, error: 'Unsupported action' };
}

async function executeGoogleRequest(request, logType) {
  if (!request.prepared) {
    return request;
  }

  const guard = getCalendarExecutionGuard();
  if (!guard.valid) {
    return {
      ...request,
      executed: false,
      error: `Missing ${guard.missing.join(' or ')}`
    };
  }

  if (config.calendarExecutionMode !== 'live') {
    appendLog(logType, request);
    return request;
  }

  try {
    const separator = request.url.includes('?') ? '&' : '?';
    const liveUrl = `${request.url}${separator}key=${encodeURIComponent(config.googleApiKey)}`;
    const remote = await executeJsonRequest({
      method: request.method,
      url: liveUrl,
      headers: request.headers,
      body: request.body || null
    });

    const result = {
      ...request,
      executed: true,
      remoteStatus: remote.statusCode,
      remoteResponse: remote.body
    };

    appendLog(logType, {
      executionMode: config.calendarExecutionMode,
      method: request.method,
      url: request.url,
      remoteStatus: remote.statusCode,
      remoteResponse: remote.body
    });

    if (!remote.ok) {
      result.error = 'Google Calendar API request failed';
    }

    return result;
  } catch (error) {
    appendLog(`${logType}.error`, {
      executionMode: config.calendarExecutionMode,
      method: request.method,
      url: request.url,
      error: error.message
    });

    return {
      ...request,
      executed: true,
      error: error.message
    };
  }
}

async function listBusySlots() {
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('freebusy');
    return executeGoogleRequest(request, 'calendar.google.freebusy');
  }

  return {
    provider: 'mock',
    prepared: false,
    executed: false,
    executionMode: 'mock',
    busy: [
      { start: '2026-04-22T09:00:00-03:00', end: '2026-04-22T10:00:00-03:00' },
      { start: '2026-04-22T15:00:00-03:00', end: '2026-04-22T16:00:00-03:00' }
    ]
  };
}

async function createAppointment(event) {
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('create', event);
    return executeGoogleRequest(request, 'calendar.google.create');
  }

  const appointment = { id: `appt_${Date.now()}`, provider: config.calendarProvider, ...event };
  appendAppointment(appointment);
  appendLog('calendar.create', appointment);
  return appointment;
}

async function cancelAppointment(appointmentId) {
  if (config.calendarProvider === 'google') {
    const request = buildGoogleRequest('cancel', { appointmentId });
    return executeGoogleRequest(request, 'calendar.google.cancel');
  }

  const store = readStore();
  store.appointments = store.appointments.filter((item) => item.id !== appointmentId);
  writeStore(store);
  appendLog('calendar.cancel', { appointmentId });
  return { cancelled: true, appointmentId, provider: config.calendarProvider };
}

module.exports = { listBusySlots, createAppointment, cancelAppointment, buildGoogleRequest, executeGoogleRequest };
