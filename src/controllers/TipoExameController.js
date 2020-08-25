const TipoExame = require('../models/TipoExame');

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
        const { nome } = req.body;

        if(!nome){
            return res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ messagem: "Preencha todos os campos!" });
        }

        const tipoExame = await TipoExame.create({ nome });

        return res.json(tipoExame);
    },

    async update(req, res) {
        const { nome } = req.body;

        if(!nome){
            return res
            .status(HTTPStatus.BAD_REQUEST)
            .json({ messagem: "Preencha todos os campos!" });
        }

        await TipoExame.update({
            nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        try {
          const tipoexame = await Paciente.findByPk(req.params.id);
    
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
                id: paciente.id,
              },
            }
          );
    
          return res.json({ messagem: "Tipo Exame excluído com sucesso!" });
        } catch (err) {
          return res
            .status(HTTPStatus.INTERNAL_SERVER_ERROR)
            .json({ messagem: "Erro ao excluir o Tipo Exame!" });
        }
      },
}