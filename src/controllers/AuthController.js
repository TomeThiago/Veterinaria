const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const HttpStatus = require('http-status');

module.exports = { 
  async index(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
        senha
      }
    });

    if(!usuario) {
      return res.status(HttpStatus.NOT_FOUND).json({messagem: 'Usuário ou senha inválido!'});
    }

    return res.status(HttpStatus.OK).json({mensagem: 'Usuário autenticado!'});
  },
}