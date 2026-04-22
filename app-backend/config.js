const path = require('path');

module.exports = {
  port: Number(process.env.PORT || 3020),
  mode: process.env.APP_MODE || 'mock',
  whatsappProvider: process.env.WHATSAPP_PROVIDER || 'mock',
  calendarProvider: process.env.CALENDAR_PROVIDER || 'mock',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || 'replace-me',
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'replace-me',
  googleApiKey: process.env.GOOGLE_API_KEY || 'replace-me',
  calendarId: process.env.CALENDARIO_ID || 'replace-me',
  humanPhone: process.env.TELEFONE_HUMANO || 'replace-me',
  timeZone: process.env.FUSO_HORARIO || 'America/Sao_Paulo',
  businessHours: process.env.HORARIO_FUNCIONAMENTO || 'Segunda a Sexta das 9h às 18h',
  dataFile: path.join(__dirname, 'data', 'store.json')
};
