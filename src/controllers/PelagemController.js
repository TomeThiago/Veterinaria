const Pelagem = require('../models/Pelagem');
const HTTPStatus = require('http-status');

module.exports = {
    async index(req, res) {
        try {

            const where = {};

            if (req.query.nome) {
                where.nome = req.query.nome;
            }

            const pelagens = await Pelagem.findAll({
                where
            });

            return res.json(pelagens)
        } catch(err) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as pelagens!" });
        }
    },

    async store(req, res) {

        try {
            const { nome } = req.body;

            console.log(nome)

            if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

            await Pelagem.create({ nome });

			return res.status(HTTPStatus.OK).json({ messagem: "Pelagem cadastrada com sucesso!" });
        } catch(err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a pelagem!" });
        }
    },

    async update(req, res) {

        try {
            const { nome } = req.body

            if (!nome) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

            await Pelagem.update({
                nome
            }, {
                where: {
                    id: req.params.id
                }
            });

			return res.status(HTTPStatus.OK).json({ messagem: "Pelagem alterada com sucesso!" });
        } catch(err) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a pelagem!" });
        }
    },

    async delete(req, res) {

        try {
            await Pelagem.destroy({
                where: {
                    id: req.params.id
                }
            });

			return res.status(HTTPStatus.OK).json({ messagem: "Pelagem deletada com sucesso!" });
        } catch(err) {
            console.log(err)
            return res.json({message: "Erro ao deletar a pelagem!"})
        }
    }
}