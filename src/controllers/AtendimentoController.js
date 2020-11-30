const Atendimento = require('../model/vo/Atendimento');
const Paciente = require('../model/vo/Paciente');
const Tutor = require('../model/vo/Tutor');
const HTTPStatus = require('http-status');
const TipoAtendimento = require('../model/vo/TipoAtendimento');
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {

      if (req.query.paciente_id) {
        where.paciente_id = req.query.paciente_id;
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
      include: [
        { association: 'paciente' },
        { association: 'tutor' },
        { association: 'tipoatendimento' }
      ],
      order: ['id'],
      limit,
      offset
    });

    atendimentos.rows.map(atendimentos => {
      atendimentos.dataValues.paciente_nome = atendimentos.dataValues.paciente.nome;
      atendimentos.dataValues.paciente = undefined;
      atendimentos.dataValues.tutor_nome = atendimentos.dataValues.tutor.nome;
      atendimentos.dataValues.tutor = undefined;
      atendimentos.dataValues.tipoatendimento_nome = atendimentos.dataValues.tipoatendimento.nome;
      atendimentos.dataValues.tipoatendimento = undefined;
      return atendimentos;
    });

    return res.json(atendimentos);
  },

  async store(req, res) {
    const {
      anamnese,
      ultimos_tratamentos,
      paciente_id,
      tipotutor,
      tutor_id,
      tipoatendimento_id,
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

    if (!tipoatendimento_id) {
      return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tipoatendimento_id não informado!' });
    }

    const tipoatendimento = await TipoAtendimento.findOne({
      where: {
        id: tipoatendimento_id,
        status: 'Ativo'
      }
    });

    if (!tipoatendimento) {
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
      tipoatencimento_id: tipoatendimento_id,
      inicio,
      termino,
      inicio_previsto,
      tempo_previsto,
      diagnostico,
      observacao,
      peso_animal,
    });

    Auditoria.store(req.userIdLogado, atendimento.id, 'atendimento', 'Inclusão', 'Não');

    return res.status(HTTPStatus.OK).json(atendimento);
  },

  async update(req, res) {
    const {
      status,
      anamnese,
      ultimos_tratamentos,
      paciente_id,
      tipotutor,
      tutor_id,
      tipoatendimento_id,
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

    if (tipoatendimento_id > 0) {
      const tipoatendimento = await TipoAtendimento.findOne({
        where: {
          id: tipo_atendimento_id,
          status: 'Ativo'
        }
      });

      if (!tipoatendimento) {
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
      tipoatencimento_id: tipoatendimento_id,
      inicio,
      termino,
      inicio_previsto,
      tempo_previsto,
      diagnostico,
      observacao,
      peso_animal,
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimento', 'Alteração', 'Não');

    return res.json({ messagem: "Atendimento alterado com sucesso!" });
  },

  async delete(req, res) {
    const status = "Inativo"

    await Atendimento.update({
      status,
    }, {
      where: {
        id: req.params.id
      }
    });

    Auditoria.store(req.userIdLogado, req.params.id, 'atendimento', 'Exclusão', 'Não');

    return res.json({ message: "Atendimento excluído com sucesso!" })
  }
};