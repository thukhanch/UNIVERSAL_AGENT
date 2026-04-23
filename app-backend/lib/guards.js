const config = require('../config');

function hasRealCalendarConfig() {
  return config.googleApiKey !== 'replace-me' && config.calendarId !== 'replace-me';
}

function hasRealWhatsAppConfig() {
  return config.whatsappAccessToken !== 'replace-me' && config.whatsappPhoneNumberId !== 'replace-me';
}

function getWhatsAppExecutionGuard() {
  if (config.whatsappProvider !== 'meta') {
    return { valid: true, missing: [], mode: config.whatsappExecutionMode };
  }

  if (config.whatsappExecutionMode !== 'live') {
    return { valid: true, missing: [], mode: config.whatsappExecutionMode };
  }

  const missing = [];
  if (!hasRealWhatsAppConfig()) {
    if (config.whatsappAccessToken === 'replace-me') missing.push('WHATSAPP_ACCESS_TOKEN');
    if (config.whatsappPhoneNumberId === 'replace-me') missing.push('WHATSAPP_PHONE_NUMBER_ID');
  }

  return { valid: missing.length === 0, missing, mode: config.whatsappExecutionMode };
}

function getCalendarExecutionGuard() {
  if (config.calendarProvider !== 'google') {
    return { valid: true, missing: [], mode: config.calendarExecutionMode };
  }

  if (config.calendarExecutionMode !== 'live') {
    return { valid: true, missing: [], mode: config.calendarExecutionMode };
  }

  const missing = [];
  if (config.googleApiKey === 'replace-me') missing.push('GOOGLE_API_KEY');
  if (config.calendarId === 'replace-me') missing.push('CALENDARIO_ID');

  return { valid: missing.length === 0, missing, mode: config.calendarExecutionMode };
}

function getProviderWarnings() {
  const warnings = [];

  if (config.calendarProvider === 'google' && !hasRealCalendarConfig()) {
    warnings.push('Google Calendar provider configurado sem GOOGLE_API_KEY/CALENDARIO_ID válidos.');
  }

  if (config.whatsappProvider === 'meta' && !hasRealWhatsAppConfig()) {
    warnings.push('WhatsApp provider configurado sem WHATSAPP_ACCESS_TOKEN/WHATSAPP_PHONE_NUMBER_ID válidos.');
  }

  const whatsappGuard = getWhatsAppExecutionGuard();
  if (!whatsappGuard.valid) {
    warnings.push(`WhatsApp live requer: ${whatsappGuard.missing.join(', ')}.`);
  }

  const calendarGuard = getCalendarExecutionGuard();
  if (!calendarGuard.valid) {
    warnings.push(`Google Calendar live requer: ${calendarGuard.missing.join(', ')}.`);
  }

  return warnings;
}

module.exports = {
  hasRealCalendarConfig,
  hasRealWhatsAppConfig,
  getWhatsAppExecutionGuard,
  getCalendarExecutionGuard,
  getProviderWarnings
};
