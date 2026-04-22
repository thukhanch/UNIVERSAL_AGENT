# Node 10 — Create Calendar Event

## Objetivo

Criar o agendamento confirmado no Google Calendar.

## Entrada

- horário escolhido
- nome do cliente
- telefone
- serviço
- duração
- timezone
- lembretes

## Processamento

- montar o corpo do evento
- chamar `POST /calendars/{calendarId}/events`
- registrar o `eventId`

## Saída

```json
{
  "eventId": "abc123",
  "status": "confirmed"
}
```

## Regras críticas

- nunca confirmar ao cliente antes do sucesso da API
- incluir nome, telefone e serviço na descrição

## Dependências externas

- Google Calendar API

## Observações de implementação

Este node é o ponto de comprometimento real do agendamento.
