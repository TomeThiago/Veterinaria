const AreaAtuacao = require('../model/vo/AreaAtuacao');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {};

		if (!req.params.id) {

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
	},

	async store(req, res) {
		const { nome } = req.body;

		if (!nome) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
		}

		const areaAtuacao = await AreaAtuacao.create({ nome });

		Auditoria.store(req.userIdLogado, areaAtuacao.id, 'areaatuacao', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json(areaAtuacao);
	},

	async update(req, res) {
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

		Auditoria.store(req.userIdLogado, req.params.id, 'areaatuacao', 'Alteração', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Area de atuação alterado com sucesso!" });
	},

	async delete(req, res) {

		const status = "Inativo"

		await AreaAtuacao.update({
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'areaatuacao', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ mensagem: "Area de atuação deletado com sucesso!" });
	}
};