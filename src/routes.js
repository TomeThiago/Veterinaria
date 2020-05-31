const express = require('express');

const AreaAtuacaoController = require('./controllers/AreaAtuacaoController');
const CargoController = require('./controllers/CargoController');
const CorController = require('./controllers/CorController');
const EspecieController = require('./controllers/EspecieController');
const GrupoController = require('./controllers/GrupoController');
const PelagemController = require('./controllers/PelagemController');
const TipoExameController = require('./controllers/TipoExameController');
const UsuarioController = require('./controllers/UsuarioController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({hello:"Hello World"});
});

//Usuário
routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);

//Cor
routes.get('/cor', CorController.index);
routes.post('/cor', CorController.store);

//Cargo
routes.get('/cargo', CargoController.index);
routes.post('/cargo', CargoController.store);

//Area Atuação
routes.get('/areaatuacao', AreaAtuacaoController.index);
routes.post('/areaatuacao', AreaAtuacaoController.store);

//Espécie
routes.get('/especie', EspecieController.index);
routes.post('/especie', EspecieController.store);

//Grupo
routes.get('/grupo', GrupoController.index);
routes.post('/grupo', GrupoController.store);

//Pelagem
routes.get('/pelagem', PelagemController.index);
routes.post('/pelagem', PelagemController.store);

//Tipo Exame
routes.get('/tipoexame', TipoExameController.index);
routes.post('/tipoexame', TipoExameController.store);

module.exports = routes;