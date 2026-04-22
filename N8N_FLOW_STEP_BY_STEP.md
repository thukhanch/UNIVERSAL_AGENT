# N8N_FLOW_STEP_BY_STEP.md

## Fluxo do agente universal em formato de nodes

A ideia deste documento é imitar a lógica visual do n8n, organizando a operação do agente como uma sequência de nodes.

---

## NODE 1 — WhatsApp Trigger

**Função:** receber a mensagem do cliente.

**Entrada:**
- número do cliente
- nome do cliente
- texto da mensagem
- data e hora da mensagem

**Saída:**
- payload normalizado para o fluxo

---

## NODE 2 — Normalizar contexto

**Função:** limpar e estruturar os dados recebidos.

**Faz:**
- identifica nome
- identifica telefone
- identifica texto
- verifica se é novo contato ou cliente recorrente
- registra timestamp

**Saída:**
- contexto inicial da conversa

---

## NODE 3 — Classificar intenção

**Função:** entender o que o cliente quer.

**Classificações possíveis:**
- pedir informação
- agendar serviço
- cancelar
- reagendar
- reclamar
- falar sobre pagamento
- assunto fora de escopo

**Saída:**
- rota do fluxo

---

## NODE 4 — Consultar base de conhecimento

**Função:** buscar a resposta ou o serviço correto.

**Regras:**
- consultar base antes de responder
- nunca inventar informação
- se não encontrar, marcar como não resolvido

**Saída:**
- serviço encontrado
- resposta encontrada
- ou necessidade de escalonamento

---

## NODE 5 — Verificar horário de funcionamento

**Função:** validar se a mensagem chegou dentro do horário operacional.

**Se estiver fora do horário:**
- responder com mensagem de fora do expediente
- manter conversa em espera até o próximo período útil

**Se estiver dentro do horário:**
- seguir o fluxo normalmente

---

## NODE 6 — Mapear serviço e duração

**Função:** descobrir qual serviço o cliente quer e quanto tempo ele ocupa.

**Faz:**
- cruza intenção com catálogo
- identifica duração do serviço
- prepara consulta ao calendário

**Saída:**
- serviço escolhido
- duração em minutos

---

## NODE 7 — Google Calendar FreeBusy

**Função:** consultar disponibilidade real.

**Ação técnica:**
- usar `GET /calendars/{calendarId}/freebusy`
- procurar disponibilidade nos próximos 7 dias
- respeitar horário de funcionamento
- respeitar duração do serviço

**Saída:**
- lista de slots livres

---

## NODE 8 — Selecionar até 3 melhores horários

**Função:** transformar slots em opções simples para o cliente.

**Regra:**
- mostrar no máximo 3 opções
- priorizar horários mais próximos
- manter clareza na mensagem

**Saída:**
- mensagem com sugestões de horário

---

## NODE 9 — Aguardar escolha do cliente

**Função:** capturar a resposta do cliente sobre qual horário prefere.

**Se cliente aceitar uma opção:**
- seguir para criação do evento

**Se cliente rejeitar todas:**
- voltar para nova busca de horários

---

## NODE 10 — Criar evento no Google Calendar

**Função:** gravar o agendamento confirmado.

**Ação técnica:**
- usar `POST /calendars/{calendarId}/events`
- incluir nome do cliente
- incluir telefone
- incluir serviço
- incluir timezone
- incluir lembretes

**Saída:**
- `eventId`
- confirmação de criação

---

## NODE 11 — Confirmar agendamento no WhatsApp

**Função:** enviar a confirmação final ao cliente.

**Mensagem deve conter:**
- serviço
- data
- hora
- local
- confirmação dos lembretes

**Regra crítica:**
- só confirmar se o evento tiver sido criado com sucesso

---

## NODE 12 — Agendar lembretes

**Função:** disparar mensagens automáticas antes do atendimento.

**Lembretes padrão:**
- lembrete 1
- lembrete 2

**Pode ser implementado com:**
- scheduler
- cron
- fila de jobs
- workflow temporizado

---

## NODE 13 — Cancelamento

**Função:** cancelar um agendamento existente.

**Ação técnica:**
- validar política de cancelamento
- usar `DELETE /calendars/{calendarId}/events/{eventId}`
- confirmar cancelamento ao cliente

---

## NODE 14 — Reagendamento

**Função:** trocar um horário já marcado.

**Ação técnica:**
- cancelar evento atual
- voltar ao node de consulta de disponibilidade
- criar novo evento ao final

---

## NODE 15 — Escalonamento humano

**Função:** transferir casos sensíveis.

**Gatilhos:**
- reclamação
- cobrança
- reembolso
- ameaça legal
- urgência médica
- caso não resolvido em 2 trocas

**Ação:**
- encaminhar histórico
- enviar para telefone humano
- pausar automação

---

## NODE 16 — Encerramento seguro

**Função:** finalizar a interação mantendo contexto limpo.

**Faz:**
- salva histórico mínimo necessário
- marca status da conversa
- deixa pronto para próxima interação

---

## Resumo visual do fluxo

`WhatsApp Trigger`
→ `Normalizar contexto`
→ `Classificar intenção`
→ `Consultar base`
→ `Verificar horário`
→ `Mapear serviço`
→ `Consultar agenda`
→ `Sugerir 3 horários`
→ `Capturar escolha`
→ `Criar evento`
→ `Confirmar no WhatsApp`
→ `Agendar lembretes`
→ `Encerrar`

Rotas paralelas:
- `Cancelar` → `Excluir evento` → `Confirmar cancelamento`
- `Reagendar` → `Excluir evento` → `Nova busca` → `Novo evento`
- `Escalonar` → `Encaminhar humano` → `Pausar agente`
