const Pelagem = require('../models/Pelagem');
const HTTPStatus = require('http-status');

module.exports = {
    async index(req, res) {
        try {

            const where = {};

            if (req.query.nome) {
                where.nome = req.query.nome;
            }

            if (req.query.status) {
                where.status = req.query.status
            } else {
                where.status = 'Ativo'
            }

            if (req.query.usuario_id) {
                where.usuario_id = req.query.usuario_id
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
            const { nome, usuario_id, status } = req.body;

            if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

			if (!usuario_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'usuario_id não informado!' });
			}

            const usuario = await Usuario.findByPk(usuario_id);
            
            if (!usuario) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Usuario não encontrado!' });
            }

            await Pelagem.create({ nome, usuario_id, status });

			return res.status(HTTPStatus.OK).json({ messagem: "Pelagem cadastrada com sucesso!" });
        } catch(err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a pelagem!" });
        }
    },

    async update(req, res) {

        try {
            const { nome, usuario_id, status } = req.body;

            if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
            }

			if (!usuario_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'usuario_id não informado!' });
			}

            const usuario = await Usuario.findByPk(usuario_id);
            
            if (!usuario) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Usuario não encontrado!' });
            }

            await Pelagem.update({
                nome,
                usuario_id,
                status
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
            const status = "Inativo"
            
            await Pelagem.update({
                status
            }, {
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