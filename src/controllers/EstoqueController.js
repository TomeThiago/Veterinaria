const Estoque = require('../model/vo/Estoque');
const Fornecedor = require('../model/vo/Fornecedor');
const Produto = require('../model/vo/Produto');
const Cfop = require('../model/vo/Cfop');
const MovimentoEstoque = require('../model/vo/MovimentoEstoque');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {

      if (req.query.produto_id) {
        where.produto_id = req.query.produto_id;
      }

      if (req.query.cfop_id) {
        where.cfop_id = req.query.cfop_id;
      }

      if (req.query.fornecedor_id) {
        where.fornecedor_id = req.query.fornecedor_id;
      }

      if (req.query.validade) {
        where.validade = req.query.validade;
      }

      if (req.query.status) {
        where.status = req.query.status;
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const estoques = await Estoque.findAndCountAll({
      where,
      include: [{ association: 'cfop' }, { association: 'produto' }],
      order: ['id'],
      limit,
      offset
    });

    estoques.rows.map(estoque => {
      estoque.dataValues.produto_descricao = estoque.dataValues.produto.descricao;
      estoque.dataValues.cfop_cfop = estoque.dataValues.cfop.cfop;
      estoque.dataValues.cfop = undefined;
      estoque.dataValues.produto = undefined;
      return estoque;
    });

    return res.json(estoques);
  },

  async store(req, res) {
    const {
      produto_id,
      cfop_id,
      fornecedor_id,
      serie_nota,
      numero_nota,
      quantidade,
      lote,
      validade
    } = req.body;

    if (!produto_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'produto_id não informado!' });
    }

    const produto = await Produto.findOne({
      where: {
        id: produto_id,
        status: 'Ativo'
      }
    });

    if (!produto) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Produto não encontrado!' });
    }

    if (!fornecedor_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'fornecedor_id não informado!' });
    }

    const fornecedor = await Fornecedor.findOne({
      where: {
        id: fornecedor_id,
        status: 'Ativo'
      }
    });

    if (!fornecedor) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Fornecedor não encontrado!' });
    }

    if (!cfop_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'cfop_id não informado!' });
    }

    const cfop = await Cfop.findOne({
      where: {
        id: cfop_id,
        status: 'Ativo'
      }
    });

    if (!cfop) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'CFOP não encontrado!' });
    }

    const estoque = await Estoque.create({
      produto_id,
      cfop_id,
      fornecedor_id,
      serie_nota,
      numero_nota,
      lote,
      quantidade,
      validade
    });

    const movimentaEstoque = await MovimentoEstoque.create({
      estoque_id: estoque.id,
      tipo: 'ENTRADA',
      quantidade
    });

    Auditoria.store(req.userIdLogado, movimentaEstoque.id, 'movimentoestoque', 'Inclusão', 'Não');
    Auditoria.store(req.userIdLogado, estoque.id, 'estoque', 'Inclusão', 'Não');

    return res.json(estoque);
  },

  async update(req, res) {
    const {
      produto_id,
      cfop_id,
      fornecedor_id,
      serie_nota,
      numero_nota,
      lote,
      validade,
      status } = req.body;

    if (!produto_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'produto_id não informado!' });
    }

    const produto = await Produto.findOne({
      where: {
        id: produto_id,
        status: 'Ativo'
      }
    });

    if (!produto) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Produto não encontrado!' });
    }

    if (!fornecedor_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'fornecedor_id não informado!' });
    }

    const fornecedor = await Fornecedor.findOne({
      where: {
        id: fornecedor_id,
        status: 'Ativo'
      }
    });

    if (!fornecedor) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Fornecedor não encontrado!' });
    }

    if (!cfop_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'cfop_id não informado!' });
    }

    const cfop = await Cfop.findOne({
      where: {
        id: cfop_id,
        status: 'Ativo'
      }
    });

    if (!cfop) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'CFOP não encontrado!' });
    }

    await Estoque.update({
      produto_id,
      cfop_id,
      fornecedor_id,
      serie_nota,
      numero_nota,
      lote,
      validade,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'estoque', 'Alteração', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Estoque alterado com sucesso!" });
  },

  async delete(req, res) {

    await Estoque.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'estoque', 'Exclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ messagem: "Estoque excluído com sucesso!" });
  },

};