const Atendimento = require('../models/Atendimento');

const HTTPStatus = require('http-status');
const bcrypt = require('bcryptjs');
const TipoAtendimento = require('../models/TipoAtendimento');

module.exports = {
	async index(req, res) {

		try {

			const where = {};

			if (req.query.status) {
				where.status = req.query.status;
			}

			if (req.query.anamnese) {
				where.anamnese = req.query.anamnese;
			}

			if (req.query.ultimos_tratamentos) {
				where.ultimos_tratamentos = req.query.ultimos_tratamentos;
			}

			if (req.query.paciente_id) {
				where.paciente_id = req.query.paciente_id;
			}

			if (req.query.tipotutor) {
				where.tipotutor = req.query.tipotutor;
			}

			if (req.query.tutor_id) {
				where.tutor_id = req.query.tutor_id;
			}

			if (req.query.tipo_atendimento_id) {
				where.tipo_atendimento_id = req.query.tipo_atendimento_id;
			}

			if (req.query.usuario_id) {
				where.usuario_id = req.query.usuario_id;
			}

			if (req.query.inicio) {
				where.inicio = req.query.inicio;
			}

			if (req.query.termino) {
				where.termino = req.query.termino;
			}

			if (req.query.inicio_previsto) {
				where.inicio_previsto = req.query.inicio_previsto;
			}

			if (req.query.tempo_previsto) {
				where.tempo_previsto = req.query.tempo_previsto;
			}

			if (req.query.diagnostico) {
				where.diagnostico = req.query.diagnostico;
			}

			if (req.query.observacao) {
				where.observacao = req.query.observacao;
			}

			if (req.query.peso_animal) {
				where.peso_animal = req.query.peso_animal;
            }
            
            
			const atendimentos = await Atendimento.findAll({
                where
			});

			return res.json(atendimentos);
		} catch (err) {
            console.error(err)
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar o atendimentos!" });
		}
	},

	async store(req, res) {

		try {

			const { 
                status,
                anamnese,
                ultimos_tratamentos,
                paciente_id,
                tipotutor,
                tutor_id,
                tipo_atendimento_id,
                usuario_id,
                inicio,
                termino,
                inicio_previsto,
                tempo_previsto,
                diagnostico,
                observacao,
                peso_animal
            } = req.body;

            if (!status) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'status não informado!' });
            }

			if (!paciente_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'paciente_id não informado!' });
			}

			const paciente = await Paciente.findByPk(paciente_id);

			if (!paciente) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Paciente não encontrado!' });
            }
            
            if (!tipotutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipotutor não informado!' });
            }

			if (!tutor_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tutor_id não informado!' });
			}

			const tutor = await Tutor.findByPk(tutor_id);

			if (!tutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
            }

			if (!tipo_atendimento_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipo_atendimento_id não informado!' });
			}

			const tipo_atendimento = await TipoAtendimento.findByPk(tipo_atendimento_id);

			if (!tipo_atendimento) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo atendimento não encontrado!' });
            }

			if (!usuario_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'usuario_id não informado!' });
			}

			const usuario = await Usuario.findByPk(usuario_id);

			if (!usuario) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Usuário não encontrado!' });
            }

			if (!inicio_previsto) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'inicio_previsto não informado!' });
            }
            
            if (!tempo_previsto) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tempo_previsto não informado!' });
            }

			await Atendimento.create({
                status,
                anamnese,
                ultimos_tratamentos,
                paciente_id,
                tipotutor,
                tutor_id,
                tipo_atendimento_id,
                usuario_id,
                inicio,
                termino,
                inicio_previsto,
                tempo_previsto,
                diagnostico,
                observacao,
                peso_animal
            });

			return res.status(HTTPStatus.OK).json({ messagem: "Atendimento cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o atendimento!" });
		}

	},

	async update(req, res) {

		try {

			const { 
                status,
                anamnese,
                ultimos_tratamentos,
                paciente_id,
                tipotutor,
                tutor_id,
                tipo_atendimento_id,
                usuario_id,
                inicio,
                termino,
                inicio_previsto,
                tempo_previsto,
                diagnostico,
                observacao,
                peso_animal
            } = req.body;

            if (!status) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'status não informado!' });
            }

			if (!paciente_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'paciente_id não informado!' });
			}

			const paciente = await Paciente.findByPk(paciente_id);

			if (!paciente) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Paciente não encontrado!' });
            }
            
            if (!tipotutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipotutor não informado!' });
            }

			if (!tutor_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tutor_id não informado!' });
			}

			const tutor = await Tutor.findByPk(tutor_id);

			if (!tutor) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
            }

			if (!tipo_atendimento_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipo_atendimento_id não informado!' });
			}

			const tipo_atendimento = await TipoAtendimento.findByPk(tipo_atendimento_id);

			if (!tipo_atendimento) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo atendimento não encontrado!' });
            }

			if (!usuario_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'usuario_id não informado!' });
			}

			const usuario = await Usuario.findByPk(usuario_id);

			if (!usuario) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Usuário não encontrado!' });
            }

			if (!inicio_previsto) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'inicio_previsto não informado!' });
            }
            
            if (!tempo_previsto) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tempo_previsto não informado!' });
            }

			await Atendimento.update({
                status,
                anamnese,
                ultimos_tratamentos,
                paciente_id,
                tipotutor,
                tutor_id,
                tipo_atendimento_id,
                usuario_id,
                inicio,
                termino,
                inicio_previsto,
                tempo_previsto,
                diagnostico,
                observacao,
                peso_animal
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.json({ messagem: "Atendimento alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o atendimento!" });
		}

	},

	async delete(req, res) {
		try {

			await Atendimento.destroy({
				where: {
					id: req.params.id
				}
			});

			return res.json({message: "Atendimento excluído com sucesso!"})
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao excluir o atendimento!" });
		}
	}
};