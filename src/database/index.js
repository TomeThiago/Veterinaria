require('dotenv').config();

const dbConfig = require('../config/database');
const Sequelize = require('sequelize');

const AreaAtucao = require('../model/vo/AreaAtuacao');
const Cargo = require('../model/vo/Cargo');
const Tutor = require('../model/vo/Tutor');
const Cor = require('../model/vo/Cor');
const Especie = require('../model/vo/Especie');
const Grupo = require('../model/vo/Grupo');
const Pelagem = require('../model/vo/Pelagem');
const TipoExame = require('../model/vo/TipoExame');
const TipoAtendimento = require('../model/vo/TipoAtendimento');
const Usuario = require('../model/vo/Usuario');
const Fornecedor = require('../model/vo/Fornecedor');
const Raca = require('../model/vo/Raca');
const Fazenda = require('../model/vo/Fazenda');
const Paciente = require('../model/vo/Paciente');
const Produto = require('../model/vo/Produto');
const PacienteVacina = require('../model/vo/PacienteVacina');
const PacienteExame = require('../model/vo/PacienteExame');
const PacienteAnexo = require('../model/vo/PacienteAnexo');
const Cfop = require('../model/vo/Cfop');
const ContatoTutor = require('../model/vo/ContatoTutor');
const ContatoFornecedor = require('../model/vo/ContatoFornecedor');
const Estoque = require('../model/vo/Estoque');
const MovimentoEstoque = require('../model/vo/MovimentoEstoque');
const Exame = require('../model/vo/Exame');
const Auditoria = require('../model/vo/Auditoria');
const Atendimento = require('../model/vo/Atendimento');
const AtendimentoProduto = require('../model/vo/AtendimentoProduto');
const AtendimentoProdutoEstoque = require('../model/vo/AtendimentoProdutoEstoque');

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
TipoAtendimento.init(connection);
Usuario.init(connection);
ContatoTutor.init(connection);
Fornecedor.init(connection);
Raca.init(connection);
Paciente.init(connection);
Fazenda.init(connection);
Produto.init(connection);
PacienteVacina.init(connection);
PacienteExame.init(connection);
PacienteAnexo.init(connection);
Cfop.init(connection);
ContatoFornecedor.init(connection);
Estoque.init(connection);
MovimentoEstoque.init(connection);
Exame.init(connection);
Paciente.init(connection);
Auditoria.init(connection);
Atendimento.init(connection);
AtendimentoProduto.init(connection);
AtendimentoProdutoEstoque.init(connection);

Usuario.associate(connection.models);
ContatoTutor.associate(connection.models);
Paciente.associate(connection.models);
Raca.associate(connection.models);
Produto.associate(connection.models);
PacienteVacina.associate(connection.models);
PacienteExame.associate(connection.models);
PacienteAnexo.associate(connection.models);
ContatoFornecedor.associate(connection.models);
Estoque.associate(connection.models);
MovimentoEstoque.associate(connection.models);
Exame.associate(connection.models);
Atendimento.associate(connection.models);
AtendimentoProduto.associate(connection.models);
AtendimentoProdutoEstoque.associate(connection.models);
Cfop.associate(connection.models);


module.exports = connection;