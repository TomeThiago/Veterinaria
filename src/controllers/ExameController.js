const Exame = require("../models/Exame");
const TipoExame = require("../models/TipoExame");
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

      const cor = await Exame.findAll({
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
      const { nome, tipoexame } = req.body;

      if (!nome || !tipoexame) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const tipodoexame = await TipoExame.findByPk(tipoexame);

      if (!tipodoexame) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Tipo de exame não encontrado!" });
      }

      await Exame.create({ nome, tipoexame });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Exame cadastrado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o exame!" });
    }
  },

  async update(req, res) {
    try {
      const { nome, tipoexame } = req.body;

      const exame = await Exame.findByPk(req.params.id);

      if (!exame) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ mensagem: "Exame não encontrado!" });
      }

      if (!nome || !tipoexame) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const tipodoexame = await TipoExame.findByPk(tipoexame);

      if (!tipodoexame) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Tipo de exame não encontrado!" });
      }

      await Exame.update(
        {
          nome,
          tipoexame,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Tipo de exame alterado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar tipo de exame!" });
    }
  },

  async delete(req, res) {
    try {
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

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Exame excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o exame!" });
    }
  },
};
