const Cor = require("../models/Cor");
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    try {
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
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar cor!" });
    }
  },

  async store(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "nome não informado!" });
      }

      await Cor.create({ nome });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Cor cadastrada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o cor!" });
    }
  },

  async update(req, res) {
    try {
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

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Cor alterada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar cor!" });
    }
  },

  async delete(req, res) {
    try {
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

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Cor excluída com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o cor!" });
    }
  },
};