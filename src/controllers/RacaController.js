const Raca = require('../model/vo/Raca');
const Especie = require('../model/vo/Especie');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {
      if (req.query.nome) {
        where.nome = { [Op.like]: `%${req.query.nome}%` };
      }

      if (req.query.especie_id) {
        where.especie_id = req.query.especie_id;
      }

      if (req.query.status) {
        where.status = req.query.status
      }
    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const racas = await Raca.findAndCountAll({
      where,
      include: [{ association: 'especie' }],
      order: ['id'],
      limit,
      offset
    });

    racas.rows.map(raca => {
      raca.dataValues.especie_nome = raca.dataValues.especie.nome;
      raca.dataValues.especie = undefined;
      return raca;
    });

    return res.json(racas);
  },

  async store(req, res) {
    const { nome, especie_id } = req.body;

    if (!nome) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
    }

    if (!especie_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'especie_id não informado!' });
    }

    const especie = await Especie.findOne({
      where: {
        id: especie_id,
        status: 'Ativo'
      }
    });

    if (!especie) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Espécie não encontrada ou inativo!' });
    }

    const raca = await Raca.create({ nome, especie_id });

    Auditoria.store(req.userIdLogado, raca.id, 'raca', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json({ messagem: "Raça cadastrada com sucesso!" });
  },

  async update(req, res) {
    const { nome, especie_id, status } = req.body;

    if (!nome) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
    }

    if (!especie_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'especie_id não informado!' });
    }

    const especie = await Especie.findOne({
      where: {
        id: especie_id,
        status: 'Ativo'
      }
    });

    if (!especie) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Espécie não encontrada!' });
    }

    await Raca.update({
      nome, especie_id, status
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'raca', 'Alteração', 'Não');

    return res.json({ messagem: "Raça alterada com sucesso!" });
  },

  async delete(req, res) {
    const status = "Inativo"

    await Raca.update({
      status,
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'raca', 'Exclusão', 'Não');

    return res.json({ message: "Raça excluída com sucesso!" })
  }
};