require('dotenv').config();

const dbConfig = require('../config/database');
const Sequelize = require('sequelize');

const AreaAtucao = require('../models/AreaAtuacao');
const Cargo = require('../models/Cargo');
const Tutor = require('../models/Tutor');
const Cor = require('../models/Cor');
const Especie = require('../models/Especie');
const Grupo = require('../models/Grupo');
const Pelagem = require('../models/Pelagem');
const TipoExame = require('../models/TipoExame');
const Usuario = require('../models/Usuario');
const Fornecedor = require('../models/Fornecedor');
const Raca = require('../models/Raca');
const Fazenda = require('../models/Fazenda');
const Paciente = require('../models/Paciente');
const Produto = require('../models/Produto');
const PacienteVacina= require('../models/PacienteVacina');
const Cfop = require('../models/Cfop');
const ContatoTutor = require('../models/ContatoTutor');

const connection = new Sequelize(process.env.NODE_ENV == 'production'
  ? dbConfig.production
  : dbConfig.development
);

connection.authenticate().then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!.');
}).catch((err) => {
  console.error('Não foi possível conectar com o banco de dados:', err);
});

AreaAtucao.init(connection);
Cargo.init(connection);
Tutor.init(connection);
Cor.init(connection);
Especie.init(connection);
Grupo.init(connection);
Pelagem.init(connection);
TipoExame.init(connection);
Usuario.init(connection);
ContatoTutor.init(connection);
Fornecedor.init(connection);
Raca.init(connection);
Paciente.init(connection);
Fazenda.init(connection);
Produto.init(connection);
PacienteVacina.init(connection);
Cfop.init(connection);

Usuario.associate(connection.models);
ContatoTutor.associate(connection.models);
Paciente.associate(connection.models);
Raca.associate(connection.models);
Produto.associate(connection.models);
PacienteVacina.associate(connection.models);

module.exports = connection;