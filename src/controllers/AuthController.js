const Usuario = require('../model/vo/Usuario');
const HTTPStatus = require('http-status');
const jwt = require('jsonwebtoken');
const SHA256 = require('crypto-js/sha256');

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: 86400,
  });
}

module.exports = {
  async index(req, res) { 
    let { email, senha } = req.body;

    email = email.toLowerCase();
    senha = SHA256(`${senha}#SysVet!20`).toString();

    const usuario = await Usuario.findOne({
      where: {
        email,
        senha,
        status: 'Ativo'
      }
    });

    if (!usuario) {
      return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Usuário ou senha inválido!' });
    }

    req.userIdLogado = usuario.id;

    const token = generateToken(usuario.id);

    return res.status(HTTPStatus.OK).json({ token: token, usuario: usuario.id, administrador: usuario.administrador });
  },
}