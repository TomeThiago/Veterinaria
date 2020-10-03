const MovimentoEstoque = require('../models/MovimentoEstoque');
const Estoque = require('../models/Estoque');
const HTTPStatus = require('http-status');
const { possuiSaldo } = require('../validation/isValidation');
const { connection } = require('../database/index');

module.exports = {
  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {
        if (req.query.estoque_id) {
          where.estoque_id = req.query.estoque_id
        };

        if(req.query.tipo.toUpperCase()) {
          where.estoque_id = req.query.estoque_id;
        }

      } else {
        where.id = req.params.id;
      }

      const movimentacao = await MovimentoEstoque.findAll({
        where,
        order: ['id']
      });

      return res.status(HTTPStatus.OK).json(movimentacao);
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar a movimentação!" });
    }
  },

  async store(req, res) {
    try {
      const { estoque_id, tipo, quantidade } = req.body;

      if (!estoque_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'estoque_id não informado!' });
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

      if (!tipo) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipo não informado!' });
      }

      if (!quantidade) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'quantidade não informada!' });
      }

      const tipoMovimentacao = tipo.toUpperCase();

      switch (tipoMovimentacao) {
        case 'ENTRADA':
          connection.query(`UPDATE estoque SET quantidade = quantidade + ${quantidade} WHERE id = ${estoque_id}`);
          break;
        case 'SAIDA':

          if (await possuiSaldo(estoque_id, quantidade)) {
            connection.query(`UPDATE estoque SET quantidade = quantidade - ${quantidade} WHERE id = ${estoque_id}`);
            break;
          } else {
            return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: 'Estoque sem saldo!' });
          }
        case 'AJUSTE':
          connection.query(`UPDATE estoque SET quantidade = ${quantidade} WHERE id = ${estoque_id}`);
          break;
        default:
          return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: "Tipo de movimentação inválido!" });
      }

      await MovimentoEstoque.create({ estoque_id, tipoMovimentacao, quantidade });

      return res.status(HTTPStatus.OK).json({ mensagem: "Movimentação efetuada com sucesso!" });
    } catch (err) {
      console.log(err)
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao efetuar a movimentação de estoque!" });
    }
  }
}