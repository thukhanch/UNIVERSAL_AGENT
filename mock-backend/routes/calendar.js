const path = require('path');
const { readJson, writeJson } = require('../lib/file-store');

const calendarPath = path.join(__dirname, '..', 'data', 'mock_calendar.json');

function readCalendar() {
  return readJson(calendarPath);
}

function writeCalendar(data) {
  writeJson(calendarPath, data);
}

function getAvailability() {
  const calendar = readCalendar();
  return calendar.busy;
}

function createEvent(event) {
  const calendar = readCalendar();
  const newEvent = { id: `evt_${Date.now()}`, ...event };
  calendar.events.push(newEvent);
  writeCalendar(calendar);
  return newEvent;
}

function cancelEvent(eventId) {
  const calendar = readCalendar();
  calendar.events = calendar.events.filter((event) => event.id !== eventId);
  writeCalendar(calendar);
  return { cancelled: true, eventId };
}

module.exports = { getAvailability, createEvent, cancelEvent };
