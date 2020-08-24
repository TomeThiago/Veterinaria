const Usuario = require('../models/Usuario');
const Cargo = require('../models/Cargo');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const { isAdmin } = require('../validation/isAdmin');

module.exports = {
	async index(req, res) {
		try {
			const where = {};

			if (!req.params.id) {
				if (req.query.nome) {
					where.nome = { [Op.like]: `%${req.query.nome}%` };
				}

				if (req.query.cargo_id) {
					where.cargo_id = req.query.cargo_id;
				}
			} else {

				if (! await isAdmin(req.userIdLogado)) {
					if (req.userIdLogado != req.params.id) {
						return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
					}
				}

				where.id = req.params.id;
			}

			if (req.query.status) {
				where.status = req.query.status;
			} else {
				where.status = 'Ativo';
			}

			const usuarios = await Usuario.findAll({
				where
			});

			return res.status(HTTPStatus.OK).json(usuarios);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao consultar os usuários!" });
		}
	},

	async store(req, res) {
		try {
			const { nome, cargo_id, email } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'nome não informado!' });
			}

			if (!cargo_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'cargo_id não informado!' });
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'Cargo não encontrado!' });
			}

			if (!email) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'email não informado!' });
			}

			if (email.indexOf('@') < 1) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'Formato de email inválido!' });
			}

			const usuarioExistente = await Usuario.findAll({
				where: {
					email
				}
			});

			if (usuarioExistente.length) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'Email já cadastrado!' });
			}

			const administrador = !req.body.administrador ? 'Não' : req.body.administrador;

			let senha = req.body.senha;

			if (!senha) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'senha não informada!' });
			}

			await Usuario.create({ nome, email, senha, administrador, cargo_id });

			return res.status(HTTPStatus.OK).json({ messagem: "Usuário cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o usuário!" });
		}
	},

	async update(req, res) {
		try {

			if (! await isAdmin(req.userIdLogado)) {
				if (req.userIdLogado != req.params.id) {
					return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
				}
			}

			let { nome, cargo_id, email, administrador } = req.body;

			const usuario = await Usuario.findByPk(req.params.id);

			if (!usuario) {
				return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Usuário não encontrado!' });
			}

			if (!cargo_id) {
				cargo_id = usuario.cargo_id;
			}

			const cargo = await Cargo.findByPk(cargo_id);

			if (!cargo) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'Cargo não encontrado!' });
			}

			const isAdministrador = await isAdmin(req.userIdLogado);

			if (!req.body.senha) {

				if (!isAdministrador) {
					return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'senha não informada!' });
				}

				req.body.senha = usuario.senha;
			}

			if (!isAdministrador && req.body.senha) {
				if (req.body.senha_antiga) { //O usuario quer colocar uma senha nova, precisa verificar se a antiga é valida antes de mudar
					if (req.body.senha_antiga !== usuario.senha) {
						return res.status(HTTPStatus.UNAUTHORIZED).json({ messagem: 'senha inválida!' });
					}
				} else { //O usuario nao quer trocar a senha mas precisa verificar se a senha está certa
					if (req.body.senha !== usuario.senha) {
						return res.status(HTTPStatus.UNAUTHORIZED).json({ messagem: 'senha inválida!' });
					}
				}
			} else {  //O administrador quer trocar a senha, nem verificar
				if (!isAdministrador) { //Se não achar ele não é administrador
					return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
				}
			}

			const senha = req.body.senha;

			await Usuario.update({
				nome, cargo_id, email, senha, administrador
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
			const usuario = await Usuario.findByPk(req.params.id);

			if (!usuario) {
				return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Usuário não encontrado!' });
			}

			await Usuario.update({
				status: 'Inativo'
			}, {
				where: {
					id: usuario.id
				}
			});

			return res.json({ messagem: "Usuário excluído com sucesso!" })
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o usuário!" });
		}
	}
};