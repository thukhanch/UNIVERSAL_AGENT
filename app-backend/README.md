# App Backend

Backend mais próximo de produção para o `UNIVERSAL_AGENT`, separado do `mock-backend` para preservar a camada de prototipagem.

## Modos

- `APP_MODE=mock`
- `APP_MODE=provider-ready`

## Providers

- `WHATSAPP_PROVIDER=mock|meta`
- `CALENDAR_PROVIDER=mock|google`

## Execution mode

- `WHATSAPP_EXECUTION_MODE=prepared|live`
- `CALENDAR_EXECUTION_MODE=prepared|live`

`prepared` monta payloads e requests sem disparar chamadas externas.
`live` executa as chamadas HTTP reais para os providers configurados.

## Objetivo

Oferecer uma estrutura organizada para migrar gradualmente do modo local para integrações reais, sem perder a capacidade de teste local.

## Observações operacionais

- `mock` continua sendo o modo de validação local.
- `provider-ready` agora pode operar em `prepared` ou `live`.
- `prepared` preserva a validação sem chamar providers externos.
- `live` usa as mesmas rotas do backend e executa as chamadas HTTP reais.
- no Google Calendar, o modo `live` recomendado usa service account.
- o smoke test administrativo protegido usa `POST /admin/providers/smoke-test` com `x-admin-token`.

## Endpoints esperados

- `GET /health`
- `GET /messages/catalog`
- `POST /admin/providers/smoke-test`
- `POST /webhooks/whatsapp`
- `GET /calendar/freebusy`
- `POST /calendar/events`
- `DELETE /calendar/events/:appointmentId`
