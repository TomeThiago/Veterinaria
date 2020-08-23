const TipoAtendimento = require('../models/TipoAtendimento');
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
            
			const tiposAtendimentos = await TipoAtendimento.findAll({
				where
			});

			return res.json(tiposAtendimentos);
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar o tipo de atendimento!" });
		}
	},

	async store(req, res) {

		try {

			const { nome, tempo_estimado, status, usuario_id } = req.body;
            
            if (!tempo_estimado) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tempo_estimado não informado!' });
            }

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
            
			await TipoAtendimento.create({ nome, tempo_estimado, status, usuario_id });

			return res.status(HTTPStatus.OK).json({ messagem: "Tipo de atendimento cadastrado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o tipo de atendimento!" });
		}

	},

	async update(req, res) {

		try {

			const { nome, tempo_estimado, status, usuario_id } = req.body;
            
            if (!tempo_estimado) {
                return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'tempo_estimado não informado!' });
            }

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

			await TipoAtendimento.update({
				nome, tempo_estimado, status, usuario_id
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.json({ messagem: "Tipo atendimento alterado com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o tipo de atendimento!" });
		}

	},

	async delete(req, res) {
		try {
            const status = "Inativo"

            await TipoAtendimento.update({
                status,
            }, {
                where: {
                    id: req.params.id
                }
            });

			return res.json({message: "Tipo de atendimento excluído com sucesso!"})
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o tipo de atendimento!" });
		}
	}
};