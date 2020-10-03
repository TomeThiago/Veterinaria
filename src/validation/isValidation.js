const Usuario = require('../models/Usuario');
const Estoque = require('../models/Estoque');

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

function isCPF(cpf) {
  return true;
}

function isCNPJ(cnpj) {
  return true;
}

async function possuiSaldo(idEstoque, quantidade) {

  const estoque = await Estoque.findOne({
    where: {
      id: idEstoque,
      status: 'Ativo'
    }
  });

  console.log(`Quantidade informada: ${quantidade}, saldo: ${estoque.quantidade}`);

  return estoque.quantidade >= quantidade;
}

module.exports = {
  isAdmin,
  isCPF,
  isCNPJ,
  possuiSaldo
}