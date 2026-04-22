# Schemas

Esta pasta reúne versões em JSON Schema dos contratos principais do `UNIVERSAL_AGENT`.

## Objetivo

Permitir validação estrutural de payloads usados por:
- WhatsApp inbound
- WhatsApp outbound
- Google Calendar freebusy
- criação de evento
- handoff humano

## Relação com outras pastas

- `api/`: contratos documentais
- `examples/`: exemplos completos de payload
- `schemas/`: validação formal da estrutura

## Como usar

1. Consulte o contrato correspondente em `api/`.
2. Compare com o exemplo equivalente em `examples/`.
3. Valide o payload usando o schema desta pasta.
