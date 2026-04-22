const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', '..', 'templates');

function listTemplates() {
  return fs.readdirSync(templatesDir).filter((file) => file.endsWith('.md'));
}

module.exports = { listTemplates };
