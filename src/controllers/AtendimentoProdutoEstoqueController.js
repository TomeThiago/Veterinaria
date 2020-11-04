const AtendimentoProdutoEstoque = require('../model/vo/AtendimentoProdutoEstoque');
const Estoque = require('../model/vo/Estoque');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    try {

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
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os estoques ultilizados no atendimento!" });
    }
  },

  async store(req, res) {

    try {
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

      Auditoria.store(req.userIdLogado, atendimentoProdutoEstoque.id , 'atendimentoestoque', 'Inclusão', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Vinculo do estoque do atendimento cadastrado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao vincular o estoque do atendimento!" });
    }
  },

  async update(req, res) {

    try {
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

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimentoestoque', 'Alteração', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Estoque do atendimento alterado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o vinculo do estoque!" });
    }
  },

  async delete(req, res) {
    try {
      const status = "Inativo"

      await AtendimentoProdutoEstoque.update({
        status,
      }, {
        where: {
          id: req.params.id
        }
      });

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimentoestoque', 'Exclusão', 'Não');

      return res.status(HTTPStatus.OK).json({ messagem: "Vinculo do estoque no atendimento deletado com sucesso!" });
    } catch (err) {
      return res.json({ message: "Erro ao deletar o vinculo do estoque do atendimento!" })
    }
  }
}