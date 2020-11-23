const Cfop = require('../model/vo/Cfop');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		try {
			const where = {};

			if(!req.params.id){
        if (req.query.cfop) {
					where.cfop = { [Op.like]: `%${req.query.cfop}%` };
        }
        
				if (req.query.descricao) {
					where.descricao = { [Op.like]: `%${req.query.descricao}%` };
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
			const { cfop, descricao } = req.body;

			if (!cfop) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'cfop não informado!' });
			}

			const data = await Cfop.create({ cfop, descricao });

			Auditoria.store(req.userIdLogado, data.id , 'cfop', 'Inclusão', 'Não');

			return res.status(HTTPStatus.OK).json(data);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o cfop!" });
		}
	},

	async update(req, res) {
		try {
			const { cfop, descricao, status } = req.body

			await Cfop.update({
				cfop,
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