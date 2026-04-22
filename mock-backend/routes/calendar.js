const fs = require('fs');
const path = require('path');

const calendarPath = path.join(__dirname, '..', 'data', 'mock_calendar.json');

function readCalendar() {
  return JSON.parse(fs.readFileSync(calendarPath, 'utf8'));
}

function writeCalendar(data) {
  fs.writeFileSync(calendarPath, JSON.stringify(data, null, 2));
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
