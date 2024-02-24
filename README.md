
# Sistema-de-Gerenciamento-Hospitalar

Objetivo dessa API é para manter a organização de um sistema de saúde, contendo nela: Cadastros de hospitais, cadastros de usuários , cadastro de estoque com itens, tentando sempre facilitar o trabalho dos usuários da API.

Para usar um banco de dados MongoDB, siga o exemplo do .ENV.EXAMPLE, usando as suas credenciais para com que a API funcione perfeitamente.


## Recursos usados

- NODE JS v20.10.0.
- Express.
- Banco de dados com MongoDB.
- Validações com YUP.
- Bcrypt para fazer o HASH da senha.
- TypeScript.
- Cors.
- JWT Token.
- Nodemon.



## Documentação da API

#### Criação de um hospital

```http
  POST /api/v1/signup
```
#### Fazer login do hospital

```http
  POST /api/v1/signin (Ira retornar um TOKEN JWT)
```

#### Retorna todos hospitais cadastrados

```http
  GET /api/v1/hospitais
```

#### Retorna hospitais por parâmetro

```http
  GET /api/v1/hospital?nameHospital=
```

#### Cadastra um paciente em um hospital específico

```http
  POST /api/v1/hospital/:hospitalId/patients
```

#### Retorna todos pacientes cadastrados por parâmetro de um hospital específico 

```http
  GET /api/v1/hospitals?nameHospital=
```

#### Cria um item para o estoque de um hospital específico

```http
  POST /api/v1/hospital/:hospitalId/stock
```

#### Retorna todo o estoque de um hospital por ID

```http
  GET /api/v1/hospital/stocks?hospitalId=
```

#### Faz o update do stock de um hospital por ID

```http
  POST /api/v1/hospital/:hospitalId/:stockId
```

## Autores

- [Afonso Gouveia Bassani](https://github.com/gouvei4)

