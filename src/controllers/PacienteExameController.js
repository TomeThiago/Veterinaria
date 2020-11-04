const PacienteExame = require('../model/vo/PacienteExame');
const TipoExame = require('../model/vo/TipoExame');
const Exame = require('../model/vo/Exame');
const Paciente = require('../model/vo/Paciente');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {

	async index(req, res) {
		try {
			const where = {
				paciente_id: req.params.paciente_id
			};

			if (!req.params.id) {

				if (req.query.tipoexame_id) {
					where.tipoexame_id = req.query.tipoexame_id;
				}

				if (req.query.exame_id) {
					where.exame_id = req.query.exame_id;
				}

				if (req.query.status) {
					where.status = req.query.status
				}

			} else {
				where.id = req.params.id;
			}

			const limit = req.query.limit ? req.query.limit : 1000;
			const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

			const pacienteExame = await PacienteExame.findAndCountAll({
				where,
				order: ['id'],
				limit,
				offset
			});

			return res.json(pacienteExame)
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar os exames dos pacientes!" });
		}
	},

	async store(req, res) {
		try {
			const {
				tipoexame_id,
				exame_id,
				realizado,
				realizado_interno,
				diagnostico,
				observacao
			} = req.body;

			const paciente_id = req.params.paciente_id;

			const paciente = await Paciente.findByPk(paciente_id);

			if (!paciente) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Paciente não encontrado!' });
			}

			if (!tipoexame_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipoexame_id não informado!' });
			}

			const tipoexame = await TipoExame.findOne({
				where: {
					id: tipoexame_id,
					status: 'Ativo'
				}
			});

			if (!tipoexame) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo Exame não encontrado!' });
			}

			if (!exame_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'exame_id não informado!' });
			}

			const exame = await Exame.findOne({
				where: {
					id: exame_id,
					status: 'Ativo'
				}
			});

			if (!exame) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Exame não encontrado!' });
			}

			const pacienteExame = await PacienteExame.create({
				paciente_id,
				tipoexame_id,
				exame_id,
				realizado,
				realizado_interno,
				diagnostico,
				observacao
			});

			Auditoria.store(req.userIdLogado, pacienteExame.id , 'pacienteexame', 'Inclusão', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Exame do paciente cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o exame do paciente!" });
		}
	},

	async update(req, res) {

		try {
			const {
				tipoexame_id,
				exame_id,
				realizado,
				realizado_interno,
				diagnostico,
				observacao,
				status
			} = req.body

			if (!tipoexame_id > 0) {
				const tipoexame = await TipoExame.findByPk(tipoexame_id);

				if (!tipoexame) {
					return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo Exame não encontrado!' });
				}
			}

			if (exame_id > 0) {
				const exame = await Exame.findByPk(exame_id);

				if (!exame) {
					return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Exame não encontrado!' });
				}
			}

			await PacienteExame.update({
				tipoexame_id,
				exame_id,
				realizado,
				realizado_interno,
				diagnostico,
				observacao,
				status
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'pacienteexame', 'Alteração', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Exame do paciente alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o exame do paciente!" });
		}
	},

	async delete(req, res) {
		try {
			const status = "Inativo"

			await PacienteExame.update({
				status,
			}, {
				where: {
					id: req.params.id
				}
			});

			Auditoria.store(req.userIdLogado, req.params.id , 'pacienteexame', 'Exclusão', 'Não');

			return res.status(HTTPStatus.OK).json({ messagem: "Exame do paciente deletado com sucesso!" });
		} catch (err) {
			return res.json({ message: "Erro ao deletar o exame do paciente!" })
		}
	}
}