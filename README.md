# UNIVERSAL_AGENT

Agente universal de atendimento via WhatsApp com organização em estilo n8n, pensado para funcionar em fluxo por etapas, como se cada etapa fosse um node.

## Visão geral

Este repositório contém um kit completo para desenhar, documentar e implementar um agente universal de atendimento com:
- WhatsApp Business API
- Google Calendar API
- base de conhecimento do negócio
- escalonamento humano
- fluxo operacional inspirado em n8n

A proposta é permitir adaptação rápida para diferentes negócios, preenchendo apenas variáveis globais e reutilizando o mesmo modelo operacional.

## Estrutura do projeto

```txt
UNIVERSAL_AGENT/
├── AGENT_MASTER.md
├── N8N_FLOW_STEP_BY_STEP.md
├── README.md
├── docs/
├── prompts/
├── json/
├── api/
├── examples/
├── schemas/
├── templates/
├── mapping/
├── mock-backend/
├── app-backend/
├── playground/
└── deploy/
```

## O que cada área faz

### Arquivos principais

- `AGENT_MASTER.md`: prompt mestre universal com identidade, regras, fluxo de atendimento, integração, escalonamento e restrições.
- `N8N_FLOW_STEP_BY_STEP.md`: visão resumida do fluxo em formato de nodes.
- `README.md`: mapa geral do repositório.

### Pasta `docs/`

Documentação node by node do fluxo.

Inclui arquivos como:
- trigger do WhatsApp
- normalização de contexto
- classificação de intenção
- consulta à base de conhecimento
- verificação de horário
- mapeamento de serviço
- consulta de agenda
- escolha de slots
- confirmação
- lembretes
- cancelamento
- reagendamento
- handoff humano

### Pasta `prompts/`

Prompts prontos para operação:
- `system_prompt_production.md`
- `variables_template.md`
- `handoff_rules.md`

### Pasta `json/`

Estruturas para implementação estilo n8n:
- `universal_agent_n8n_skeleton.json`
- `universal_agent_n8n_importable.json`
- `workflow_credentials_placeholders.json`
- `node_map.json`

### Pasta `api/`

Contratos documentais de integração:
- WhatsApp inbound
- WhatsApp outbound
- Google Calendar freebusy
- criação de evento
- handoff humano

### Pasta `examples/`

Payloads de exemplo para testes e implementação:
- mensagens novas
- mensagens de cliente recorrente
- cancelamento
- freebusy do Google Calendar
- criação de evento
- resposta de criação
- handoff humano

### Pasta `schemas/`

Validação formal dos payloads com JSON Schema.

### Pasta `templates/`

Mensagens prontas por cenário operacional.

### Pasta `mapping/`

Matrizes de intenção, ação, node e template.

### Pasta `mock-backend/`

Mini API REST local para testar o fluxo ponta a ponta sem integrações reais.

### Pasta `app-backend/`

Backend quase-prod com modos `mock` e `provider-ready`, preparado para migrar depois para integrações reais, com providers configuráveis para WhatsApp e Google Calendar.

### Pasta `playground/`

Frontend estático simples para disparar cenários e visualizar respostas do backend.

### Pasta `deploy/`

Documentação de transição entre protótipo local e futura implantação mais realista.

## Ordem recomendada de leitura

1. `README.md`
2. `AGENT_MASTER.md`
3. `N8N_FLOW_STEP_BY_STEP.md`
4. `docs/flow-overview.md`
5. `docs/01-whatsapp-trigger.md` até `docs/16-safe-close.md`
6. `prompts/system_prompt_production.md`
7. `json/universal_agent_n8n_skeleton.json`
8. `api/README.md`
9. arquivos de `examples/`
10. `schemas/README.md`
11. arquivos de `templates/`
12. arquivos de `mapping/`
13. `mock-backend/README.md`
14. `playground/README.md`
15. `deploy/README.md`
16. `app-backend/README.md`

## Como usar step by step

### Etapa 1 — configurar o agente

Abra `AGENT_MASTER.md` e preencha apenas o bloco de variáveis globais.

### Etapa 2 — preparar o prompt de produção

Use `prompts/system_prompt_production.md` como base operacional do agente.

### Etapa 3 — adaptar as variáveis

Use `prompts/variables_template.md` para preencher as informações específicas do negócio.

### Etapa 4 — entender o fluxo como nodes

Leia `N8N_FLOW_STEP_BY_STEP.md` e depois a pasta `docs/` para ver cada etapa como um node separado.

### Etapa 5 — montar a automação

Use `json/universal_agent_n8n_skeleton.json` como ponto de partida conceitual e `json/universal_agent_n8n_importable.json` como base mais próxima de importação no n8n.

### Etapa 6 — validar payloads

Use a pasta `api/` como contrato de referência, a pasta `examples/` para exemplos completos e a pasta `schemas/` para validação estrutural.

### Etapa 7 — reutilizar mensagens prontas

Use a pasta `templates/` para respostas rápidas por cenário e a pasta `mapping/` para entender qual template e qual node entram em cada caso.

### Etapa 8 — testar localmente

Use `mock-backend/` para simular atendimento, agenda e handoff sem depender de APIs reais.

### Etapa 9 — testar pelo frontend simples

Use `playground/` para enviar cenários rápidos ao backend e visualizar o retorno JSON.

### Etapa 10 — escolher o backend de operação

Use `mock-backend/` para demonstração rápida e `app-backend/` quando quiser testar uma arquitetura mais próxima de produção.

### Etapa 11 — selecionar o modo do `app-backend`

Para testes rápidos sem credenciais reais:
- `APP_MODE=mock`
- `WHATSAPP_PROVIDER=mock`
- `CALENDAR_PROVIDER=mock`

Para preparação de integração real:
- `APP_MODE=provider-ready`
- `WHATSAPP_PROVIDER=meta`
- `CALENDAR_PROVIDER=google`

No modo `provider-ready`, o backend continua subindo mesmo sem credenciais válidas, mas retorna erros claros de configuração ausente nas respostas preparadas para provider.

### Etapa 12 — validar configuração mínima

Antes de ligar providers reais, confira:
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `GOOGLE_API_KEY`
- `CALENDARIO_ID`
- `TELEFONE_HUMANO`
- `ADMIN_TOKEN`

### Etapa 13 — planejar evolução de deploy

Use `deploy/` para mapear variáveis, arquitetura e próximos passos de saída do modo mock.

### Etapa 14 — revisar regras críticas

Antes de produção, confirme que o fluxo:
- não inventa respostas
- não confirma agendamento sem evento criado
- respeita horário de funcionamento
- encaminha corretamente para humano quando necessário

## Resumo do fluxo

Fluxo principal:
1. Receber mensagem do WhatsApp
2. Normalizar contexto
3. Classificar intenção
4. Consultar base de conhecimento
5. Verificar horário de funcionamento
6. Mapear serviço
7. Consultar disponibilidade no Google Calendar
8. Sugerir até 3 horários
9. Capturar escolha do cliente
10. Criar evento
11. Confirmar no WhatsApp
12. Agendar lembretes
13. Encerrar com segurança

Fluxos paralelos:
- cancelamento
- reagendamento
- escalonamento humano

## Observações importantes

- `json/universal_agent_n8n_skeleton.json` é um esqueleto conceitual.
- `json/universal_agent_n8n_importable.json` já se aproxima mais de um export/import do n8n, mas ainda precisa de credenciais e ajustes reais.
- `json/universal_agent_n8n_detailed.json` aproxima ainda mais o fluxo do desenho operacional completo.
- `json/universal_agent_n8n_app_backend.json` aponta para o backend mais próximo de produção.
- `json/universal_agent_n8n_provider_ready.json` documenta um fluxo mais fiel à operação do `app-backend` em modo provider-ready.
- Os contratos de API em `api/` são documentais e os schemas em `schemas/` formalizam a estrutura esperada.
- A pasta `mock-backend/` funciona como mini API REST de prototipagem local.
- A pasta `app-backend/` introduz uma arquitetura quase-prod com providers configuráveis.
- O `app-backend` preserva o modo `mock` para validação local e o modo `provider-ready` para preparar integração real sem quebrar o servidor quando faltarem credenciais.
- A pasta `playground/` fornece uma forma visual simples de testar o backend.
- A pasta `deploy/` documenta a passagem da camada mock para uma futura camada real.
- O projeto foi organizado para imitar o raciocínio visual de um fluxo n8n e reduzir a distância entre documentação e execução.

## Objetivo

Permitir adaptação rápida do mesmo agente para vários negócios, trocando apenas variáveis globais e mantendo um fluxo consistente, documentado e pronto para implementação futura.
