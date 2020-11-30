const Pelagem = require('../model/vo/Pelagem');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {
      if (req.query.nome) {
        where.nome = { [Op.like]: `%${req.query.nome}%` };
      }

      if (req.query.status) {
        where.status = req.query.status
      }
    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const pelagens = await Pelagem.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.json(pelagens)
  },

  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
    }

    const pelagem = await Pelagem.create({ nome });

    Auditoria.store(req.userIdLogado, pelagem.id, 'pelagem', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Pelagem cadastrada com sucesso!" });
  },

  async update(req, res) {
    const { nome, status } = req.body;

    if (!nome) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
    }

    await Pelagem.update({
      nome,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'pelagem', 'Alteração', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Pelagem alterada com sucesso!" });
  },

  async delete(req, res) {
    const status = "Inativo"

    await Pelagem.update({
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'pelagem', 'Exclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Pelagem deletada com sucesso!" });
  }
}