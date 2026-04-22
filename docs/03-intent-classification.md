# Node 03 — Intent Classification

## Objetivo

Identificar a intenção principal do cliente.

## Entrada

- contexto normalizado do Node 02

## Processamento

Classificar a mensagem em uma das rotas principais:
- informação
- agendamento
- cancelamento
- reagendamento
- reclamação
- pagamento
- fora de escopo

## Saída

```json
{
  "intent": "schedule",
  "confidence": 0.92,
  "rawText": "Quero marcar uma escova amanhã"
}
```

## Regras críticas

- se houver ambiguidade, pedir esclarecimento ao cliente
- reclamação e cobrança devem ser tratadas como potenciais gatilhos de escalonamento

## Dependências externas

- classificador simples, regras heurísticas ou LLM

## Observações de implementação

Em um fluxo estilo n8n, esse node pode ser um switch com regras ou um node de IA para classificação.
