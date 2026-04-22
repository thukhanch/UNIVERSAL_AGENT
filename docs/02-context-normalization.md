# Node 02 — Context Normalization

## Objetivo

Transformar o payload bruto em um contexto padronizado para os próximos nodes.

## Entrada

- payload vindo do Node 01

## Processamento

- extrair telefone
- extrair nome
- extrair texto da mensagem
- registrar timestamp
- marcar se é novo contato ou recorrente

## Saída

```json
{
  "customer": {
    "firstName": "string",
    "phone": "string",
    "isReturning": true
  },
  "message": {
    "text": "string",
    "timestamp": "ISO8601"
  }
}
```

## Regras críticas

- usar estrutura consistente em todas as conversas
- preservar os dados originais para auditoria, quando necessário

## Dependências externas

- nenhum serviço externo obrigatório

## Observações de implementação

Esse node facilita a tomada de decisão nos nodes seguintes e evita lógica duplicada.
