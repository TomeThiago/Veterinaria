const Usuario = require('../models/Usuario');
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

    try {

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
        return res.status(HTTPStatus.NOT_FOUND).json({ messagem: 'Usuário ou senha inválido!' });
      }

      const token = generateToken(usuario.id);

      return res.status(HTTPStatus.OK).json({ token });
    } catch (err) {
      console.log(err)
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro na autenticação do usuário!" });
    }
  },
}