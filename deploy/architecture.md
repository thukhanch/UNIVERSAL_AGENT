# Architecture

## Camadas atuais

1. `prompts/`
   - comportamento do agente
2. `docs/`, `mapping/`, `templates/`
   - documentação operacional
3. `schemas/`, `api/`, `examples/`
   - contratos e validação
4. `json/`
   - workflow n8n
5. `mock-backend/`
   - API local de prototipagem
6. `playground/`
   - interface simples para teste manual

## Evolução recomendada

- substituir mock de agenda por Google Calendar real
- substituir rota WhatsApp por webhook oficial
- persistir conversas em banco
- validar schemas com engine completa
- externalizar templates para runtime configurável
