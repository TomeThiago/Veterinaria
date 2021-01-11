# SystemVet

![Version](https://img.shields.io/badge/version-1.0.1-blue)
![Nodejs](https://img.shields.io/badge/node.js-v12.18.3-green)
![Npm](https://img.shields.io/badge/npm-v6.14.6-blue)
![Postgres](https://img.shields.io/badge/postgresql-12-blue)
![Sequelize](https://img.shields.io/badge/sequelize-v5.21.13-blue)
![Heroku](https://heroku-badge.herokuapp.com/?app=systemvet)

### Tecnologias

* [Node.js](https://nodejs.org/) - Ambiente de desenvolvimento para construir a aplicação usando a linguagem de programação Javascript.
* [Npm](https://www.npmjs.com/) - Gerenciador de pacotes e automação de build.
* [Sequelize](https://sequelize.org/) - ORM para integração com os bancos de dados.

### Banco de Dados

* 	[PostgreSQL](https://www.postgresql.org/) - Banco de dados usado na aplicação

> :warning: **Se você tiver usando as versões acima da 12**: Tome cuidado pois mudou a maneira que importa os modulos `const express = require('express');` -> `import express from 'express'`.

## Configuração

Etapa 1 - Clone o repositório.

```bash
git clone https://github.com/TomeThiago/Veterinaria.git
cd veterinaria
```

Etapa 2 - Instale as dependências necessárias para execução do projeto.

```bash
npm install
```
ou
```bash
yarn install
```

Etapa 3 - Crie um arquivo .env para informar algumas keys importantes como a `SECRET` para validar o JWT, `NODE_ENV` para dizer qual ambiente o servidor está rodando e `PORT` para dizer qual é porta de execução do projeto.

```
PORT=3000
SECRET=
NODE_ENV=production
```

Etapa 4 - acessar `src/config/database.json` e configurar o link de acesso do banco de dados para produção e ou desenvolvimento caso tenha ou sejam diferentes.
```
{
	"development": {
		"dialect": "postgres",
		"host": "",
		"username": "",
		"password": "",
		"database": "",
		"define": {
			"timestamps": true,
			"underscored": true
		}
	},
	"production": {
		"dialect": "postgres",
		"host": "",
		"username": "",
		"password": "",
		"database": "",
		"define": {
			"timestamps": true,
			"underscored": true
		}
	}
}
```

Etapa 5 - Criar o banco de dados.

```bash
npm run sequelize db:create
```
ou 
```bash
yarn sequelize db:create
```

Etapa 6 - Criar as tabelas e popular algumas tabelas já automaticamente.

```bash
npm run sequelize db:migrate && npm run sequelize db:seed:all
```
ou 
```bash
yarn sequelize db:migrate && yarn sequelize db:seed:all
```

Etapa 7 - Subir a aplicação
```bash
npm start
```
ou 
```bash
yarn start
```

Se aparecer "Servidor iniciado com sucesso na porta 3000!" e logo após "Conexão com o banco de dados estabelecida com sucesso!." o servidor está funcionando corretamente.

Caso tenha dado algum erro verifique se fez todas as etapas igual informado nesta documentação.

## Documentation

- [Endpoints](http://localhost:3000/docs)
