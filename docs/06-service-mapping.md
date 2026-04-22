# Node 06 — Service Mapping

## Objetivo

Determinar qual serviço será tratado no fluxo e sua duração.

## Entrada

- intenção do cliente
- resultado da base de conhecimento
- lista de serviços configurados
- duração dos serviços

## Processamento

- mapear a necessidade do cliente para um serviço existente
- extrair duração em minutos
- validar se há um ou mais serviços combinados

## Saída

```json
{
  "serviceName": "Escova",
  "durationMinutes": 45
}
```

## Regras críticas

- se o serviço exato não existir, sugerir a alternativa mais próxima
- manter a explicação didática do porquê da sugestão

## Dependências externas

- configuração preenchida no bloco de variáveis

## Observações de implementação

Este node prepara os dados para a consulta real de agenda.
