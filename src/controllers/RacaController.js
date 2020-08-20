const Raca = require('../models/Raca');
const Especie = require('../models/Especie');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {

		try {

			const where = {};

			if (req.query.nome) {
				where.nome = req.query.nome;
			}

			if (req.query.especie_id) {
				where.cargo_id = req.query.especie_id;
			}

			const racas = await Raca.findAll({
				where
            });
            
            console.log(racas)

			return res.json(racas);
		} catch (err) {
            console.log(err)
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao listar as raças!" });
		}
	},

	async store(req, res) {

		try {

			const { nome, especie_id } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			if (!especie_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'especie_id não informado!' });
			}

			const especie = await Especie.findByPk(especie_id);

			if (!especie) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Espécie não encontrada!' });
            }
            
			await Raca.create({ nome, especie_id });

			return res.status(HTTPStatus.OK).json({ messagem: "Raça cadastrada com sucesso!" });
		} catch (err) {
            console.error(err)
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar a raça!" });
		}
	},

	async update(req, res) {

		try {

			const { nome, especie_id } = req.body;

			if (!nome) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'nome não informado!' });
			}

			if (!especie_id) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'especie_id não informado!' });
			}

			const especie = await Cargo.findByPk(especie_id);

			if (!especie) {
				return res.status(HTTPStatus.BAD_REQUEST).json({ erro: 'Espécie não encontrado!' });
			}

			await Raca.update({
				nome, especie_id
			}, {
				where: {
					id: req.params.id
				}
			});

			return res.json({ messagem: "Raça alterada com sucesso!" });
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a raça!" });
		}

	},

	async delete(req, res) {
		try {

			await Raca.destroy({
				where: {
					id: req.params.id
				}
			});

			return res.json({message: "Raça excluída com sucesso!"})
		} catch (err) {
			return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar a raça!" });
		}
	}
};