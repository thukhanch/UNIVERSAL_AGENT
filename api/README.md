# API Contracts

Esta pasta reúne contratos documentais dos principais pontos de integração do `UNIVERSAL_AGENT`.

## Objetivo

Padronizar os dados trocados entre:
- WhatsApp
- motor do agente
- Google Calendar
- canal de escalonamento humano

## Arquivos

- `whatsapp_inbound_contract.json`
- `whatsapp_outbound_contract.json`
- `google_calendar_freebusy_contract.json`
- `google_calendar_event_create_contract.json`
- `human_handoff_contract.json`

## Como usar

1. Use os contratos como referência de estrutura.
2. Use a pasta `examples/` para payloads completos.
3. Ajuste nomes de campos conforme sua implementação real, mantendo a semântica.
