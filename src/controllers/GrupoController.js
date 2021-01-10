const Grupo = require('../model/vo/Grupo');
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

		const grupos = await Grupo.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(grupos)
	},

	async store(req, res) {
		const { nome } = req.body;

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		const grupo = await Grupo.create({ nome });

		Auditoria.store(req.userIdLogado, grupo.id, 'grupo', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json(grupo);
	},

	async update(req, res) {
		const { nome, status } = req.body

		await Grupo.update({
			nome,
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'grupo', 'Alteração', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Grupo alterado com sucesso!" });
	},

	async delete(req, res) {
		const status = "Inativo"

		await Grupo.update({
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'grupo', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Grupo deletado com sucesso!" });
	}
}