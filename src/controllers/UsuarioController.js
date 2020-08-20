const Usuario = require('../models/Usuario');
const Cargo = require('../models/Cargo');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {
		try {
			const where = {};

			if (req.query.nome) {
				where.nome = req.query.nome;
			}

			if (req.query.cargo_id) {
				where.cargo_id = req.query.cargo_id;
			}

			if (req.query.email) {
				where.email = req.query.email;
			}

			if (req.query.administrador) {
				where.administrador = req.query.administrador;
			}

			if (req.query.status) {
				where.status = req.query.status;
			} else {
				where.status = 'Ativo';	
			}

			const usuarios = await Usuario.findAll({
				where
			});

			return res.json(usuarios);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({messagem: "Erro ao cadastrar o usuário!"});
		}
	},

	async store(req, res) {
		try {
			const { nome, cargo_id, administrador, email } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'nome não informado!'});
			}

			if (!cargo_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'cargo_id não informado!'});
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'Cargo não encontrado!'});
			}

			if (!email) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'email não informado!'});
			}

			let senha = req.body.senha;

			if (!senha) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'senha não informada!'});
			}

			await Usuario.create({nome, email, senha, administrador, cargo_id});

			return res.status(HTTPStatus.OK).json({messagem: "Usuário cadastrado com sucesso!"});
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({messagem: "Erro ao cadastrar o usuário!"});
		}
	},

	async update(req, res) {
		try {
			const { nome, cargo_id, email, administrador } = req.body;

			const usuario = await Usuario.findByPk(req.params.id);

			if (!usuario) {
				return res.status(HTTPStatus.NOT_FOUND).json({mensagem: 'Usuário não encontrado!'});
			}

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'nome não informado!'});
			}

			if (!cargo_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'cargo_id não informado!'});
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'Cargo não encontrado!'});
			}

			if (!email) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'email não informado!'});
			}

			if (!administrador) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'administrador não informado!'});
			}

			let senha = req.body.senha;

			if (!senha) {
				return res.status(HTTPStatus.BAD_REQUEST).json({messagem: 'senha não informada!'});
			}

			await Usuario.update({
				nome, cargo_id, email, senha, status, administrador
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.json({messagem: "Usuário alterado com sucesso!"});
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({messagem: "Erro ao alterar o usuário!"});
		}

	},

	async delete(req, res) {
		try {
			const usuario = await Usuario.findByPk(req.params.id);

			if (!usuario) {
				return res.status(HTTPStatus.NOT_FOUND).json({mensagem: 'Usuário não encontrado!'});
			}

			await Usuario.update({
				status: 'Inativo'
			},{
				where: {
					id: usuario.id
				}
			});

			return res.json({messagem: "Usuário excluído com sucesso!"})
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({messagem: "Erro ao alterar o usuário!"});
		}
	}
};