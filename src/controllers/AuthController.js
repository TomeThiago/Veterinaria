const Usuario = require('../models/Usuario');
const HttpStatus = require('http-status');
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario.findOne({
        where: {
          email,
          senha,
          status: 'Ativo'
        }
      });

      if (!usuario) {
        return res.status(HttpStatus.NOT_FOUND).json({ messagem: 'Usuário ou senha inválido!' });
      }

      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      return res.status(HttpStatus.OK).json({ token });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro na autenticação do usuário!" });
    }
  },
}