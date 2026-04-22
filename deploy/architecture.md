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
6. `app-backend/`
   - backend quase-prod com modos mock e provider-ready
7. `playground/`
   - interface simples para teste manual
8. `deploy/`
   - documentação de evolução de ambiente

## Evolução recomendada

- substituir provider mock de agenda por Google Calendar real
- substituir provider mock de WhatsApp por webhook oficial Meta
- persistir conversas em banco real
- validar schemas com engine completa
- externalizar templates para runtime configurável
- adicionar autenticação, observabilidade e tratamento robusto de erros
