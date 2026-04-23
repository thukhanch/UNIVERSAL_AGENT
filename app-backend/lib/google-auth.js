const crypto = require('crypto');
const config = require('../config');
const { executeJsonRequest } = require('./http-client');

let cachedToken = null;
let cachedExpiresAt = 0;

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function normalizePrivateKey(privateKey) {
  return privateKey.replace(/\\n/g, '\n');
}

function buildJwtAssertion() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: config.googleServiceAccountEmail,
    scope: config.googleCalendarScopes,
    aud: config.googleOauthTokenUrl,
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(normalizePrivateKey(config.googleServiceAccountPrivateKey), 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${unsignedToken}.${signature}`;
}

async function getGoogleAccessToken() {
  if (cachedToken && Date.now() < cachedExpiresAt - 60000) {
    return cachedToken;
  }

  const assertion = buildJwtAssertion();
  const response = await executeJsonRequest({
    method: 'POST',
    url: config.googleOauthTokenUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: null,
    timeoutMs: config.httpTimeoutMs,
    formBody: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${encodeURIComponent(assertion)}`
  });

  if (!response.ok || !response.body?.access_token) {
    throw new Error('Failed to obtain Google access token');
  }

  cachedToken = response.body.access_token;
  cachedExpiresAt = Date.now() + ((response.body.expires_in || 3600) * 1000);
  return cachedToken;
}

module.exports = { getGoogleAccessToken, normalizePrivateKey };
