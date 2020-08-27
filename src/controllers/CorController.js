const Cor = require("../models/Cor");
const HTTPStatus = require('http-status');

module.exports = {
  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {
        if (req.query.nome) {
            where.nome = { [Op.like]: `%${req.query.nome}%` };
        }
      } else {
        where.id = req.params.id;
      }

      if (req.query.status) {
        where.status = req.query.status;
      } else {
        where.status = "Ativo";
      }

      const cor = await Cor.findAll({
        where,
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
          .json({ messagem: "Preencha todos os campos!" });
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
      const { nome } = req.body;

      if (!nome) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const cor = await Cor.findByPk(req.params.id);

      if (!cor) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ mensagem: "Cor não encontrado!" });
      }

      await Cor.update(
        {
          nome,
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
        .json({ messagem: "Cor excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o cor!" });
    }
  },
};
