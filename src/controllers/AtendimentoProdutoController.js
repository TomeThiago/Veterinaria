const AtendimentoProduto = require('../model/vo/AtendimentoProduto');
const AtendimentoProdutoEstoque = require('../model/vo/AtendimentoProdutoEstoque');
const MovimentoEstoque = require('../model/vo/MovimentoEstoque');
const { possuiSaldo } = require('../validation/isValidation');
const { connection } = require('../database/index');
const Produto = require('../model/vo/Produto');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {
      atendimento_id: req.params.atendimento_id
    };

    if (!req.params.id) {

      if (req.query.produto_id) {
        where.produto_id = req.query.produto_id;
      }

      if (req.query.status) {
        where.status = req.query.status
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const atendimentoProduto = await AtendimentoProduto.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.json(atendimentoProduto)
  },

  async store(req, res) {
    const { produto_id, quantidade, estoques } = req.body;

    const atendimento_id = req.params.atendimento_id;

    if (!produto_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'produto_id não foi informado!' });
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

    if (!quantidade) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'quantidade não foi informado!' });
    }

    if (!estoques) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'estoques não foi informado!' });
    } else {
      console.log(estoques);
    }

    const atendimentoProduto = await AtendimentoProduto.create({ atendimento_id, produto_id, quantidade });

    await estoques.map(async (estoque) => {

      const atendimentoProdutoEstoque = await AtendimentoProdutoEstoque.create({
        atendimentoproduto_id: atendimentoProduto.id,
        estoque_id: estoque.estoque_id,
        quantidade: estoque.quantidade,
      });

      Auditoria.store(req.userIdLogado, atendimentoProdutoEstoque.id, 'atendimentoprodutoestoque', 'Inclusão', 'Não');

      if (await possuiSaldo(estoque.estoque_id, estoque.quantidade)) {
        await AtendimentoProduto.sequelize.query(`UPDATE estoque SET quantidade = quantidade - ${estoque.quantidade} WHERE id = ${estoque.estoque_id}`);
      } else {
        return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: `Estoque ${estoque.estoque_id} sem saldo!` });
      }

      const movimentaEstoque = await MovimentoEstoque.create({
        estoque_id: estoque.estoque_id,
        tipo: 'SAIDA',
        quantidade
      });

      Auditoria.store(req.userIdLogado, movimentaEstoque.id, 'movimentoestoque', 'Inclusão', 'Não');

    });

    Auditoria.store(req.userIdLogado, atendimentoProduto.id, 'atendimentoproduto', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento cadastrado com sucesso!" });
  },

  async update(req, res) {
    const { produto_id, quantidade, status } = req.body

    if (produto_id > 0) {
      const produto = await Produto.findOne({
        where: {
          id: produto_id,
          status: 'Ativo'
        }
      });

      if (!produto) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Produto não encontrado!' });
      }
    }

    await AtendimentoProduto.update({
      produto_id,
      quantidade,
      status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimentoproduto', 'Alteração', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento alterado com sucesso!" });
  },

  async delete(req, res) {
    const status = "Inativo"

    await AtendimentoProduto.update({
      status,
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimentoproduto', 'Exclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento deletado com sucesso!" });
  }
}