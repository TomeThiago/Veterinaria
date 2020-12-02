const Cor = require("../model/vo/Cor");
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
        where.status = req.query.status;
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const cor = await Cor.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(cor);
  },

  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ messagem: "nome não informado!" });
    }

    const cor = await Cor.create({ nome });

    Auditoria.store(req.userIdLogado, cor.id, 'cor', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(cor);
  },

  async update(req, res) {
    const { nome, status } = req.body;

    const cor = await Cor.findByPk(req.params.id);

    if (!cor) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Cor não encontrado!" });
    }

    await Cor.update(
      {
        nome,
        status
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'cor', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ messagem: "Cor alterada com sucesso!" });
  },

  async delete(req, res) {
    const cor = await Cor.findByPk(req.params.id);

    if (!cor) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Cor não encontrado!" });
    }

    await Cor.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: cor.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'cor', 'Exclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ messagem: "Cor excluída com sucesso!" });
  },
};