const AreaAtuacao = require("../models/AreaAtuacao");
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

      const areaAtuacao = await AreaAtuacao.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(areaAtuacao);
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar area de atuação!" });
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

      await AreaAtuacao.create({ nome });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Area de atuação cadastrada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o area de atuação!" });
    }
  },

  async update(req, res) {
    try {
      const { nome } = req.body;

      const areaAtuacao = await AreaAtuacao.findByPk(req.params.id);

      if (!areaAtuacao) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ mensagem: "Area de atuação não encontrado!" });
      }

      await AreaAtuacao.update(
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
        .json({ messagem: "Area de atuação alterada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar area de atuação!" });
    }
  },

  async delete(req, res) {
    try {
      const areaAtuacao = await AreaAtuacao.findByPk(req.params.id);

      if (!areaAtuacao) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ mensagem: "Area de atuação não encontrado!" });
      }

      await AreaAtuacao.update(
        {
          status: "Inativo",
        },
        {
          where: {
            id: areaAtuacao.id,
          },
        }
      );

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Area de atuação excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o area de atuação!" });
    }
  },
};
