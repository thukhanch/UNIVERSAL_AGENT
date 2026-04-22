# Scheduling Messages

## Cenário: pedir escolha do serviço

**Mensagem base**

`Quais desses serviços você gostaria de agendar? {{SERVICOS_DISPONIVEIS}} Pode escolher mais de um! Me conta o que você está precisando.`

**Placeholders**
- `{{SERVICOS_DISPONIVEIS}}`

**Uso no fluxo**
- Node 04 e Node 06

## Cenário: sugerir horários

**Mensagem base**

`Encontrei estes horários disponíveis para [SERVIÇO]: [OPCAO_1], [OPCAO_2] e [OPCAO_3]. Qual funciona melhor pra você?`

**Placeholders**
- `[SERVIÇO]`
- `[OPCAO_1]`
- `[OPCAO_2]`
- `[OPCAO_3]`

**Uso no fluxo**
- Node 08

## Cenário: confirmação final

**Mensagem base**

`*Agendamento confirmado!* Serviço: [SERVIÇO] | Data: [DATA] | Horário: [HORA] | Local: {{NOME_EMPRESA}}. Vou te lembrar antes, tudo bem?`

**Placeholders**
- `[SERVIÇO]`
- `[DATA]`
- `[HORA]`
- `{{NOME_EMPRESA}}`

**Uso no fluxo**
- Node 11
