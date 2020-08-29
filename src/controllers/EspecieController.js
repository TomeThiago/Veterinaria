const Especie = require('../models/Especie');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {
		try {

			const where = {};

			if(!req.params.id) {
				if (req.query.nome) {
					where.nome = req.query.nome;
				}
			} else {
				where.id = req.params.id;
			}

			if (req.query.status) {
				where.status = req.query.status
			} else {
				where.status = 'Ativo'
			}

			const especies = await Especie.findAll({
				where
			});

			return res.json(especies)
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as espécies!" });
		}
	},

	async store(req, res) {

		try {
			const { nome } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			await Especie.create({ nome });

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie cadastrada com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a espécie!" });
		}
	},

	async update(req, res) {

		try {
			const { nome } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			await Especie.update({
				nome,
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie alterada com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a espécie!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await Especie.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie deletada com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar a espécie!" })
		}
	}
}