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
const TipoAtendimento = require('../models/TipoAtendimento')
const Atendimento = require('../models/Atendimento')
const ContatoTutor = require('../models/ContatoTutor');
const Raca = require('../models/Raca');

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
TipoAtendimento.init(connection);
Raca.init(connection);
Atendimento.init(connection);

Usuario.associate(connection.models);
ContatoTutor.associate(connection.models);
Raca.associate(connection.models);
// Atendimento.associate(connection.models);

module.exports = connection;