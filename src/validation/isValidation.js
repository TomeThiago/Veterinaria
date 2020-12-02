const Usuario = require('../model/vo/Usuario');
const Estoque = require('../model/vo/Estoque');

async function isAdmin(usuario_id) {
  const usuarioAdministrador = await Usuario.findOne({
    where: {
      id: usuario_id,
      administrador: true,
      status: 'Ativo'
    }
  });
  
  return !usuarioAdministrador ? false : true; 
}

async function possuiSaldo(idEstoque, quantidade) {

  const estoque = await Estoque.findOne({
    where: {
      id: idEstoque,
      status: 'Ativo'
    }
  });

  return estoque.quantidade >= quantidade;
}

module.exports = {
  isAdmin,
  possuiSaldo
}