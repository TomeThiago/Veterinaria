const AtendimentoProduto = require('../model/vo/AtendimentoProduto');
const Produto = require('../model/vo/Produto');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    try {

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
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os produtos do atendimento!" });
    }
  },

  async store(req, res) {

    try {
      const { produto_id, quantidade } = req.body;

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

      const atendimentoProduto = await AtendimentoProduto.create({ atendimento_id, produto_id, quantidade });

      Auditoria.store(req.userIdLogado, atendimentoProduto.id , 'atendimentoproduto', 'Inclusão', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento cadastrado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o cargo!" });
    }
  },

  async update(req, res) {

    try {
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

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimentoproduto', 'Alteração', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento alterado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o cargo!" });
    }
  },

  async delete(req, res) {
    try {
      const status = "Inativo"

      await AtendimentoProduto.update({
        status,
      }, {
        where: {
          id: req.params.id
        }
      });

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimentoproduto', 'Exclusão', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Produto do atendimento deletado com sucesso!" });
    } catch (err) {
      return res.json({ message: "Erro ao deletar o produto do atendimento!" })
    }
  }
}