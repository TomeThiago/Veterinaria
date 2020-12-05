const Usuario = require('../model/vo/Usuario');
const Cargo = require('../model/vo/Cargo');
const HTTPStatus = require('http-status');
const { Op } = require('sequelize');
const { isAdmin } = require('../validation/isValidation');
const SHA256 = require('crypto-js/sha256');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {};

		if (!req.params.id) {
			if (req.query.nome) {
				where.nome = { [Op.like]: `%${req.query.nome}%` };
			}

			if (req.query.cargo_id) {
				where.cargo_id = req.query.cargo_id;
			}

			if (req.query.status) {
				where.status = req.query.status;
			}
		} else {

			if (! await isAdmin(req.userIdLogado)) {
				if (req.userIdLogado != req.params.id) {
					return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
				}
			}

			where.id = req.params.id;
		}

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const usuarios = await Usuario.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		usuarios.rows.map(usuario => usuario.senha = undefined);

		return res.status(HTTPStatus.OK).json(usuarios);
	},

	async store(req, res) {
		const { nome, cargo_id } = req.body;

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

		let email = req.body.email.toLowerCase();

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

		let senha = SHA256(`${req.body.senha}#SysVet!20`).toString();

		if (!senha) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'senha não informada!' });
		}

		const administrador = !req.body.administrador ? false : req.body.administrador;

		if (administrador & req.userIdLogado <= 0) {
			console.log(req.userIdLogado);
			return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'Apenas administradores podem criar novos administradores' });
		}

		const usuario = await Usuario.create({ nome, email, senha, administrador, cargo_id });

		Auditoria.store(req.userIdLogado, usuario.id, 'usuario', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Usuário cadastrado com sucesso!" });
	},

	async update(req, res) {
		if (! await isAdmin(req.userIdLogado)) {
			if (req.userIdLogado != req.params.id) {
				return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
			}
		}

		let { nome, cargo_id, administrador, status } = req.body;

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

		let email;

		if (req.body.email != undefined && req.body.email.length > 0) {
			email = req.body.email.toLowerCase();

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
		}

		if (!isAdministrador && req.body.senha) {
			if (req.body.senha_antiga) { //O usuario quer colocar uma senha nova, precisa verificar se a antiga é valida antes de mudar
				const senha_antiga = SHA256(`${req.body.senha_antiga}#SysVet!20`).toString();
				if (senha_antiga !== usuario.senha) {
					return res.status(HTTPStatus.UNAUTHORIZED).json({ messagem: 'senha inválida!' });
				}
			} else { //O usuario nao quer trocar a senha mas precisa verificar se a senha está certa

				const senha_atual = SHA256(`${req.body.senha}#SysVet!20`).toString();

				if (senha_atual !== usuario.senha) {
					return res.status(HTTPStatus.UNAUTHORIZED).json({ messagem: 'senha inválida!' });
				}
			}
		} else {  //O administrador quer trocar a senha, nem verificar
			if (!isAdministrador) { //Se não achar ele não é administrador
				return res.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: 'Processo não autorizado' });
			}
		}

		const senha = SHA256(`${req.body.senha}#SysVet!20`).toString();

		await Usuario.update({
			nome, email, cargo_id, senha, administrador, status
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'usuario', 'Alteração', 'Não');

		return res.json({ messagem: "Usuário alterado com sucesso!" });
	},

	async delete(req, res) {
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

		Auditoria.store(req.userIdLogado, req.params.id, 'usuario', 'Exclusão', 'Não');

		return res.json({ messagem: "Usuário excluído com sucesso!" })
	}
};