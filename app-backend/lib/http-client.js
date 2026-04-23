const https = require('https');
const http = require('http');
const { URL } = require('url');
const config = require('../config');

function parseJsonSafely(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function executeJsonRequest({ method = 'GET', url, headers = {}, body = null, timeoutMs = config.httpTimeoutMs, formBody = null }) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const transport = target.protocol === 'https:' ? https : http;
    const payload = body ? JSON.stringify(body) : formBody;

    const request = transport.request({
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || undefined,
      path: `${target.pathname}${target.search}`,
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(formBody ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...headers
      }
    }, (response) => {
      let raw = '';
      response.on('data', (chunk) => { raw += chunk; });
      response.on('end', () => {
        const json = parseJsonSafely(raw);
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          statusCode: response.statusCode,
          headers: response.headers,
          body: json || raw || null
        });
      });
    });

    request.setTimeout(timeoutMs, () => {
      request.destroy(new Error(`Request timeout after ${timeoutMs}ms`));
    });

    request.on('error', (error) => {
      reject(error);
    });

    if (payload) request.write(payload);
    request.end();
  });
}

module.exports = { executeJsonRequest };
