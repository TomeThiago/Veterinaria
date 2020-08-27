const Raca = require("../models/Raca");
const Especie = require("../models/Especie");
const HTTPStatus = require("http-status");

module.exports = {
  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {
        if (req.query.nome) {
          where.nome = { [Op.like]: `%${req.query.nome}%` };
        }

        if (req.query.especie_id) {
          where.especie_id = req.query.especie_id;
        }
      } else {
        where.id = req.params.id;
      }

      if (req.query.status) {
        where.status = req.query.status;
      } else {
        where.status = "Ativo";
      }

      const racas = await Raca.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(racas);
    } catch (err) {
      console.log(err);
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao listar as raças!" });
    }
  },

  async store(req, res) {
    try {
      const { nome, especie_id } = req.body;

      if (!nome || !especie_id) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const especie = await Especie.findByPk(especie_id);

      if (!especie) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ erro: "Espécie não encontrada!" });
      }

      await Raca.create({ nome, especie_id });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Raça cadastrada com sucesso!" });
    } catch (err) {
      console.error(err);
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar a raça!" });
    }
  },

  async update(req, res) {
    try {
		const { nome, especie_id } = req.body;

		if (!nome || !especie_id) {
		  return res
			.status(HTTPStatus.BAD_REQUEST)
			.json({ messagem: "Preencha todos os campos!" });
		}

		const raca = await Raca.findByPk(req.params.id);

		if (!raca) {
		  return res
			.status(HTTPStatus.NOT_FOUND)
			.json({ mensagem: "Raca não encontrado!" });
		}
  
		const especie = await Especie.findByPk(especie_id);
  
		if (!especie) {
		  return res
			.status(HTTPStatus.BAD_REQUEST)
			.json({ erro: "Espécie não encontrada!" });
		}

      await Raca.update(
        {
          nome,
          especie_id
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Raça alterada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar a raça!" });
    }
  },

  async delete(req, res) {
    try {
		const raca = await Raca.findByPk(req.params.id);

		if (!raca) {
		  return res
			.status(HTTPStatus.NOT_FOUND)
			.json({ mensagem: "Raça não encontrado!" });
		}

      await Raca.update(
        {
			status: "Inativo",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Raça excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar a raça!" });
    }
  },
};
