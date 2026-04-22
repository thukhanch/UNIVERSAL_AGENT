# Node Responsibility Matrix

| Node | Responsabilidade | Documento | Saída principal |
|---|---|---|---|
| 01 | receber mensagem | `docs/01-whatsapp-trigger.md` | payload bruto |
| 02 | normalizar contexto | `docs/02-context-normalization.md` | contexto padronizado |
| 03 | classificar intenção | `docs/03-intent-classification.md` | rota do fluxo |
| 04 | consultar base | `docs/04-knowledge-base.md` | resposta factual ou serviço |
| 05 | validar horário | `docs/05-business-hours.md` | `isOpen` |
| 06 | mapear serviço | `docs/06-service-mapping.md` | serviço + duração |
| 07 | consultar disponibilidade | `docs/07-calendar-freebusy.md` | slots livres |
| 08 | escolher até 3 slots | `docs/08-slot-selection.md` | opções de horário |
| 09 | capturar escolha | `docs/09-customer-choice.md` | horário selecionado |
| 10 | criar evento | `docs/10-create-calendar-event.md` | `eventId` |
| 11 | confirmar no WhatsApp | `docs/11-confirmation-message.md` | mensagem final |
| 12 | agendar lembretes | `docs/12-reminders.md` | jobs futuros |
| 13 | cancelar evento | `docs/13-cancellation.md` | status de cancelamento |
| 14 | reagendar | `docs/14-rescheduling.md` | novo evento |
| 15 | handoff humano | `docs/15-human-handoff.md` | conversa pausada |
| 16 | encerrar fluxo | `docs/16-safe-close.md` | estado final |
