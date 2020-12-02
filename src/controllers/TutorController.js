const Tutor = require('../model/vo/Tutor');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
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

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const tutores = await Tutor.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(tutores);
  },

  async store(req, res) {
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

    const tutor = await Tutor.create({
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

    Auditoria.store(req.userIdLogado, tutor.id, 'tutor', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(tutor);
  },

  async update(req, res) {
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

    Auditoria.store(req.userIdLogado, req.params.id, 'tutor', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ messagem: "Tutor atualizado com sucesso!" });
  },

  async delete(req, res) {
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

    Auditoria.store(req.userIdLogado, req.params.id, 'tutor', 'Exclusão', 'Não');

    return res.json({ messagem: "Tutor excluído com sucesso!" });
  },
};