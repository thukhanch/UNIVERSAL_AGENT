# UNIVERSAL_AGENT

Agente universal de atendimento via WhatsApp com organização em estilo n8n, pensado para funcionar em fluxo por etapas, como se cada etapa fosse um node.

## Visão geral

Este repositório contém um master prompt universal para atendimento, agendamento, lembretes, cancelamento, reagendamento e escalonamento humano.

A lógica foi organizada para facilitar implementação futura em automações no estilo n8n:
- Node 1: Receber mensagem do WhatsApp
- Node 2: Identificar contexto do cliente
- Node 3: Consultar base de conhecimento
- Node 4: Validar serviço solicitado
- Node 5: Consultar disponibilidade no Google Calendar
- Node 6: Sugerir até 3 horários
- Node 7: Confirmar escolha do cliente
- Node 8: Criar evento no Google Calendar
- Node 9: Confirmar agendamento no WhatsApp
- Node 10: Agendar lembretes automáticos
- Node 11: Cancelar ou reagendar quando necessário
- Node 12: Escalonar para atendimento humano quando houver gatilho

## Arquivos

- `AGENT_MASTER.md`: prompt universal principal.
- `README.md`: visão geral do projeto.
- `N8N_FLOW_STEP_BY_STEP.md`: desenho do fluxo em formato de nodes.

## Como usar

1. Abra `AGENT_MASTER.md`.
2. Preencha apenas o bloco de variáveis globais.
3. Remova o bloco de exemplo antes de produção.
4. Use `N8N_FLOW_STEP_BY_STEP.md` para implementar o fluxo em automação.

## Objetivo

Permitir adaptação rápida do mesmo agente para vários negócios, trocando apenas variáveis globais e mantendo um fluxo consistente de atendimento.
