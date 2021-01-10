const ContatoTutor = require('../model/vo/ContatoTutor');
const Tutor = require('../model/vo/Tutor');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
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

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const contatos = await ContatoTutor.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(contatos);
	},

	async store(req, res) {
		const { tipo, contato, observacao } = req.body;

		const tutor_id = req.params.tutor_id;

		const tutor = await Tutor.findByPk(tutor_id);

		if (!tutor) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
		}

		if (!contato) {
			return res
				.status(HTTPStatus.BAD_REQUEST)
				.json({ mensagem: "contato não informado!" });
		}

		const contatoTutor = await ContatoTutor.create({ tipo, contato, observacao, tutor_id });

		Auditoria.store(req.userIdLogado, contatoTutor.id, 'contatotutor', 'Inclusão', 'Não');

		return res.json(contatoTutor);
	},

	async update(req, res) {

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

			Auditoria.store(req.userIdLogado, req.params.id, 'contatotutor', 'Alteração', 'Não');

			return res.json({ mensagem: "Contato alterado com sucesso!" })
	},

	async delete(req, res) {
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

			Auditoria.store(req.userIdLogado, req.params.id, 'contatotutor', 'Exclusão', 'Não');

			return res
				.status(HTTPStatus.OK)
				.json({ mensagem: "Contato excluído com sucesso!" });
	},
};