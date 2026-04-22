# Node 07 — Google Calendar FreeBusy

## Objetivo

Consultar a disponibilidade do calendário para os próximos 7 dias.

## Entrada

- `CALENDARIO_ID`
- `GOOGLE_API_KEY`
- serviço mapeado
- duração em minutos
- horário de funcionamento

## Processamento

- chamar `GET /calendars/{calendarId}/freebusy`
- identificar intervalos ocupados
- calcular slots livres compatíveis com a duração do serviço
- respeitar expediente e fuso horário

## Saída

- lista de horários disponíveis

## Regras críticas

- não oferecer horários que não comportem a duração completa
- limitar a janela inicial aos próximos 7 dias

## Dependências externas

- Google Calendar API

## Observações de implementação

Esse node pode usar um HTTP Request no n8n seguido de node de código para montar os slots livres.
