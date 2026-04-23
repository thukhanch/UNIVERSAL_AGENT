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

## Modos operacionais

### `mock`
- foco em validação local e demonstração
- respostas geradas localmente
- persistência em `app-backend/data/store.json`
- nenhuma dependência de credencial real

### `provider-ready`
- foco em preparar e depois executar a camada de integração real
- requests e payloads são montados no formato esperado pelos providers
- `prepared` só prepara chamadas; `live` executa chamadas HTTP reais
- erros de configuração são retornados de forma explícita
- servidor continua saudável mesmo sem credenciais válidas

## Fluxo de backend atual

1. `routes/` recebe requisições HTTP
2. `lib/schema-validator.js` valida payloads obrigatórios e campos aninhados
3. `services/whatsapp.js` classifica intenção e monta outbound mock ou Meta
4. `services/calendar.js` monta resposta mock ou requests preparados para Google Calendar
5. `services/handoff.js` registra encaminhamento humano
6. `lib/storage.js` persiste conversas, appointments, handoffs e audit logs
7. `lib/guards.js` centraliza checagens de configuração mínima dos providers

## Evolução recomendada

- substituir requests preparados por chamadas autenticadas reais ao Google Calendar
- substituir preparação Meta por envio real via WhatsApp Business API
- persistir conversas em banco real
- validar schemas com engine completa
- externalizar templates para runtime configurável
- adicionar autenticação, observabilidade e tratamento robusto de erros
- proteger rotas administrativas com política de autenticação mais forte que token simples
