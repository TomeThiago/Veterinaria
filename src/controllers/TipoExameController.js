const TipoExame = require('../model/vo/TipoExame');
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

    const tipoExame = await TipoExame.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(tipoExame);
  },

  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "nome não informado!" });
    }

    const tipoExame = await TipoExame.create({ nome });

    Auditoria.store(req.userIdLogado, tipoExame.id, 'tipoexame', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(tipoExame);
  },

  async update(req, res) {
    const { nome, status } = req.body;

    const tipoexame = await TipoExame.findByPk(req.params.id);

    if (!tipoexame) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Tipo de exame não encontrado!" });
    }

    await TipoExame.update({
      nome,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'tipoexame', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Tipo de exame alterado com sucesso!" });
  },

  async delete(req, res) {
    const tipoexame = await TipoExame.findByPk(req.params.id);

    if (!tipoexame) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Tipo Exame não encontrado!" });
    }

    await TipoExame.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: tipoexame.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'tipoexame', 'Exclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Tipo Exame excluído com sucesso!" });
  },
}