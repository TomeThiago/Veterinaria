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
const Paciente = require('../models/Paciente');
const Exame = require('../models/Exame');

const ContatoTutor = require('../models/ContatoTutor');

const connection = new Sequelize(dbConfig);

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
Paciente.init(connection);
Exame.init(connection);

Usuario.associate(connection.models);
ContatoTutor.associate(connection.models);
Paciente.associate(connection.models);
Exame.associate(connection.models);

module.exports = connection;