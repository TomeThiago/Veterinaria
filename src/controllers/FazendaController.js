const Fazenda = require("../model/vo/Fazenda");
const HTTPStatus = require("http-status");
const { Op } = require("sequelize");
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {
      if (req.query.nome) {
        where.nome = { [Op.like]: `%${req.query.nome}%` };
      }

      if (req.query.cidade) {
        where.cidade = { [Op.like]: `%${req.query.cidade}%` };
      }

      if (req.query.status) {
        where.status = req.query.status;
      }
    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const fazenda = await Fazenda.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(fazenda);
  },

  async store(req, res) {
    const {
      nome,
      telefone,
      email,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado
    } = req.body;

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "nome não informado!" });
    }

    const fazenda = await Fazenda.create({
      nome,
      telefone,
      email,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado
    });

    Auditoria.store(req.userIdLogado, fazenda.id, 'fazenda', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(fazenda);
  },

  async update(req, res) {
    const fazenda = await Fazenda.findByPk(req.params.id);

    if (!fazenda) {
      return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Fazenda não encontrada!' });
    }

    const {
      nome,
      telefone,
      email,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      status
    } = req.body;

    await Fazenda.update({
      nome,
      telefone,
      email,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      status
    },
      {
        where: {
          id: req.params.id,
        },
      });

    Auditoria.store(req.userIdLogado, req.params.id, 'fazenda', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Fazenda atualizado com sucesso!" });
  },

  async delete(req, res) {
    const fazenda = await Fazenda.findByPk(req.params.id);

    if (!fazenda) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Fazenda não encontrada!" });
    }

    await Fazenda.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: fazenda.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'fazenda', 'Exclusão', 'Não');

    return res.json({ mensagem: "Fazenda excluída com sucesso!" });
  },
};