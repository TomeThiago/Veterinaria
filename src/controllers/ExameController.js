const Exame = require("../model/vo/Exame");
const TipoExame = require("../model/vo/TipoExame");
const HTTPStatus = require("http-status");
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

    const exame = await Exame.findAll({
      where,
    });

    return res.status(HTTPStatus.OK).json(exame);
  },

  async store(req, res) {
    const { nome, tipoexame_id } = req.body;

    if (!nome || !tipoexame_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Preencha todos os campos!" });
    }

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "nome não informado!" });
    }

    if (!tipoexame_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "tipoexame_id não informado!" });
    }

    const tipodoexame = await TipoExame.findOne({
      where: {
        id: tipoexame_id,
        status: 'Ativo'
      }
    });

    if (!tipodoexame) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Tipo de exame não encontrado!" });
    }

    const exame = await Exame.create({ nome, tipoexame_id });

    Auditoria.store(req.userIdLogado, exame.id, 'exame', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Exame cadastrado com sucesso!" });
  },

  async update(req, res) {

    const { nome, tipoexame_id, status } = req.body;

    const exame = await Exame.findByPk(req.params.id);

    if (!exame) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Exame não encontrado!" });
    }

    if (tipoexame_id) {
      const tipodoexame = await TipoExame.findByPk(tipoexame_id);

      if (!tipodoexame) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Tipo de exame não encontrado!" });
      }
    }

    await Exame.update(
      {
        nome,
        tipoexame_id,
        status
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'exame', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Exame alterado com sucesso!" });
  },

  async delete(req, res) {

    const exame = await Exame.findByPk(req.params.id);

    if (!exame) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Exame não encontrado!" });
    }

    await Exame.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: exame.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'exame', 'Exclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Exame excluído com sucesso!" });
  },
};