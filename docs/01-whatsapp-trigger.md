# Node 01 — WhatsApp Trigger

## Objetivo

Receber a mensagem inicial do cliente e iniciar o workflow.

## Entrada

- número do cliente
- nome do cliente, quando disponível
- texto da mensagem
- id da mensagem
- data e hora do recebimento

## Processamento

- capturar o payload bruto enviado pela WhatsApp Business API
- validar se existe texto utilizável
- anexar metadados mínimos para rastreamento

## Saída

- payload normalizado para o Node 02

## Regras críticas

- se a mensagem não for texto, registrar o tipo e seguir para tratamento adequado
- nunca descartar o número do cliente

## Dependências externas

- WhatsApp Business API webhook

## Observações de implementação

Este node é o ponto de entrada do fluxo. Em n8n, normalmente ele seria um gatilho de webhook ou integração oficial do WhatsApp.
