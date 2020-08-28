const Tutor = require('../models/Tutor');
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

      const tutores = await Tutor.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(tutores);
    } catch (err) {
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

      if (
        !nome ||
        !tipo_pessoa ||
        !cpf_cnpj ||
        !rg_ie ||
        !nacionalidade||
        !sexo ||
        !data_nascimento
      ) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
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
        observacao
      } = req.body;

      const tutor = await Tutor.findByPk(req.params.id);

      if (!tutor) {
          return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Tutor não encontrado!' });
      }

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
        observacao
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
      const tutor = await Tutor.findByPk(req.params.id);

      if (!tutor) {
        return res
          .status(HTTPStatus.NOT_FOUND)
          .json({ mensagem: "Tutor não encontrado!" });
      }

      await Tutor.update(
        {
          status: "Inativo",
        },
        {
          where: {
            id: tutor.id,
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
