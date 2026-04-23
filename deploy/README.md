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
- workflow n8n: base importável, detalhada, versão apontando para `app-backend` e versão provider-ready
- integrações reais: estrutura preparada, credenciais ainda não conectadas

## Modos recomendados

### Modo mock
- `APP_MODE=mock`
- `WHATSAPP_PROVIDER=mock`
- `CALENDAR_PROVIDER=mock`

Esse modo mantém tudo funcional localmente, grava logs no `store.json` e permite validar os fluxos de agendamento, cancelamento e handoff sem dependências externas.

### Modo provider-ready
- `APP_MODE=provider-ready`
- `WHATSAPP_PROVIDER=meta`
- `CALENDAR_PROVIDER=google`

Nesse modo, o backend continua operacional, mas passa a montar requests e payloads prontos para provider real. Quando faltar configuração, o retorno deve ser explícito, sem derrubar o servidor.

## Variáveis mínimas para provider-ready

Para WhatsApp Meta:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

Para Google Calendar:
- `GOOGLE_API_KEY`
- `CALENDARIO_ID`

Para operação geral:
- `TELEFONE_HUMANO`
- `FUSO_HORARIO`
- `HORARIO_FUNCIONAMENTO`
- `ADMIN_TOKEN`

## O que já está pronto

- validação estrutural de payloads com checagem de campos aninhados
- preparação de payload outbound para Meta
- preparação de requests de freebusy, criação e cancelamento para Google Calendar
- armazenamento local de conversas, handoffs, appointments e audit logs
- mensagens de erro claras quando providers reais estão selecionados sem credenciais válidas

## O que ainda falta para produção real

- autenticação real com providers externos
- persistência em banco de dados
- secrets manager em vez de placeholders locais
- observabilidade externa
- deploy em ambiente hospedado com HTTPS e webhook público
- política real de autenticação para rotas administrativas

## Sequência recomendada

1. Rodar `app-backend` em `mock`
2. Validar `/health`, webhook WhatsApp e calendário
3. Trocar para `provider-ready`
4. Confirmar mensagens claras de configuração ausente
5. Inserir credenciais reais
6. Substituir requests preparados por chamadas autenticadas reais
7. Publicar webhook externo e ajustar workflow n8n
