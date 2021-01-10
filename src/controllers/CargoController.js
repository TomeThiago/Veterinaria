const Cargo = require('../model/vo/Cargo');
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

		const cargos = await Cargo.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(cargos)
	},

	async store(req, res) {

		const { nome, descricao } = req.body;

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		const cargo = await Cargo.create({ nome, descricao });

		Auditoria.store(req.userIdLogado, cargo.id, 'cargo', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json(cargo);
	},

	async update(req, res) {
		const { nome, status, descricao } = req.body

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		await Cargo.update({
			nome,
			status,
			descricao
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'cargo', 'Alteração', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Cargo alterado com sucesso!" });
	},

	async delete(req, res) {
		const status = "Inativo"

		await Cargo.update({
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'cargo', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Cargo deletado com sucesso!" });
	}
}