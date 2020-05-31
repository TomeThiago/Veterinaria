const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const AreaAtucao = require('../models/AreaAtuacao');
const Cargo = require('../models/Cargo');
const Cor = require('../models/Cor');
const Especie = require('../models/Especie');
const Grupo = require('../models/Grupo');
const Pelagem = require('../models/Pelagem');
const TipoExame = require('../models/TipoExame');
const Usuario = require('../models/Usuario');

const connection = new Sequelize(dbConfig);

AreaAtucao.init(connection);
Cargo.init(connection);
Cor.init(connection);
Especie.init(connection);
Grupo.init(connection);
Pelagem.init(connection);
TipoExame.init(connection);
Usuario.init(connection);

module.exports = connection;