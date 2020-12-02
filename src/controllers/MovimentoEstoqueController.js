const MovimentoEstoque = require('../model/vo/MovimentoEstoque');
const Estoque = require('../model/vo/Estoque');
const HTTPStatus = require('http-status');
const { possuiSaldo } = require('../validation/isValidation');
const { connection } = require('../database/index');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {
      if (req.query.estoque_id) {
        where.estoque_id = req.query.estoque_id
      };

      if (req.query.tipo) {
        where.tipo = req.query.tipo.toUpperCase();
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const movimentacao = await MovimentoEstoque.findAndCountAll({
      where,
      order: ['id'],
      limit,
      offset
    });

    return res.status(HTTPStatus.OK).json(movimentacao);
  },

  async store(req, res) {
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
        MovimentoEstoque.sequelize.query(`UPDATE estoque SET quantidade = quantidade + ${quantidade} WHERE id = ${estoque_id}`);
        break;
      case 'SAIDA':
        if (await possuiSaldo(estoque_id, quantidade)) {
          MovimentoEstoque.sequelize.query(`UPDATE estoque SET quantidade = quantidade - ${quantidade} WHERE id = ${estoque_id}`);
        } else {
          return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: 'Estoque sem saldo!' });
        }
        break;
      case 'AJUSTE':
        MovimentoEstoque.sequelize.query(`UPDATE estoque SET quantidade = ${quantidade} WHERE id = ${estoque_id}`);
        break;
      default:
        return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: "Tipo de movimentação inválido!" });
    }

    const movimentaEstoque = await MovimentoEstoque.create({ estoque_id, tipo: tipoMovimentacao, quantidade });

    Auditoria.store(req.userIdLogado, movimentaEstoque.id, 'movimentoestoque', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ mensagem: "Movimentação efetuada com sucesso!" });
  }
}