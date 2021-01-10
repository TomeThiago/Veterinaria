const Paciente = require("../model/vo/Paciente");
const Tutor = require("../model/vo/Tutor");
const Especie = require("../model/vo/Especie");
const Raca = require("../model/vo/Raca");
const Pelagem = require("../model/vo/Pelagem");
const Cor = require("../model/vo/Cor");
const Fazenda = require("../model/vo/Fazenda");
const HTTPStatus = require("http-status");
const { Op } = require("sequelize");
const Auditoria = require('./AuditoriaController');

module.exports = {
  async index(req, res) {
    const where = {};

    if (!req.params.id) {
      if (req.query.nome) {
        where.nome = { [Op.like]: `%${req.query.nome}%` };
      }

      if (req.query.sexo) {
        where.sexo = { [Op.like]: `%${req.query.sexo}%` };
      }

      if (req.query.tutor_id) {
        where.tutor_id = req.query.tutor_id;
      }

      if (req.query.fazenda_id) {
        where.fazenda_id = req.query.fazenda_id;
      }

      if (req.query.status) {
        where.status = req.query.status;
      }

    } else {
      where.id = req.params.id;
    }

    const limit = req.query.limit ? req.query.limit : 1000;
    const offset = req.query.offset ? (req.query.offset - 1) * limit : 0;

    const pacientes = await Paciente.findAndCountAll({

      where: JSON.stringify(where) !== '{}' ? {
        [Op.or]: where,
      } : undefined,

      include: [{ association: 'tutor' }, { association: 'fazenda' }],
      order: ['id'],
      limit,
      offset
    });

    pacientes.rows.map(paciente => {
      paciente.dataValues.tutor_nome = paciente.dataValues.tutor.nome;
      paciente.dataValues.fazenda_nome = paciente.dataValues.fazenda.nome;
      paciente.dataValues.tutor = undefined;
      paciente.dataValues.fazenda = undefined;
      return paciente;
    });

    return res.status(HTTPStatus.OK).json(pacientes);
  },

  async store(req, res) {
    const {
      tutor_id,
      foto,
      nome,
      data_nascimento,
      sexo,
      especie_id,
      raca_id,
      pelagem_id,
      cor_id,
      porte,
      castrado,
      microchipado,
      numero_chip,
      pedigree,
      numero_pedigree,
      peso,
      fazenda_id,
      pratica_atividade_esportiva,
      atividade_esportiva,
    } = req.body;

    if (!nome) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "nome não informado!" });
    }

    if (!sexo) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "sexo não informado!" });
    }

    const tutor = await Tutor.findByPk(tutor_id);

    if (!tutor) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Tutor não encontrado!" });
    }

    if (!especie_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "especie_id não informado!" });
    }

    const especie = await Especie.findByPk(especie_id);

    if (!especie) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Especie não encontrada!" });
    }

    if (!raca_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "raca_id não informado!" });
    }

    const raca = await Raca.findByPk(raca_id);

    if (!raca) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Raça não encontrada!" });
    }

    if (!pelagem_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "pelagem_id não informada!" });
    }

    const pelagem = await Pelagem.findByPk(pelagem_id);

    if (!pelagem) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Pelagem não encontrada!" });
    }

    if (!cor_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "cor_id não informada!" });
    }

    const cor = await Cor.findByPk(cor_id);

    if (!cor) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Cor não encontrada!" });
    }

    if (!fazenda_id) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "fazenda_id não informada!" });
    }

    const fazenda = await Fazenda.findByPk(fazenda_id);

    if (!fazenda) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "Fazenda não informada!" });
    }

    if (!porte) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "porte não informado!" });
    }

    if (!castrado) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "castrado não informado!" });
    }

    if (!microchipado) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "microchipado não informado!" });
    }

    if (!pedigree) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "pedigree não informado!" });
    }

    if (!peso) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "peso não informado!" });
    }

    if (!pratica_atividade_esportiva) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ mensagem: "pratica_atividade_esportiva não informado!" });
    }

    const paciente = await Paciente.create({
      tutor_id,
      foto,
      nome,
      data_nascimento,
      sexo,
      especie_id,
      raca_id,
      pelagem_id,
      cor_id,
      porte,
      castrado,
      microchipado,
      numero_chip,
      pedigree,
      numero_pedigree,
      peso,
      fazenda_id,
      pratica_atividade_esportiva,
      atividade_esportiva,
    });

    Auditoria.store(req.userIdLogado, paciente.id, 'paciente', 'Inclusão', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json(paciente);
  },

  async update(req, res) {
    const paciente = await Paciente.findByPk(req.params.id);

    if (!paciente) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Paciente não encontrado!" });
    }

    const {
      tutor_id,
      foto,
      nome,
      data_nascimento,
      sexo,
      especie_id,
      raca_id,
      pelagem_id,
      cor_id,
      castrado,
      microchipado,
      numero_chip,
      pedigree,
      numero_pedigree,
      peso,
      fazenda_id,
      pratica_atividade_esportiva,
      atividade_esportiva,
      status
    } = req.body;

    if (tutor_id) {
      const tutor = await Tutor.findByPk(tutor_id);

      if (!tutor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Tutor não encontrado!" });
      }
    }

    if (especie_id) {
      const especie = await Especie.findByPk(especie_id);

      if (!especie) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Especie não encontrada!" });
      }
    }

    if (raca_id) {
      const raca = await Raca.findByPk(raca_id);

      if (!raca) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Raça não encontrado!" });
      }
    }

    if (pelagem_id) {
      const pelagem = await Pelagem.findByPk(pelagem_id);

      if (!pelagem) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Pelagem não encontrada!" });
      }
    }

    if (cor_id) {
      const cor = await Cor.findByPk(cor_id);

      if (!cor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Cor não encontrada!" });
      }
    }

    if (fazenda_id) {
      const fazenda = await Fazenda.findByPk(fazenda_id);

      if (!fazenda) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ mensagem: "Fazenda não encontrada!" });
      }
    }

    await Paciente.update(
      {
        tutor_id,
        foto,
        nome,
        data_nascimento,
        sexo,
        especie_id,
        raca_id,
        pelagem_id,
        cor_id,
        castrado,
        microchipado,
        numero_chip,
        pedigree,
        numero_pedigree,
        peso,
        fazenda_id,
        pratica_atividade_esportiva,
        atividade_esportiva,
        status
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'paciente', 'Alteração', 'Não');

    return res
      .status(HTTPStatus.OK)
      .json({ mensagem: "Paciente atualizado com sucesso!" });
  },

  async delete(req, res) {

    const paciente = await Paciente.findByPk(req.params.id);

    if (!paciente) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ mensagem: "Paciente não encontrado!" });
    }

    await Paciente.update(
      {
        status: "Inativo",
      },
      {
        where: {
          id: paciente.id,
        },
      }
    );

    Auditoria.store(req.userIdLogado, req.params.id, 'paciente', 'Exclusão', 'Não');

    return res.json({ mensagem: "Paciente excluído com sucesso!" });
  },
};