const Cargo = require('../models/Cargo');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {

		const where = {};

		if(req.query.id) {
			where.id = req.query.id;
		}

		if(req.query.nome) {
			where.nome = req.query.nome;
		}

		if(req.query.descricao) {
			where.descricao = req.query.descricao;
		}

		if(req.query.status) {
			where.status = req.query.status;
		}
	
		cargos = await Cargo.findAll({
			where
		});

		return res.json(cargos);
	},

	async store(req, res) {
		const { nome, status, descricao } = req.body;

		const cargo = await Cargo.create({ nome, status, descricao });

		return res.json(cargo);
	},

	async update(req, res) {
		const { id } = req.params;

		if(!id) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ mensagem: 'Cargo não informado!'});
		}

		const cargo =  await Cargo.findByPk(id);

		if(!cargo) {
			return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Cargo não encontrado!'});
		}

		const { nome, status, descricao } = req.body;

		await Cargo.update({
			nome, status, descricao
		}, {
			where: { id }
		});

		return res.json({ mensagem: "Registro alterado com sucesso!" })
	},

	async delete(req, res) {
		await Cargo.destroy({
			where: {
				id: req.params.id
			}
		});
		return res.json({ mensagem: "Registro excluído com sucesso!" })
	}
};