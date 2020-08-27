const Fazenda = require("../models/Fazenda");
const HTTPStatus = require("http-status");
const { Op } = require("sequelize");

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

      const fazenda = await Fazenda.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(fazenda);
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar as fazendas!" });
    }
  },

  async store(req, res) {
    try {
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
          .json({ messagem: "Preencha todos os campos!" });
      }

      await Fazenda.create({
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
      });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Fazenda cadastrada com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o fazenda!" });
    }
  },

  async update(req, res) {
    try {
        
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
        estado
      } = req.body;

      if (!nome) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

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
      });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Fazenda atualizado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao atualizar o Paciente!" });
    }
  },

  async delete(req, res) {
    try {
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

      return res.json({ messagem: "Fazenda excluída com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir a fazenda!" });
    }
  },
};