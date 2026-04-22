const { listTemplates } = require('../lib/templates');

function getMessageCatalog() {
  return {
    templates: listTemplates()
  };
}

module.exports = { getMessageCatalog };
