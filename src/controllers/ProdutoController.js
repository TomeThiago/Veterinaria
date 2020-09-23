const Produto = require('../models/Produto');
const Grupo = require('../models/Grupo');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');

module.exports = {
	async index(req, res) {
		try {

			const where = {};

			if(!req.params.id){
			
				if (req.query.descricao) {
					where.descricao = { [Op.like]: `%${req.query.descricao}%` };
				}

        if (req.query.grupo_id) {
					where.grupo_id = req.query.grupo_id
        }

        if (req.query.vacina) {
					where.vacina = req.query.vacina
        }
        
				if (req.query.status) {
					where.status = req.query.status
				}
				
			} else {
				where.id = req.params.id;
			}

			const produtos = await Produto.findAll({
				where
			});

			return res.json(produtos)
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os produtos!" });
		}
	},

	async store(req, res) {

		try {
			const { descricao, preco_custo, grupo_id, vacina } = req.body;

			if (!descricao) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
      }
      
      if (!preco_custo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'preco_custo não informado!' });
      }

      if (!grupo_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'grupo_id não informado!' });
      }

      const grupo = await Grupo.findOne({
        where: {
          id: grupo_id,
          status: 'Ativo'
        }
      });

      if (!grupo) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Grupo não encontrado ou inativo!' });
      }
      
      if (!vacina) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'vacina não informado!' });
			}

			const produto = await Produto.create({ descricao, preco_custo, grupo_id, vacina });

			return res.status(HTTPStatus.OK).json(produto);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o produto!" });
		}
	},

	async update(req, res) {
		try {
			const { descricao, preco_custo, grupo_id, vacina, status } = req.body

      const grupo = await Grupo.findOne({
        where: {
          id: grupo_id,
          status: 'Ativo'
        }
      });

      if (!grupo) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Grupo não encontrado ou inativo!' });
      }

			await Produto.update({
        descricao,
        preco_custo,
        grupo_id,
        vacina,
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Produto alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o produto!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await Produto.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Produto deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar o produto!" })
		}
	}
}