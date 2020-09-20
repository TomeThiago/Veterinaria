const Tutor = require('../models/Tutor');
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

        if (req.query.sexo) {
          where.sexo = req.query.sexo;
        }

        if (req.query.cidade) {
          where.cidade = req.query.cidade;
        }

        if (req.query.estado) {
          where.estado = req.query.estado;
        }

        if (req.query.status) {
          where.status = req.query.status;
        }
      } else {
        where.id = req.params.id;
      }

      const tutores = await Tutor.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(tutores);
    } catch (err) {
      console.log(err)
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar os tutores!" });
    }
  },

  async store(req, res) {
    try {
      const {
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        nacionalidade,
        sexo,
        data_nascimento,
        cep,
        endereco,
        numero,
        complemento,
        ponto_refencia,
        bairro,
        cidade,
        estado,
        observacao
      } = req.body;

      if (!nome) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "nome não informado!" });
      }

      if (!tipo_pessoa) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "tipo_pessoa não informado!" });
      }

      if (!cpf_cnpj) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "cpf_cnpj não informado!" });
      }

      if (!rg_ie) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "rg_ie não informado!" });
      }

      if (!nacionalidade) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "nacionalidade não informado!" });
      }

      if (!sexo) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "sexo não informado!" });
      }

      if (!data_nascimento) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: "data_nascimento não informado!" });
      }

      await Tutor.create({
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        nacionalidade,
        sexo,
        data_nascimento,
        cep,
        endereco,
        numero,
        complemento,
        ponto_refencia,
        bairro,
        cidade,
        estado,
        observacao
      });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Tutor cadastrado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o tutor!" });
    }
  },

  async update(req, res) {
    try {
      const {
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        nacionalidade,
        sexo,
        data_nascimento,
        cep,
        endereco,
        numero,
        complemento,
        ponto_refencia,
        bairro,
        cidade,
        estado,
        observacao,
        status
      } = req.body;

      await Tutor.update({
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        nacionalidade,
        sexo,
        data_nascimento,
        cep,
        endereco,
        numero,
        complemento,
        ponto_refencia,
        bairro,
        cidade,
        estado,
        observacao,
        status
      },
        {
          where: {
            id: req.params.id,
          },
        });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Tutor atualizado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao atualizar o Tutor!" });
    }
  },

  async delete(req, res) {
    try {
      await Tutor.update(
        {
          status: "Inativo",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.json({ messagem: "Tutor excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o tutor!" });
    }
  },
};