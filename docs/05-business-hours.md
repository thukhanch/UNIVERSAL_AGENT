# Node 05 — Business Hours Check

## Objetivo

Verificar se a conversa está ocorrendo dentro do horário operacional.

## Entrada

- timestamp da mensagem
- configuração `HORARIO_FUNCIONAMENTO`
- configuração `FUSO_HORARIO`

## Processamento

- converter horário para o fuso configurado
- comparar com a janela de atendimento

## Saída

```json
{
  "isOpen": true,
  "currentLocalTime": "2026-04-21T15:00:00-03:00"
}
```

## Regras críticas

- se estiver fora do horário, responder com mensagem apropriada
- não bloquear a captura do lead, apenas pausar o atendimento ativo

## Dependências externas

- biblioteca de data/hora ou função de timezone

## Observações de implementação

Este node pode ser executado logo após a classificação ou antes de responder qualquer ação operacional.
