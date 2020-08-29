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

module.exports = {
  isAdmin,
}