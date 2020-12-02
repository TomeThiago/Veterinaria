const PacienteAnexo = require('../model/vo/PacienteAnexo');
const PacienteExame = require('../model/vo/PacienteExame');
const HTTPStatus = require('http-status');
const Auditoria = require('./AuditoriaController');

module.exports = {
	async index(req, res) {
		const where = {
			pacienteexame_id: req.params.pacienteexame_id,
		};

		if (req.params.id > 0) {
			where.id = req.params.id;
		}

		const limit = req.query.limit ? req.query.limit : 1000;
		const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

		const anexo = await PacienteAnexo.findAndCountAll({
			where,
			order: ['id'],
			limit,
			offset
		});

		return res.json(anexo);
	},

	async store(req, res) {
		const { anexo } = req.body;

		const paciente_id = req.params.paciente_id;
		const pacienteexame_id = req.params.pacienteexame_id;

		const registroIntegro = await PacienteExame.findOne({
			where: {
				id: pacienteexame_id,
				paciente_id: paciente_id
			}
		});

		if (!registroIntegro) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "A integridade entre paciente e exame do paciente está sendo violada!" });
		}

		const pacienteAnexo = await PacienteAnexo.create({ pacienteexame_id, anexo });

		Auditoria.store(req.userIdLogado, pacienteAnexo.id, 'pacienteanexo', 'Inclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Anexo cadastrado com sucesso!" });
	},

	async delete(req, res) {
		await PacienteAnexo.destroy({
			where: {
				id: req.params.id
			}
		});

		Auditoria.store(req.userIdLogado, req.params.id, 'pacienteanexo', 'Exclusão', 'Não');

		return res.status(HTTPStatus.OK).json({ messagem: "Anexo deletado com sucesso!" });
	}
}