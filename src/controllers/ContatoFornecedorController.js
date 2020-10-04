const ContatoFornecedor = require('../models/ContatoFornecedor');
const Fornecedor = require('../models/Fornecedor');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {
		try {
			const where = {};

			if (!req.params.id) {

				if (req.query.fornecedor_id) {
					where.fornecedor_id = req.query.fornecedor_id;
				}

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
		} catch (err) {
			return res
				.status(HTTPStatus.INTERNAL_SERVER_ERROR)
				.json({ messagem: "Erro ao consultar o contato!" });
		}
	},

	async store(req, res) {
		try {
			const { tipo, contato, observacao } = req.body;

			const fornecedor_id = req.params.fornecedor_id;

			const fornecedor = await Fornecedor.findByPk(fornecedor_id);

			if (!fornecedor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Fornecedor não encontrado!' });
			}

			if(!contato) {
				return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "contato não informado!" });
			}

			const contatoFornecedor = await ContatoFornecedor.create({ tipo, contato, observacao, fornecedor_id });

			return res.json(contatoFornecedor);
		} catch (err) {
			return res
				.status(HTTPStatus.INTERNAL_SERVER_ERROR)
				.json({ messagem: "Erro ao cadastrar o contato!" });
		}
	},

	async update(req, res) {
		try {

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

			return res.json({ mensagem: "Contato alterado com sucesso!" })
		} catch (err) {
			return res
				.status(HTTPStatus.INTERNAL_SERVER_ERROR)
				.json({ messagem: "Erro ao cadastrar o contato!" });
		}
	},

	async delete(req, res) {
		try {
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

			return res
				.status(HTTPStatus.OK)
				.json({ messagem: "Contato excluído com sucesso!" });
		} catch (err) {
			return res
				.status(HTTPStatus.INTERNAL_SERVER_ERROR)
				.json({ messagem: "Erro ao excluir o contato!" });
		}
	},
};