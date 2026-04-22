# App Backend

Backend mais próximo de produção para o `UNIVERSAL_AGENT`, separado do `mock-backend` para preservar a camada de prototipagem.

## Modos

- `APP_MODE=mock`
- `APP_MODE=provider-ready`

## Providers

- `WHATSAPP_PROVIDER=mock|meta`
- `CALENDAR_PROVIDER=mock|google`

## Objetivo

Oferecer uma estrutura organizada para migrar gradualmente do modo local para integrações reais, sem perder a capacidade de teste local.

## Endpoints esperados

- `GET /health`
- `GET /messages/catalog`
- `POST /webhooks/whatsapp`
- `GET /calendar/freebusy`
- `POST /calendar/events`
- `DELETE /calendar/events/:appointmentId`
