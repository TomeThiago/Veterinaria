const express = require('express');
const authMiddleware = require('./middlewares/auth');
const permissaoAdministrador = require('./middlewares/adminPermission');

const AuthController = require('./controllers/AuthController');
const AreaAtuacaoController = require('./controllers/AreaAtuacaoController');
const CargoController = require('./controllers/CargoController');
const CorController = require('./controllers/CorController');
const EspecieController = require('./controllers/EspecieController');
const RacaController = require('./controllers/RacaController');
const GrupoController = require('./controllers/GrupoController');
const PelagemController = require('./controllers/PelagemController');
const TipoExameController = require('./controllers/TipoExameController');
const TutorController = require('./controllers/TutorController');
const UsuarioController = require('./controllers/UsuarioController');
const ContatoTutorController = require('./controllers/ContatoTutorController');
const FornecedorController = require('./controllers/FornecedorController');
const FazendaController = require('./controllers/FazendaController');
const PacienteController = require('./controllers/PacienteController');
const ProdutoController = require('./controllers/ProdutoController');
const CfopController = require('./controllers/CfopController');

const routes = express.Router();

//Autenticação
routes.post('/login', AuthController.index);

routes.use(authMiddleware);

//Usuário
routes.get('/usuario', permissaoAdministrador, UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.index);
routes.put('/usuario/:id', UsuarioController.update);
routes.post('/usuario', permissaoAdministrador, UsuarioController.store);
routes.delete('/usuario/:id', permissaoAdministrador, UsuarioController.delete);

//Cor
routes.get('/cor', CorController.index);
routes.get('/cor/:id', CorController.index);
routes.put('/cor/:id', CorController.update);
routes.post('/cor', CorController.store);
routes.delete('/cor/:id', CorController.delete);

//Cargo
routes.get('/cargo', CargoController.index);
routes.get('/cargo/:id', CargoController.index);
routes.put('/cargo/:id', CargoController.update);
routes.post('/cargo', CargoController.store);
routes.delete('/cargo/:id', CargoController.delete);

//Area Atuação
routes.get('/areaatuacao', AreaAtuacaoController.index);
routes.get('/areaatuacao/:id', AreaAtuacaoController.index);
routes.put('/areaatuacao/:id', AreaAtuacaoController.update);
routes.post('/areaatuacao', AreaAtuacaoController.store);
routes.delete('/areaatuacao/:id', AreaAtuacaoController.delete);

//Espécie
routes.get('/especie', EspecieController.index);
routes.get('/especie/:id', EspecieController.index);
routes.put('/especie/:id', EspecieController.update);
routes.post('/especie', EspecieController.store);
routes.delete('/especie/:id', EspecieController.delete);

//Raca
routes.get('/raca', RacaController.index);
routes.get('/raca/:id', RacaController.index);
routes.put('/raca/:id', RacaController.update);
routes.post('/raca', RacaController.store);
routes.delete('/raca/:id', RacaController.delete);

//Grupo
routes.get('/grupo', GrupoController.index);
routes.get('/grupo/:id', GrupoController.index);
routes.put('/grupo/:id', GrupoController.update);
routes.post('/grupo', GrupoController.store);
routes.delete('/grupo/:id', GrupoController.delete);

//Pelagem
routes.get('/pelagem', PelagemController.index);
routes.get('/pelagem/:id', PelagemController.index);
routes.put('/pelagem/:id', PelagemController.update);
routes.post('/pelagem', PelagemController.store);
routes.delete('/pelagem/:id', PelagemController.delete);

//Tipo Exame
routes.get('/tipoexame', TipoExameController.index);
routes.put('/tipoexame/:id', TipoExameController.update);
routes.post('/tipoexame', TipoExameController.store);
routes.delete('/tipoexame/:id', TipoExameController.delete);

//Tutor
routes.get('/tutor', TutorController.index);
routes.get('/tutor/:id', TutorController.index);
routes.put('/tutor/:id', TutorController.update);
routes.post('/tutor', TutorController.store);
routes.delete('/tutor/:id', TutorController.delete);

//ContatoTutor
routes.get('/tutor/:tutor_id/contatotutor', ContatoTutorController.index);
routes.get('/tutor/:tutor_id/contatotutor/:id', ContatoTutorController.index);
routes.put('/tutor/:tutor_id/contatotutor/:id', ContatoTutorController.update);
routes.post('/tutor/:tutor_id/contatotutor', ContatoTutorController.store);
routes.delete('/tutor/:tutor_id/contatotutor/:id', ContatoTutorController.delete);

//Fornecedor
routes.get('/fornecedor', FornecedorController.index);
routes.get('/fornecedor/:id', FornecedorController.index);
routes.put('/fornecedor/:id', FornecedorController.update);
routes.post('/fornecedor', FornecedorController.store);
routes.delete('/fornecedor/:id', FornecedorController.delete);

//Fazenda
routes.get('/fazenda', FazendaController.index);
routes.get('/fazenda/:id', FazendaController.index);
routes.put('/fazenda/:id', FazendaController.update);
routes.post('/fazenda', FazendaController.store);
routes.delete('/fazenda/:id', FazendaController.delete);

//Paciente
routes.get('/paciente', PacienteController.index);
routes.get('/paciente/:id', PacienteController.index);
routes.put('/paciente/:id', PacienteController.update);
routes.post('/paciente', PacienteController.store);
routes.delete('/paciente/:id', PacienteController.delete);

//Produto
routes.get('/produto', ProdutoController.index);
routes.get('/produto/:id', ProdutoController.index);
routes.put('/produto/:id', ProdutoController.update);
routes.post('/produto', ProdutoController.store);
routes.delete('/produto/:id', ProdutoController.delete);

//Cfop
routes.get('/cfop', CfopController.index);
routes.get('/cfop/:id', CfopController.index);
routes.put('/cfop/:id', CfopController.update);
routes.post('/cfop', CfopController.store);
routes.delete('/cfop/:id', CfopController.delete);

module.exports = routes;