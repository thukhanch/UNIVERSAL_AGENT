# Node 04 — Knowledge Base Lookup

## Objetivo

Consultar a base de conhecimento antes de responder ou sugerir um serviço.

## Entrada

- intenção classificada
- texto original do cliente

## Processamento

- buscar serviço compatível
- buscar resposta factual já cadastrada
- verificar alternativas próximas se o serviço exato não existir

## Saída

- resposta encontrada
- serviço identificado
- ou flag de não resolvido

## Regras críticas

- nunca inventar informação ausente
- se não encontrar resposta em até 2 trocas, encaminhar para humano quando aplicável

## Dependências externas

- FAQ, catálogo, cardápio, portfólio ou base vetorial/documental

## Observações de implementação

Este node é obrigatório antes de responder detalhes sobre serviços, regras ou escopo.
