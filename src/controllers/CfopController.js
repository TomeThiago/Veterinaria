const Cfop = require('../model/vo/Cfop');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		try {
			const where = {};

			if(!req.params.id){
        if (req.query.id) {
					where.id = { [Op.like]: `%${req.query.id}%` };
        }
        
				if (req.query.descricao) {
					where.descricao = req.query.descricao;
				}

				if (req.query.status) {
					where.status = req.query.status
				}
				
			} else {
				where.id = req.params.id;
			}

			const limit = req.query.limit ? req.query.limit : 1000;
			const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;
			
			const cfops = await Cfop.findAndCountAll({
				where,
				order: ['id'],
				limit,
				offset
			});

			return res.json(cfops)
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os cfops!" });
		}
	},

	async store(req, res) {
		try {
			const { id, descricao } = req.body;

			if (!id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'id não informado!' });
			}

			const cfop = await Cfop.create({ id, descricao });

			Auditoria.store(req.userIdLogado, cfop.id , 'cfop', 'Inclusão', 'Não');

			return res.status(HTTPStatus.OK).json(cfop);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o cfop!" });
		}
	},

	async update(req, res) {
		try {
			const { id, descricao, status } = req.body

			await Cfop.update({
				id,
				descricao,
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'cfop', 'Alteração', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Cfop alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o cfop!" });
		}
	},

	async delete(req, res) {

		try {
			const status = "Inativo"

			await Cfop.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'cfop', 'Exclusão', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Cfop deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar o cfop!" })
		}
	}
}