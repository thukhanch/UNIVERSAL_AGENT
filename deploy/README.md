# Deploy Guide

Esta pasta descreve como evoluir o projeto da prototipagem local para uma versão mais próxima de deploy.

## Objetivo

Separar claramente:
- o que já roda localmente
- o que ainda é mock
- o que já está provider-ready
- o que precisa ser substituído por integrações reais

## Itens principais

- `env.example`
- `architecture.md`

## Estado atual

- `mock-backend/`: prototipagem local
- `app-backend/`: backend quase-prod com modos mock e provider-ready
- `playground/`: interface estática de teste
- workflow n8n: base importável, detalhada e versão apontando para app-backend
- integrações reais: estrutura preparada, credenciais ainda não conectadas

## Modos recomendados

### Modo mock
- `APP_MODE=mock`
- `WHATSAPP_PROVIDER=mock`
- `CALENDAR_PROVIDER=mock`

### Modo provider-ready
- `APP_MODE=provider-ready`
- `WHATSAPP_PROVIDER=meta`
- `CALENDAR_PROVIDER=google`

Neste segundo modo, a estrutura fica pronta para integração real, mas ainda depende de credenciais e chamadas externas válidas.
