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
- modo provider-ready `prepared` com payloads/requests montados sem chamadas externas
- modo provider-ready `live` com erros claros quando faltar configuração
- modo provider-ready `live` com erro remoto 4xx/5xx normalizado
- modo provider-ready `live` com sucesso remoto registrado em logs
- Google Calendar `live` autenticando por service account
- rota admin protegida por `x-admin-token`

## Fluxos funcionais
- agendamento
- cancelamento
- handoff
- webhook WhatsApp com envio prepared
- webhook WhatsApp com envio live
- calendar freebusy/create/cancel em prepared
- calendar freebusy/create/cancel em live
