
# Sistema-de-Gerenciamento-Hospitalar

Objetivo dessa API é para manter a organização de um sistema de saúde, contendo nela: Cadastros de hospitais, cadastros de usuários , cadastro de estoque com itens, tentando sempre facilitar o trabalho dos usuários da API


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
  POST /api/v1/signin
```
#### Fazer login do hospital

```http
  POST /api/v1/signup (Ira retornar um TOKEN JWT)
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

## Autores

- [Afonso Gouveia Bassani](https://github.com/gouvei4)

