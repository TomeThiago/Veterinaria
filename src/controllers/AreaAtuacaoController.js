const AreaAtuacao = require('../models/AreaAtuacao');

module.exports = {
	async index(req, res) {

		const where = {};

		if (req.query.id) {
			where.id = req.query.id;
		}

		if (req.query.nome) {
			where.nome = req.query.nome;
		}

		if (req.query.status) {
			where.status = req.query.status;
		}

		const areaAtuacao = await AreaAtuacao.findAll({
			where
		});

		return res.json(areaAtuacao);
	},

	async store(req, res) {
		const { nome, status } = req.body;

		const areaAtuacao = await AreaAtuacao.create({ nome, status });

		return res.json(areaAtuacao);
	},

	async update(req, res) {
		const { nome, status } = req.body;

		await AreaAtuacao.update({
			nome, status
		}, {
			where: {
				id: req.params.id
			}
		});

		return res.json({ message: "Registro alterado com sucesso!" })
	},

	async delete(req, res) {
		await AreaAtuacao.destroy({
			where: {
				id: req.params.id
			}
		});
		return res.json({ message: "Registro excluído com sucesso!" })
	}
};