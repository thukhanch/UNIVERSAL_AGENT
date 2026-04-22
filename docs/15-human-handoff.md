# Node 15 — Human Handoff

## Objetivo

Escalonar conversas sensíveis para atendimento humano.

## Entrada

- histórico da conversa
- motivo do escalonamento
- dados do cliente

## Processamento

- validar se o motivo bate com as regras de handoff
- montar payload com histórico e contexto
- encaminhar para o telefone humano
- pausar o agente

## Saída

- payload de escalonamento
- status da conversa pausada

## Regras críticas

- usar handoff apenas nos casos previstos
- nunca deixar de transferir ameaça legal, cobrança sensível, urgência médica ou reclamação séria

## Dependências externas

- canal interno de atendimento humano
- WhatsApp ou sistema interno de suporte

## Observações de implementação

O handoff deve levar contexto suficiente para o humano não começar do zero.
