const AreaAtuacao = require('../models/AreaAtuacao');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {
		try {

			const where = {};

			if(!req.params.id){
			
				if (req.query.nome) {
					where.nome = req.query.nome;
				}

				if (req.query.status) {
					where.status = req.query.status
				}
				
			} else {
				where.id = req.params.id;
			}

			const limit = req.query.limit ? req.query.limit : 1000;
			const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;
			
			const areaAtuacao = await AreaAtuacao.findAndCountAll({
				where,
				order: ['id'],
				limit,
        offset
			});

			return res.json(areaAtuacao);
		} catch (err) {
			console.log(err)
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as areas de atuação!" });
		}
	},

	async store(req, res) {
		try {
			const { nome } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			await AreaAtuacao.create({ nome });

			return res.status(HTTPStatus.OK).json({ messagem: "Area de atuação cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a area de atuação!" });
		}
	},

	async update(req, res) {
		try {
			const { nome, status } = req.body

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			await AreaAtuacao.update({
				nome,
				status
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Area de atuação alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a area de atuacao!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await AreaAtuacao.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Area de atuação deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar a area de atuacao!" })
		}
	}
};