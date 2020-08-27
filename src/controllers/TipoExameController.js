const TipoExame = require('../models/TipoExame');
const HTTPStatus = require('http-status');

module.exports = {

    async index(req, res) {
        try {
          const where = {};
    
          if (!req.params.id) {
            if (req.query.nome) {
              where.nome = { [Op.like]: `%${req.query.nome}%` };
            }
          } else {
            where.id = req.params.id;
          }
    
          if (req.query.status) {
            where.status = req.query.status;
          } else {
            where.status = "Ativo";
          }

          const tipoExame = await TipoExame.findAll({
              where,
          });
    
          return res.status(HTTPStatus.OK).json(tipoExame);
        } catch (err) {
          return res
            .status(HTTPStatus.INTERNAL_SERVER_ERROR)
            .json({ messagem: "Erro ao consultar tipo exame!" });
        }
    },

    async store(req, res) {
      try {
        const { nome } = req.body;

        if(!nome){
            return res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ messagem: "Preencha todos os campos!" });
        }

        await TipoExame.create({ nome });

        return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Tipo de exame cadastrado com sucesso!" });
      } catch (err) {
        return res
          .status(HTTPStatus.INTERNAL_SERVER_ERROR)
          .json({ messagem: "Erro ao cadastrar o tipo de exame!" });
      }
    },

    async update(req, res) {
      try {
        const { nome } = req.body;

        if(!nome){
            return res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ messagem: "Preencha todos os campos!" });
        }

        const tipoexame = await TipoExame.findByPk(req.params.id);

        if (!tipoexame) {
          return res
            .status(HTTPStatus.NOT_FOUND)
            .json({ mensagem: "Tipo de exame não encontrado!" });
        }

        await TipoExame.update({
            nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Tipo de exame alterado com sucesso!" });
    } catch (err) {
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao alterar tipo de exame!" });
    }
    },

    async delete(req, res) {
        try {
          const tipoexame = await TipoExame.findByPk(req.params.id);
    
          if (!tipoexame) {
            return res
              .status(HTTPStatus.NOT_FOUND)
              .json({ mensagem: "Tipo Exame não encontrado!" });
          }
    
          await TipoExame.update(
            {
              status: "Inativo",
            },
            {
              where: {
                id: tipoexame.id,
              },
            }
          );
    
          return res
          .status(HTTPStatus.OK)
          .json({ messagem: "Tipo Exame excluído com sucesso!" });
        } catch (err) {
          return res
            .status(HTTPStatus.INTERNAL_SERVER_ERROR)
            .json({ messagem: "Erro ao excluir o tipo de exame!" });
        }
      },
}