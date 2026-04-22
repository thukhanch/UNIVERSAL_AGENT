const fs = require('fs');
const path = require('path');

const schemaDir = path.join(__dirname, '..', '..', 'schemas');

function loadSchema(fileName) {
  return JSON.parse(fs.readFileSync(path.join(schemaDir, fileName), 'utf8'));
}

function validateRequired(payload, schemaFile) {
  const schema = loadSchema(schemaFile);
  const required = schema.required || [];
  const missing = required.filter((field) => payload[field] === undefined);
  return {
    valid: missing.length === 0,
    missing,
    schema: schema.title || schemaFile
  };
}

module.exports = { validateRequired };
