const Auditoria = require("../model/vo/Auditoria");
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

  store(usuario_id, chave, tabela, operacao, sincronizado) {
    try {
      Auditoria.create({ usuario_id, chave, tabela, operacao, sincronizado });
    } catch(err) {
      console.log(err)
    }
  },
  
};