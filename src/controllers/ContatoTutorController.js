const ContatoTutor = require('../models/ContatoTutor');
const Tutor = require('../models/Tutor');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {
		try {
			const where = {
				tutor_id: req.params.tutor_id
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

			const contatos = await ContatoTutor.findAll({
				where
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

			const tutor_id = req.params.tutor_id;

			const tutor = await Tutor.findByPk(tutor_id);

			if (!tutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
			}

			const contatoTutor = await ContatoTutor.create({ tipo, contato, observacao, tutor_id });

			return res.json(contatoTutor);
		} catch (err) {
			return res
				.status(HTTPStatus.INTERNAL_SERVER_ERROR)
				.json({ messagem: "Erro ao cadastrar o contato!" });
		}
	},

	async update(req, res) {
		try {
			const { tipo, contato, observacao, status } = req.body;

			const tutor_id = req.params.tutor_id;

			const tutor = await Tutor.findByPk(tutor_id);

			if (!tutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
			}

			await ContatoTutor.update({
				tipo, contato, observacao, tutor_id, status
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
			await ContatoTutor.update(
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