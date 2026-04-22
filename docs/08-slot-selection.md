# Node 08 — Slot Selection

## Objetivo

Selecionar e formatar até 3 opções de horário para o cliente.

## Entrada

- lista de slots livres

## Processamento

- ordenar por proximidade
- selecionar no máximo 3 opções
- formatar dia e hora de forma amigável

## Saída

```json
{
  "options": [
    "2026-04-22 10:00",
    "2026-04-22 14:00",
    "2026-04-23 09:30"
  ]
}
```

## Regras críticas

- nunca enviar uma lista excessiva
- se não houver opção na semana, buscar a próxima data disponível

## Dependências externas

- nenhuma, além dos dados do Node 07

## Observações de implementação

Esse node melhora a experiência e deixa o atendimento leve no WhatsApp.
