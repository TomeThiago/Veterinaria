const Usuario = require('../models/Usuario');

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

function isEmail(email) {
  return true;
}

module.exports = {
  isAdmin,
  isCPF,
}