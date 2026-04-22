# Node 13 — Cancellation

## Objetivo

Cancelar um agendamento existente de forma segura.

## Entrada

- pedido de cancelamento do cliente
- `eventId`
- política de cancelamento

## Processamento

- verificar política configurada
- chamar `DELETE /calendars/{calendarId}/events/{eventId}`
- preparar mensagem de confirmação

## Saída

- status de cancelamento

## Regras críticas

- nunca afirmar cancelamento sem sucesso real da API
- manter o tom empático

## Dependências externas

- Google Calendar API

## Observações de implementação

Se houver regras financeiras, esse node pode acionar escalonamento humano.
