# Mock Backend

Backend simples para testar o fluxo do `UNIVERSAL_AGENT` ponta a ponta sem depender de integrações reais.

## O que ele simula

- recebimento de mensagem WhatsApp
- classificação simples de intenção
- respostas básicas por cenário
- consulta de agenda mock
- criação de evento mock
- cancelamento de evento mock
- handoff humano mock

## Como executar

```bash
cd mock-backend
npm start
```

Servidor padrão:
- `http://localhost:3010`

## Endpoints

- `POST /whatsapp`
- `GET /calendar/freebusy`
- `POST /calendar/events`
- `DELETE /calendar/events/:eventId`

## Cenários mínimos para testar

### Agendamento
Envie um payload com texto contendo `agendar` ou `horário`.

### Cancelamento
Envie um payload com texto contendo `cancel`.

### Handoff
Envie um payload com texto contendo `pagamento`, `reembolso`, `reclamação`, `Procon` ou `advogado`.

## Observação

Este backend é propositalmente simples e serve como camada de prototipagem local.
