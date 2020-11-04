const Grupo = require('../model/vo/Grupo');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		try {

			const where = {};

			if(!req.params.id){
			
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
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os grupos!" });
		}
	},

	async store(req, res) {

		try {
			const { nome } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			const grupo = await Grupo.create({ nome });
			
			Auditoria.store(req.userIdLogado, grupo.id , 'grupo', 'Inclusão', 'Não');

			return res.status(HTTPStatus.OK).json(grupo);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o grupo!" });
		}
	},

	async update(req, res) {
		try {
			const { nome, status } = req.body

			await Grupo.update({
				nome,
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'grupo', 'Alteração', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Grupo alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o grupo!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await Grupo.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'grupo', 'Exclusão', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Grupo deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar o grupo!" })
		}
	}
}