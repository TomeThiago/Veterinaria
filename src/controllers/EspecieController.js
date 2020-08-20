const Especie = require('../models/Especie');
const HTTPStatus = require('http-status');

module.exports = {
    async index(req, res) {
        try {

            const where = {};

            if (req.query.nome) {
                where.nome = req.query.nome;
            }

            const especies = await Especie.findAll({
                where
            });

            return res.json(especies)
        } catch(err) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as espécies!" });
        }
    },

    async store(req, res) {

        try {
            const { nome } = req.body;

            console.log(nome)

            if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

            await Especie.create({ nome });

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie cadastrada com sucesso!" });
        } catch(err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a espécie!" });
        }
    },

    async update(req, res) {

        try {
            const { nome } = req.body

            if (!nome) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

            await Especie.update({
                nome
            }, {
                where: {
                    id: req.params.id
                }
            });

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie alterada com sucesso!" });
        } catch(err) {
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a espécie!" });
        }
    },

    async delete(req, res) {

        try {
            await Especie.destroy({
                where: {
                    id: req.params.id
                }
            });

			return res.status(HTTPStatus.OK).json({ messagem: "Espécie deletada com sucesso!" });
        } catch(err) {
            console.log(err)
            return res.json({message: "Erro ao deletar a espécie!"})
        }
    }
}