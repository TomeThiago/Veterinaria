const Raca = require('../models/Raca');
const Especie = require('../models/Especie');
const HTTPStatus = require('http-status');

module.exports = {
  async index(req, res) {
    try {

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

      const racas = await Raca.findAll({
        where,
				order: ['id']
      });

      return res.json(racas);
    } catch (err) {
      console.log(err)
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as raças!" });
    }
  },

  async store(req, res) {

    try {

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

      await Raca.create({ nome, especie_id });

      return res.status(HTTPStatus.OK).json({ messagem: "Raça cadastrada com sucesso!" });
    } catch (err) {
      console.error(err)
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a raça!" });
    }
  },

  async update(req, res) {

    try {

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

      return res.json({ messagem: "Raça alterada com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a raça!" });
    }

  },

  async delete(req, res) {
    try {
      const status = "Inativo"

      await Raca.update({
        status,
      }, {
        where: {
          id: req.params.id
        }
      });

      return res.json({ message: "Raça excluída com sucesso!" })
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao excluir a raça!" });
    }
  }
};