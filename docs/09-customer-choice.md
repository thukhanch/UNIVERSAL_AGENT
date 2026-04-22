# Node 09 — Customer Choice Capture

## Objetivo

Capturar qual opção de horário o cliente escolheu.

## Entrada

- resposta do cliente após a sugestão de horários
- opções previamente enviadas

## Processamento

- interpretar qual opção foi selecionada
- validar que a opção escolhida ainda existe
- se o cliente rejeitar tudo, solicitar nova busca

## Saída

- horário escolhido
- ou retorno para nova consulta

## Regras críticas

- confirmar entendimento antes de criar o evento se houver ambiguidade
- evitar assumir um horário sem confirmação do cliente

## Dependências externas

- estado da conversa

## Observações de implementação

Em automação, este node normalmente depende de persistência de contexto entre mensagens.
