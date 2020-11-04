const Atendimento = require('../model/vo/Atendimento');
const HTTPStatus = require('http-status');
const TipoAtendimento = require('../model/vo/TipoAtendimento');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {

    try {

      const where = {};

      if(!req.params.id){

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

        if (req.query.status) {
          where.status = req.query.status;
        }

      } else {
				where.id = req.params.id;
			}

      const limit = req.query.limit ? req.query.limit : 1000;
			const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

      const atendimentos = await Atendimento.findAndCountAll({
				where,
				order: ['id'],
				limit,
				offset
			});

      return res.json(atendimentos);
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar o atendimentos!" });
    }
  },

  async store(req, res) {
    try {
      const {
        anamnese,
        ultimos_tratamentos,
        paciente_id,
        tipotutor,
        tutor_id,
        tipo_atendimento_id,
        inicio,
        termino,
        inicio_previsto,
        tempo_previsto,
        diagnostico,
        observacao,
        peso_animal
      } = req.body;
  
      if (!paciente_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'paciente_id não informado!' });
      }

      const paciente = await Paciente.findOne({
        where: {
          id: paciente_id,
          status: 'Ativo'
        }
      });

      if (!paciente) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Paciente não encontrado!' });
      }

      if (!tipotutor) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipotutor não informado!' });
      }

      if (!tutor_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tutor_id não informado!' });
      }

      const tutor = await Tutor.findOne({
        where: {
          id: tutor_id,
          status: 'Ativo'
        }
      });

      if (!tutor) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
      }

      if (!tipo_atendimento_id) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipo_atendimento_id não informado!' });
      }

      const tipo_atendimento = await TipoAtendimento.findOne({
        where: {
          id: tipo_atendimento_id,
          status: 'Ativo'
        }
      });

      if (!tipo_atendimento) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo atendimento não encontrado!' });
      }

      if (!inicio_previsto) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'inicio_previsto não informado!' });
      }

      if (!tempo_previsto) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tempo_previsto não informado!' });
      }

      const atendimento = await Atendimento.create({
        anamnese,
        ultimos_tratamentos,
        paciente_id,
        tipotutor,
        tutor_id,
        tipo_atendimento_id,
        inicio,
        termino,
        inicio_previsto,
        tempo_previsto,
        diagnostico,
        observacao,
        peso_animal
      });

      Auditoria.store(req.userIdLogado, atendimento.id , 'atendimento', 'Inclusão', 'Não');

      return res.status(HTTPStatus.OK).json(atendimento);
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

      if (paciente_id > 0) {
        const paciente = await Paciente.findOne({
          where: {
            id: paciente_id,
            status: 'Ativo'
          }
        });
  
        if (!paciente) {
          return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Paciente não encontrado!' });
        }
      }

      if (tutor_id > 0) {
        const tutor = await Tutor.findOne({
          where: {
            id: tutor_id,
            status: 'Ativo'
          }
        });
  
        if (!tutor) {
          return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tutor não encontrado!' });
        }
      }

      if (tipo_atendimento_id > 0) {
        const tipo_atendimento = await TipoAtendimento.findOne({
          where: {
            id: tipo_atendimento_id,
            status: 'Ativo'
          }
        });
  
        if (!tipo_atendimento) {
          return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Tipo atendimento não encontrado!' });
        }
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

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimento', 'Alteração', 'Não');

      return res.json({ messagem: "Atendimento alterado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o atendimento!" });
    }

  },

  async delete(req, res) {
    try {
      const status = "Inativo"

      await Atendimento.update({
        status,
      }, {
        where: {
          id: req.params.id
        }
      });

      Auditoria.store(req.userIdLogado, req.params.id , 'atendimento', 'Exclusão', 'Não');

      return res.json({ message: "Atendimento excluído com sucesso!" })
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao excluir o atendimento!" });
    }
  }
};