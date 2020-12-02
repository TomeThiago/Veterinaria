const ContatoFornecedor = require('../model/vo/ContatoFornecedor');
const Fornecedor = require('../model/vo/Fornecedor');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {
			fornecedor_id: req.params.fornecedor_id
		};

		if (!req.params.id) {

			if (req.query.tipo) {
				where.tipo = req.query.tipo;
			}

			if (req.query.status) {
				where.status = req.query.status;
			}

		} else {
			where.id = req.params.id;
		}

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const contatos = await ContatoFornecedor.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(contatos);
	},

	async store(req, res) {
		const { tipo, contato, observacao } = req.body;

		const fornecedor_id = req.params.fornecedor_id;

		const fornecedor = await Fornecedor.findByPk(fornecedor_id);

		if (!fornecedor) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Fornecedor não encontrado!' });
		}

		if (!contato) {
			return res
				.status(HTTPStatus.BAD_REQUEST)
				.json({ messagem: "contato não informado!" });
		}

		const contatoFornecedor = await ContatoFornecedor.create({ tipo, contato, observacao, fornecedor_id });

		Auditoria.store(req.userIdLogado, contatoFornecedor.id, 'contatofornecedor', 'Inclusão', 'Não');

		return res.json(contatoFornecedor);
	},

	async update(req, res) {
		const { tipo, contato, observacao, status } = req.body;

		const fornecedor_id = req.params.fornecedor_id;

		const fornecedor = await Fornecedor.findByPk(fornecedor_id);

		if (!fornecedor) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Fornecedor não encontrado!' });
		}

		await ContatoFornecedor.update({
			tipo, contato, observacao, fornecedor_id, status
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'contatofornecedor', 'Alteração', 'Não');

		return res.json({ mensagem: "Contato alterado com sucesso!" })
	},

	async delete(req, res) {
		await ContatoFornecedor.update(
			{
				status: "Inativo",
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);

		Auditoria.store(req.userIdLogado, req.params.id, 'contatofornecedor', 'Exclusão', 'Não');

		return res
			.status(HTTPStatus.OK)
			.json({ messagem: "Contato excluído com sucesso!" });
	},
};