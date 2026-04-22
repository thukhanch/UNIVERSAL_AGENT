# Intent To Action Matrix

| Intenção | Ação principal | Node principal | Contrato relacionado | Template principal | Escalonamento |
|---|---|---|---|---|---|
| info | consultar base e responder | Node 04 | `api/whatsapp_inbound_contract.json` | `templates/welcome_messages.md` ou resposta contextual | não |
| schedule | mapear serviço, consultar agenda e confirmar | Node 06 → 11 | `api/google_calendar_freebusy_contract.json`, `api/google_calendar_event_create_contract.json` | `templates/scheduling_messages.md` | não |
| cancel | validar política e cancelar evento | Node 13 | `api/google_calendar_event_create_contract.json` | `templates/cancellation_messages.md` | se houver disputa financeira |
| reschedule | cancelar atual e buscar novo slot | Node 14 | `api/google_calendar_event_create_contract.json` | `templates/rescheduling_messages.md` | não |
| complaint | reconhecer e encaminhar | Node 15 | `api/human_handoff_contract.json` | `templates/handoff_messages.md` | sim |
| payment | encaminhar para humano | Node 15 | `api/human_handoff_contract.json` | `templates/handoff_messages.md` | sim |
| out_of_scope | responder com limite de escopo | Node 03/04 | `api/whatsapp_outbound_contract.json` | resposta contextual | depende do caso |
| audio | pedir texto | Node 01/03 | `api/whatsapp_outbound_contract.json` | `templates/audio_fallback_messages.md` | não |
