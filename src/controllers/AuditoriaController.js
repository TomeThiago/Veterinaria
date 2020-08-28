const Auditoria = require("../models/Auditoria");
const Usuario = require("../models/Usuario");
const HTTPStatus = require("http-status");

module.exports = {
  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {
        if (req.query.nome) {
          where.nome = { [Op.like]: `%${req.query.nome}%` };
        }

        if (req.query.usuario_id) {
          where.usuario_id = req.query.usuario_id;
        }
      } else {
        where.id = req.params.id;
      }

      if(where){
        const auditoria = await Auditoria.findAll({where});

        return res.status(HTTPStatus.OK).json(auditoria);
      }

      const auditoria = await Auditoria.findAll()

      return res.status(HTTPStatus.OK).json(auditoria);
    } catch (err) {
      console.log(err);
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao listar as Auditorias!" });
    }
  },

  async store(req, res) {
    try {
      const { usuario_id, chave, tabela, operacao, sincronizado } = req.body;

      if (!usuario_id || !chave || !tabela || !operacao || !sincronizado) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ messagem: "Preencha todos os campos!" });
      }

      const user = await Usuario.findByPk(usuario_id);

      if (!user) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ erro: "Usuário não encontrada!" });
      }

      await Auditoria.create({ usuario_id, chave, tabela, operacao, sincronizado });

      return res
        .status(HTTPStatus.OK)
        .json({ messagem: "Auditoria cadastrada com sucesso!" });
    } catch (err) {
      console.error(err);
      return res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ messagem: "Erro ao cadastrar a auditoria!" });
    }
  },
};
