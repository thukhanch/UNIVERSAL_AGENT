# Node 14 — Rescheduling

## Objetivo

Trocar um horário já marcado por outro disponível.

## Entrada

- pedido de reagendamento
- `eventId` atual
- serviço atual

## Processamento

- cancelar evento atual
- buscar nova disponibilidade
- repetir seleção de slots
- criar novo evento

## Saída

- novo `eventId`
- novo horário confirmado

## Regras críticas

- evitar perder o contexto do cliente durante a troca
- só encerrar após novo evento confirmado

## Dependências externas

- Google Calendar API
- estado da conversa

## Observações de implementação

Esse node reaproveita os nodes 07, 08, 09 e 10.
