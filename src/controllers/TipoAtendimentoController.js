const TipoAtendimento = require('../model/vo/TipoAtendimento');
const Auditoria = require('./AuditoriaController');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');

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

    const tipoAtendimento = await TipoAtendimento.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(tipoAtendimento);
  },

  async store(req, res) {
    const { nome, tempo_estimado } = req.body;

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "nome não informado!" });
    }

    if (!tempo_estimado) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "tempo_estimado não informado!" });
    }

    const tipoatendimento = await TipoAtendimento.create({ nome, tempo_estimado });

    Auditoria.store(req.userIdLogado, tipoatendimento.id, 'tipoatendimento', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(tipoatendimento);
  },

  async update(req, res) {
    const { nome, tempo_estimado, status } = req.body;

    const tipoAtendimento = await TipoAtendimento.findByPk(req.params.id);

    if (!tipoAtendimento) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Tipo de atendimento não encontrado!" });
    }

    await TipoAtendimento.update({
      nome,
      tempo_estimado,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'tipoatendimento', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Tipo de atendimento alterado com sucesso!" });
  },

  async delete(req, res) {
    const tipoAtendimento = await TipoAtendimento.findByPk(req.params.id);

    if (!tipoAtendimento) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Tipo de atendimento não encontrado!" });
    }

    await TipoAtendimento.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: tipoAtendimento.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, tipoAtendimento.id, 'tipoatendimento', 'Exclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Tipo de atendimento excluído com sucesso!" });
  },
}