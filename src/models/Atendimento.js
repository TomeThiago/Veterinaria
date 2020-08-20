const Usuario = require('../models/Usuario');
const Cargo = require('../models/Cargo');
const HTTPStatus = require('http-status');
const bcrypt = require('bcryptjs');

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

			if (req.query.status) {
				where.status = req.query.status;
			}

			const usuarios = await Usuario.findAll({
				where
			});

			return res.json(usuarios);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o usuário!" });
		}
	},

	async store(req, res) {

		try {

			const { nome, cargo_id, email, status } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			if (!cargo_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'cargo_id não informado!' });
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Cargo não encontrado!' });
			}

			if (!email) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'email não informado!' });
			}

			let senha = req.body.senha;

			if (!senha) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'senha não informada!' });
			}

			await Usuario.create({ nome, email, senha, status, cargo_id });

			return res.status(HTTPStatus.OK).json({ messagem: "Usuário cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o usuário!" });
		}

	},

	async update(req, res) {

		try {

			const { nome, cargo_id, email, status } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			if (!cargo_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'cargo_id não informado!' });
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Cargo não encontrado!' });
			}

			if (!email) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'email não informado!' });
			}

			let senha = req.body.senha;

			if (!senha) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'senha não informada!' });
			}

			const hash = await bcrypt.hash(senha, 10);
			senha = hash;


			await Usuario.update({
				nome, cargo_id, email, senha, status
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.json({ messagem: "Usuário alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o usuário!" });
		}

	},

	async delete(req, res) {
		try {

			await Usuario.destroy({
				where: {
					id: req.params.id
				}
			});

			return res.json({message: "Usuário excluído com sucesso!"})
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o usuário!" });
		}
	}
};