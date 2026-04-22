# Node 16 — Safe Close

## Objetivo

Encerrar a interação com segurança e com o mínimo contexto necessário salvo.

## Entrada

- estado final da conversa
- status do atendimento

## Processamento

- registrar desfecho
- salvar metadados mínimos úteis
- limpar flags temporárias do fluxo

## Saída

- conversa pronta para nova interação futura

## Regras críticas

- não reter dados além do necessário para operação
- manter rastreabilidade do status final

## Dependências externas

- armazenamento de estado ou CRM leve

## Observações de implementação

Esse node reduz retrabalho em contatos futuros e fecha o ciclo do workflow.
