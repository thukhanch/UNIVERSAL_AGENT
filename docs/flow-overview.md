# Flow Overview

Este documento resume o fluxo completo do `UNIVERSAL_AGENT` em formato operacional, como se cada etapa fosse um node de um workflow no n8n.

## Objetivo

Dar uma visão macro do processo antes da leitura node por node.

## Sequência principal

1. Receber mensagem do WhatsApp
2. Normalizar contexto da conversa
3. Classificar a intenção do cliente
4. Consultar base de conhecimento
5. Verificar horário de funcionamento
6. Mapear serviço e duração
7. Consultar disponibilidade no Google Calendar
8. Selecionar até 3 horários
9. Capturar escolha do cliente
10. Criar evento no Google Calendar
11. Confirmar agendamento no WhatsApp
12. Agendar lembretes automáticos
13. Encerrar interação com contexto seguro

## Rotas paralelas

### Cancelamento
- identificar pedido de cancelamento
- validar política
- excluir evento
- confirmar cancelamento

### Reagendamento
- identificar pedido de reagendamento
- cancelar evento atual
- consultar nova disponibilidade
- criar novo evento
- confirmar novo horário

### Escalonamento humano
- detectar reclamação, cobrança, ameaça legal, urgência ou falha após 2 trocas
- encaminhar histórico
- pausar o agente

## Dependências externas

- WhatsApp Business API
- Google Calendar API
- base de conhecimento do negócio
- mecanismo de scheduler para lembretes

## Regras críticas

- nunca responder inventando informação
- nunca confirmar agendamento sem sucesso real na criação do evento
- sempre manter o personagem do agente
- sempre falar em português-BR
- sempre respeitar os gatilhos de escalonamento

## Arquivos relacionados

- `../AGENT_MASTER.md`
- `../N8N_FLOW_STEP_BY_STEP.md`
- `../json/universal_agent_n8n_skeleton.json`
