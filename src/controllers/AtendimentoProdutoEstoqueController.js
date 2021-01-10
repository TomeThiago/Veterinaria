const AtendimentoProdutoEstoque = require('../model/vo/AtendimentoProdutoEstoque');
const Estoque = require('../model/vo/Estoque');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {
      atendimentoproduto_id: req.params.atendimentoproduto_id
    };

    if (!req.params.id) {

      if (req.query.estoque_id) {
        where.estoque_id = req.query.estoque_id;
      }

      if (req.query.status) {
        where.status = req.query.status
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const atendimentoProduto = await AtendimentoProdutoEstoque.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.json(atendimentoProduto)
  },

  async store(req, res) {

    const { estoque_id } = req.body;

    const atendimentoproduto_id = req.params.atendimentoproduto_id;

    if (!estoque_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'estoque_id não foi informado!' });
    }

    const estoque = await Estoque.findOne({
      where: {
        id: estoque_id,
        status: 'Ativo'
      }
    });

    if (!estoque) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Estoque não encontrado!' });
    }

    const atendimentoProdutoEstoque = await AtendimentoProdutoEstoque.create({ atendimentoproduto_id, estoque_id });

    Auditoria.store(req.userIdLogado, atendimentoProdutoEstoque.id, 'atendimentoestoque', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ mensagem: "Vinculo do estoque do atendimento cadastrado com sucesso!" });
  },

  async update(req, res) {
    const { estoque_id, status } = req.body

    const atendimentoproduto_id = req.params.atendimentoproduto_id;

    if (estoque_id > 0) {
      if (!estoque_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'estoque_id não foi informado!' });
      }

      const estoque = await Estoque.findOne({
        where: {
          id: estoque_id,
          status: 'Ativo'
        }
      });

      if (!estoque) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Estoque não encontrado!' });
      }
    }

    await AtendimentoProdutoEstoque.update({
      atendimentoproduto_id,
      estoque_id,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimentoestoque', 'Alteração', 'Não');

    return res.status(HTTPStatus.OK).json({ mensagem: "Estoque do atendimento alterado com sucesso!" });
  },

  async delete(req, res) {
    const status = "Inativo"

    await AtendimentoProdutoEstoque.update({
      status,
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimentoestoque', 'Exclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ mensagem: "Vinculo do estoque no atendimento deletado com sucesso!" });
  }
}