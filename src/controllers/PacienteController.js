const Paciente = require("../models/Paciente");
const Tutor = require("../models/Tutor");
const Especie = require("../models/Especie");
const Raca = require("../models/Raca");
const Pelagem = require("../models/Pelagem");
const Cor = require("../models/Cor");
const Fazenda = require("../models/Fazenda");
const HTTPStatus = require("http-status");
const { Op } = require("sequelize");
const { isAdmin } = require("../validation/isAdmin");

module.exports = {
  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {
        if (req.query.nome) {
          where.nome = { [Op.like]: `%${req.query.nome}%` };
        }

        if (req.query.tutor_id) {
          where.tutor_id = req.query.tutor_id;
        }

        if (req.query.fazenda_id) {
          where.fazenda_id = req.query.fazenda_id;
        }
      } else {
        if (!(await isAdmin(req.userIdLogado))) {
          if (req.userIdLogado != req.params.id) {
            return res
              .status(HTTPStatus.UNAUTHORIZED)
              .json({ mensagem: "Processo não autorizado" });
          }
        }

        where.id = req.params.id;
      }

      if (req.query.status) {
        where.status = req.query.status;
      } else {
        where.status = "Ativo";
      }

      const pacientes = await Paciente.findAll({
        where,
      });

      return res.status(HTTPStatus.OK).json(pacientes);
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao consultar os pacientes!" });
    }
  },

  async store(req, res) {
    try {
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
      } = req.body;

      if (
        !tutor_id ||
        !nome ||
        !sexo ||
        !especie_id ||
        !raca_id ||
        !pelagem_id ||
        !cor_id ||
        !castrado ||
        !microchipado ||
        !pedigree ||
        !peso ||
        !fazenda_id ||
        !pratica_atividade_esportiva
      ) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const tutor = await Tutor.findByPk(tutor_id);

      if (!tutor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Tutor não encontrado!" });
      }

      const especie = await Especie.findByPk(especie_id);

      if (!especie) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Especie não encontrada!" });
      }

      const raca = await Raca.findByPk(raca_id);

      if (!raca) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Raça não encontrado!" });
      }

      const pelagem = await Pelagem.findByPk(pelagem_id);

      if (!pelagem) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Pelagem não encontrada!" });
      }

      const cor = await Cor.findByPk(cor_id);

      if (!cor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Cor não encontrada!" });
      }

      const fazenda = await Fazenda.findByPk(fazenda_id);

      if (!fazenda) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Fazenda não encontrada!" });
      }

      await Paciente.create({
        tutor_id,
        foto: foto ? foto : null,
        nome,
        data_nascimento: data_nascimento ? data_nascimento : null,
        sexo,
        especie_id,
        raca_id,
        pelagem_id,
        cor_id,
        castrado,
        microchipado,
        numero_chip: numero_chip ? numero_chip : null,
        pedigree,
        numero_pedigree: numero_pedigree ? numero_pedigree : null,
        peso,
        fazenda_id,
        pratica_atividade_esportiva,
        atividade_esportiva: atividade_esportiva ? atividade_esportiva : null,
      });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Paciente cadastrado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar o Paciente!" });
    }
  },

  async update(req, res) {
    try {
        
      const paciente = await Paciente.findByPk(req.params.id);

      if (!paciente) {
          return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Paciente não encontrado!' });
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
      } = req.body;

      if (
        !tutor_id ||
        !nome ||
        !sexo ||
        !especie_id ||
        !raca_id ||
        !pelagem_id ||
        !cor_id ||
        !castrado ||
        !microchipado ||
        !pedigree ||
        !peso ||
        !fazenda_id ||
        !pratica_atividade_esportiva
      ) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const tutor = await Tutor.findByPk(tutor_id);

      if (!tutor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Tutor não encontrado!" });
      }

      const especie = await Especie.findByPk(especie_id);

      if (!especie) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Especie não encontrada!" });
      }

      const raca = await Raca.findByPk(raca_id);

      if (!raca) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Raça não encontrado!" });
      }

      const pelagem = await Pelagem.findByPk(pelagem_id);

      if (!pelagem) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Pelagem não encontrada!" });
      }

      const cor = await Cor.findByPk(cor_id);

      if (!cor) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Cor não encontrada!" });
      }

      const fazenda = await Cor.findByPk(fazenda_id);

      if (!fazenda) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Fazenda não encontrada!" });
      }

      await Paciente.update({
        tutor_id,
        foto: foto ? foto : null,
        nome,
        data_nascimento: data_nascimento ? data_nascimento : null,
        sexo,
        especie_id,
        raca_id,
        pelagem_id,
        cor_id,
        castrado,
        microchipado,
        numero_chip: numero_chip ? numero_chip : null,
        pedigree,
        numero_pedigree: numero_pedigree ? numero_pedigree : null,
        peso,
        fazenda_id,
        pratica_atividade_esportiva,
        atividade_esportiva: atividade_esportiva ? atividade_esportiva : null,
      });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Paciente atualizado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao atualizar o Paciente!" });
    }
  },

  async delete(req, res) {
    try {
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

      return res.json({ messagem: "Paciente excluído com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao excluir o paciente!" });
    }
  },
};
