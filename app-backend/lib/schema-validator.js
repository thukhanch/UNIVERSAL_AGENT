const fs = require('fs');
const path = require('path');

const schemasDir = path.join(__dirname, '..', '..', 'schemas');

function loadSchema(fileName) {
  return JSON.parse(fs.readFileSync(path.join(schemasDir, fileName), 'utf8'));
}

function validateRequired(payload, schemaFile) {
  const schema = loadSchema(schemaFile);
  const missing = (schema.required || []).filter((field) => payload[field] === undefined);
  const nestedErrors = [];

  if (schemaFile === 'whatsapp_inbound.schema.json' && payload.type === 'text' && !payload.text?.body) {
    nestedErrors.push('text.body');
  }

  if (schemaFile === 'google_calendar_event_create.schema.json') {
    if (!payload.start?.dateTime) nestedErrors.push('start.dateTime');
    if (!payload.start?.timeZone) nestedErrors.push('start.timeZone');
    if (!payload.end?.dateTime) nestedErrors.push('end.dateTime');
    if (!payload.end?.timeZone) nestedErrors.push('end.timeZone');
  }

  return {
    valid: missing.length === 0 && nestedErrors.length === 0,
    missing,
    nestedErrors,
    schema: schema.title || schemaFile
  };
}

module.exports = { validateRequired };
