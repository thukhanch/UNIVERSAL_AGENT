const path = require('path');

module.exports = {
  port: Number(process.env.PORT || 3020),
  mode: process.env.APP_MODE || 'mock',
  whatsappProvider: process.env.WHATSAPP_PROVIDER || 'mock',
  calendarProvider: process.env.CALENDAR_PROVIDER || 'mock',
  adminToken: process.env.ADMIN_TOKEN || 'replace-me',
  whatsappExecutionMode: process.env.WHATSAPP_EXECUTION_MODE || 'prepared',
  calendarExecutionMode: process.env.CALENDAR_EXECUTION_MODE || 'prepared',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || 'replace-me',
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'replace-me',
  googleApiKey: process.env.GOOGLE_API_KEY || 'replace-me',
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'replace-me',
  googleServiceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || 'replace-me',
  googleOauthTokenUrl: process.env.GOOGLE_OAUTH_TOKEN_URL || 'https://oauth2.googleapis.com/token',
  googleCalendarScopes: process.env.GOOGLE_CALENDAR_SCOPES || 'https://www.googleapis.com/auth/calendar',
  calendarId: process.env.CALENDARIO_ID || 'replace-me',
  googleCalendarBaseUrl: process.env.GOOGLE_CALENDAR_BASE_URL || 'https://www.googleapis.com/calendar/v3',
  httpTimeoutMs: Number(process.env.HTTP_TIMEOUT_MS || 10000),
  humanPhone: process.env.TELEFONE_HUMANO || 'replace-me',
  timeZone: process.env.FUSO_HORARIO || 'America/Sao_Paulo',
  businessHours: process.env.HORARIO_FUNCIONAMENTO || 'Segunda a Sexta das 9h às 18h',
  dataFile: path.join(__dirname, 'data', 'store.json')
};
