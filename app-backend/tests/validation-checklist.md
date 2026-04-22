# Validation Checklist

## WhatsApp inbound
- payload válido com `text.body`
- payload inválido sem `messageId`
- payload inválido sem `timestamp`
- payload de áudio

## Calendar event create
- payload válido com `summary`, `start`, `end`, `description`
- payload inválido sem `start.dateTime`
- payload inválido sem `end.timeZone`

## Fluxos funcionais
- agendamento
- cancelamento
- handoff
