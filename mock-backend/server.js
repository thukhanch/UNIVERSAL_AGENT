const http = require('http');
const { handleWhatsApp } = require('./routes/whatsapp');
const { getAvailability, createEvent, cancelEvent } = require('./routes/calendar');
const { createHandoff } = require('./routes/handoff');

const PORT = 3010;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'POST' && req.url === '/whatsapp') {
      const body = await parseBody(req);
      const result = handleWhatsApp(body);
      if (result.intent === 'payment' || result.intent === 'complaint') {
        const handoff = createHandoff(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ...result, handoff }, null, 2));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result, null, 2));
      return;
    }

    if (req.method === 'GET' && req.url === '/calendar/freebusy') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ busy: getAvailability() }, null, 2));
      return;
    }

    if (req.method === 'POST' && req.url === '/calendar/events') {
      const body = await parseBody(req);
      const event = createEvent(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(event, null, 2));
      return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/calendar/events/')) {
      const eventId = req.url.split('/').pop();
      const result = cancelEvent(eventId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result, null, 2));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
});
