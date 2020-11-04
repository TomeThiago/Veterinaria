const Cargo = require('../model/vo/Cargo');
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
			
			const cargos = await Cargo.findAndCountAll({
				where,
				order: ['id'],
				limit,
				offset
			});

			return res.json(cargos)
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os cargos!" });
		}
	},

	async store(req, res) {

		try {
			const { nome, descricao } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			const cargo = await Cargo.create({ nome, descricao });

			Auditoria.store(req.userIdLogado, cargo.id , 'cargo', 'Inclusão', 'Não');

			return res.status(HTTPStatus.OK).json(cargo);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o cargo!" });
		}
	},

	async update(req, res) {

		try {
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

			Auditoria.store(req.userIdLogado, req.params.id , 'cargo', 'Alteração', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Cargo alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o cargo!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await Cargo.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'cargo', 'Exclusão', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Cargo deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar o cargo!" })
		}
	}
}