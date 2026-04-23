# Validation Checklist

## WhatsApp inbound
- payload válido com `text.body`
- payload inválido sem `messageId`
- payload inválido sem `timestamp`
- payload de áudio com `audio.id`
- payload de áudio inválido sem `audio.id`

## Calendar event create
- payload válido com `summary`, `start`, `end`, `description`
- payload inválido sem `start.dateTime`
- payload inválido sem `end.timeZone`

## Human handoff
- payload válido com `customer.name`, `customer.phone` e `conversationHistory`
- payload inválido sem `conversationHistory`

## Configuração
- modo mock funcional sem credenciais reais
- modo provider-ready com erros claros quando faltar configuração

## Fluxos funcionais
- agendamento
- cancelamento
- handoff
