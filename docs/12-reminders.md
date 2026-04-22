# Node 12 — Reminder Scheduling

## Objetivo

Programar os lembretes automáticos antes do atendimento.

## Entrada

- data do evento
- horário do evento
- antecedência 1
- antecedência 2
- dados do cliente

## Processamento

- converter antecedências para minutos
- registrar jobs futuros
- preparar payloads de lembrete

## Saída

- lembretes agendados

## Regras críticas

- usar o mesmo fuso do calendário
- evitar lembrete em horário já passado

## Dependências externas

- scheduler, cron, fila ou workflow temporizado

## Observações de implementação

No n8n isso pode ser resolvido com Wait nodes, scheduler ou integração externa de jobs.
