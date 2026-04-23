const config = require('../config');

function hasRealCalendarConfig() {
  return config.googleApiKey !== 'replace-me' && config.calendarId !== 'replace-me';
}

function hasRealWhatsAppConfig() {
  return config.whatsappAccessToken !== 'replace-me' && config.whatsappPhoneNumberId !== 'replace-me';
}

function getProviderWarnings() {
  const warnings = [];

  if (config.calendarProvider === 'google' && !hasRealCalendarConfig()) {
    warnings.push('Google Calendar provider configurado sem GOOGLE_API_KEY/CALENDARIO_ID válidos.');
  }

  if (config.whatsappProvider === 'meta' && !hasRealWhatsAppConfig()) {
    warnings.push('WhatsApp provider configurado sem WHATSAPP_ACCESS_TOKEN/WHATSAPP_PHONE_NUMBER_ID válidos.');
  }

  return warnings;
}

module.exports = { hasRealCalendarConfig, hasRealWhatsAppConfig, getProviderWarnings };
