const Especie = require('../model/vo/Especie');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {};

		if (!req.params.id) {
			if (req.query.nome) {
				where.nome = { [Op.like]: `%${req.query.nome}%` };
			}

			if (req.query.status) {
				where.status = req.query.status
			}
		} else {
			where.id = req.params.id;
		}

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const especies = await Especie.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(especies)
	},

	async store(req, res) {
		const { nome } = req.body;

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		const especie = await Especie.create({ nome });

		Auditoria.store(req.userIdLogado, especie.id, 'especie', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Espécie cadastrada com sucesso!" });
	},

	async update(req, res) {
		const { nome, status } = req.body;

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		await Especie.update({
			nome,
			status
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'especie', 'Alteração', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Espécie alterada com sucesso!" });
	},

	async delete(req, res) {
		const status = "Inativo"

		await Especie.update({
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'especie', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Espécie deletada com sucesso!" });
	}
}