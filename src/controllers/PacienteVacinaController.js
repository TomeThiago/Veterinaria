const PacienteVacina = require('../model/vo/PacienteVacina');
const Produto = require('../model/vo/Produto');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {
			paciente_id: req.params.paciente_id
		};

		if (!req.params.id) {

			if (req.query.vacina_id) {
				where.vacina_id = req.query.vacina_id;
			}

			if (req.query.status) {
				where.status = req.query.status
			}

		} else {
			where.id = req.params.id;
		}

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const vacinas = await PacienteVacina.findAndCountAll({
			where,
			order: ['id'],
			include: [
				{ association: 'produto' },	
			],
			limit,
			offset
		});

		vacinas.rows.map(vacina => {
      vacina.dataValues.vacina_nome = vacina.dataValues.produto.descricao;
			vacina.dataValues.produto = undefined;
      return vacina;
    });

		return res.json(vacinas)
	},

	async store(req, res) {
		const { vacina_id, data_vacina } = req.body;

		const paciente_id = req.params.paciente_id;

		if (!vacina_id) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'vacina_id não informado!' });
		}

		const produto = await Produto.findOne({
			where: {
				id: vacina_id,
				vacina: 'Sim',
				status: 'Ativo'
			}
		});

		if (!produto) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Produto ou não é uma vacina não encontrado!' });
		}

		if (!data_vacina) {
			return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'data_vacina não informada!' });
		}

		const pacienteVacina = await PacienteVacina.create({ paciente_id, vacina_id, data_vacina });

		Auditoria.store(req.userIdLogado, pacienteVacina.id, 'pacientevacina', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Vacina cadastrada com sucesso!" });
	},

	async update(req, res) {
		const { vacina_id, data_vacina, status } = req.body

		if (vacina_id > 0) {
			const produto = await Produto.findOne({
				where: {
					id: vacina_id,
					vacina: 'Sim',
					status: 'Ativo'
				}
			});

			if (!produto) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Produto não encontrado ou não é uma vacina!' });
			}
		}

		await PacienteVacina.update({
			vacina_id,
			data_vacina,
			status
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'pacientevacina', 'Alteração', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Vacina alterada com sucesso!" });
	},

	async delete(req, res) {
		const status = "Inativo"

		await PacienteVacina.update({
			status,
		}, {
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'pacientevacina', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Vacina excluida com sucesso!" });
	}
}