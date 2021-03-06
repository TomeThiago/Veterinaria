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
const ExameController = require('./controllers/ExameController');
const TutorController = require('./controllers/TutorController');
const UsuarioController = require('./controllers/UsuarioController');
const ContatoTutorController = require('./controllers/ContatoTutorController');
const FornecedorController = require('./controllers/FornecedorController');
const FazendaController = require('./controllers/FazendaController');
const PacienteController = require('./controllers/PacienteController');
const ProdutoController = require('./controllers/ProdutoController');
const CfopController = require('./controllers/CfopController');
const ContatoFornecedorController = require('./controllers/ContatoFornecedorController');
const EstoqueController = require('./controllers/EstoqueController');
const MovimentoEstoqueController = require('./controllers/MovimentoEstoqueController');
const TipoAtendimentoController = require("./controllers/TipoAtendimentoController");
const PacienteExameController = require('./controllers/PacienteExameController');
const PacienteVacinaController = require('./controllers/PacienteVacinaController');
const PacienteAnexoController = require('./controllers/PacienteAnexoController');
const AuditoriaController = require('./controllers/AuditoriaController');
const AtendimentoController = require('./controllers/AtendimentoController');
const AtendimentoProdutoController = require('./controllers/AtendimentoProdutoController');
const AtendimentoEstoqueController = require('./controllers/AtendimentoProdutoEstoqueController');

const routes = express.Router();

//Autenticação
routes.post('/login', AuthController.index);

routes.use(authMiddleware);

routes.post('/usuario', permissaoAdministrador, UsuarioController.store);
routes.get('/usuario', permissaoAdministrador, UsuarioController.index);
routes.get('/usuario/:id', UsuarioController.index);
routes.put('/usuario/:id', UsuarioController.update);
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
routes.get('/tipoexame/:id', TipoExameController.index);
routes.put('/tipoexame/:id', TipoExameController.update);
routes.post('/tipoexame', TipoExameController.store);
routes.delete('/tipoexame/:id', TipoExameController.delete);

//Exame
routes.get('/exame', ExameController.index);
routes.get('/exame/:id', ExameController.index);
routes.put('/exame/:id', ExameController.update);
routes.post('/exame', ExameController.store);
routes.delete('/exame/:id', ExameController.delete);

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

//ContatoFornecedor
routes.get('/fornecedor/:fornecedor_id/contatofornecedor', ContatoFornecedorController.index);
routes.get('/fornecedor/:fornecedor_id/contatofornecedor/:id', ContatoFornecedorController.index);
routes.put('/fornecedor/:fornecedor_id/contatofornecedor/:id', ContatoFornecedorController.update);
routes.post('/fornecedor/:fornecedor_id/contatofornecedor', ContatoFornecedorController.store);
routes.delete('/fornecedor/:fornecedor_id/contatofornecedor/:id', ContatoFornecedorController.delete);

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

//Vacinas do paciente
routes.get('/paciente/:paciente_id/vacina', PacienteVacinaController.index);
routes.get('/paciente/:paciente_id/vacina/:id', PacienteVacinaController.index);
routes.put('/paciente/:paciente_id/vacina/:id', PacienteVacinaController.update);
routes.post('/paciente/:paciente_id/vacina', PacienteVacinaController.store);
routes.delete('/paciente/:paciente_id/vacina/:id', PacienteVacinaController.delete);

//Exames do paciente
routes.get('/paciente/:paciente_id/exame', PacienteExameController.index);
routes.get('/paciente/:paciente_id/exame/:id', PacienteExameController.index);
routes.put('/paciente/:paciente_id/exame/:id', PacienteExameController.update);
routes.post('/paciente/:paciente_id/exame', PacienteExameController.store);
routes.delete('/paciente/:paciente_id/exame/:id', PacienteExameController.delete);

//Anexos do paciente
routes.get('/paciente/:paciente_id/exame/:pacienteexame_id/anexo', PacienteAnexoController.index);
routes.get('/paciente/:paciente_id/exame/:pacienteexame_id/anexo/:id', PacienteAnexoController.index);
routes.post('/paciente/:paciente_id/exame/:pacienteexame_id/anexo', PacienteAnexoController.store);
routes.delete('/paciente/:paciente_id/exame/:pacienteexame_id/anexo/:id', PacienteAnexoController.delete);

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

//Estoque
routes.get('/estoque', EstoqueController.index);
routes.get('/estoque/:id', EstoqueController.index);
routes.put('/estoque/:id', EstoqueController.update);
routes.post('/estoque', EstoqueController.store);
routes.delete('/estoque/:id', EstoqueController.delete);

routes.get('/movimentaestoque', MovimentoEstoqueController.index);
routes.get('/movimentaestoque/:id', MovimentoEstoqueController.index);
routes.post('/movimentaestoque', MovimentoEstoqueController.store);

//TipoAtendimento
routes.get('/tipoatendimento', TipoAtendimentoController.index);
routes.get('/tipoatendimento/:id', TipoAtendimentoController.index);
routes.put('/tipoatendimento/:id', TipoAtendimentoController.update);
routes.post('/tipoatendimento', TipoAtendimentoController.store);
routes.delete('/tipoatendimento/:id', TipoAtendimentoController.delete);

//Atendimento
routes.get('/atendimento', AtendimentoController.index);
routes.get('/atendimento/:id', AtendimentoController.index);
routes.put('/atendimento/:id', AtendimentoController.update);
routes.post('/atendimento', AtendimentoController.store);
routes.delete('/atendimento/:id', AtendimentoController.delete);

//AtendimentoProduto
routes.get('/atendimento/:atendimento_id/produtos', AtendimentoProdutoController.index);
routes.get('/atendimento/:atendimento_id/produtos/:id', AtendimentoProdutoController.index);
routes.put('/atendimento/:atendimento_id/produtos/:id', AtendimentoProdutoController.update);
routes.post('/atendimento/:atendimento_id/produtos', AtendimentoProdutoController.store);

//Auditoria
routes.get('/auditoria', AuditoriaController.index);

module.exports = routes;