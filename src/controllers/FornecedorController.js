const Fornecedor = require('../model/vo/Fornecedor');
const HTTPStatus = require('http-status');
const { Op } = require("sequelize");
const Auditoria = require('./AuditoriaController');

module.exports = {

  async index(req, res) {
    const where = {};

    if (!req.params.id) {

      if (req.query.nome) {
        where.nome = { [Op.like]: `%${req.query.nome}%` };
      }

      if (req.query.cpf_cnpj) {
        where.cpf_cnpj = req.query.cpf_cnpj;
      }

      if (req.query.rg_ie) {
        where.rg_ie = req.query.rg_ie;
      }

      if (req.query.cidade) {
        where.cidade = { [Op.like]: `%${req.query.cidade}%` };
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

    const fornecedores = await Fornecedor.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(fornecedores);
  },

  async store(req, res) {

    const {
      nome,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      observacao,
      contribuinte
    } = req.body;

    if (!nome) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'nome não informado!' });
    }

    if (!tipo_pessoa) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'tipo_pessoa não informado!' });
    }

    if (!cpf_cnpj) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'cpf_cnpj não informado!' });
    }

    if (!rg_ie) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'rg_ie não informado!' });
    }

    const fornecedor = await Fornecedor.create({
      nome,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      observacao,
      contribuinte,
      status: 'Ativo'
    });

    Auditoria.store(req.userIdLogado, fornecedor.id, 'fornecedor', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json(fornecedor);
  },

  async update(req, res) {
    const fornecedor = await Fornecedor.findByPk(req.params.id);

    if (!fornecedor) {
      return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Fornecedor não encontrado!' });
    }

    const {
      nome,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      observacao,
      contribuinte,
      status
    } = req.body;

    await Fornecedor.update({
      nome,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      cep,
      endereco,
      numero,
      complemento,
      ponto_referencia,
      bairro,
      cidade,
      estado,
      observacao,
      contribuinte,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'fornecedor', 'Alteração', 'Não');

    return res.json({ messagem: "Fornecedor alterado com sucesso!" });
  },

  async delete(req, res) {

    const fornecedor = await Fornecedor.findByPk(req.params.id);

    if (!fornecedor) {
      return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Fornecedor não encontrado!' });
    }

    await Fornecedor.update({
      status: 'Inativo'
    }, {
      where: {
        id: fornecedor.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'fornecedor', 'Exclusão', 'Não');

    return res.json({ messagem: "Fornecedor excluído com sucesso!" })
  }
};