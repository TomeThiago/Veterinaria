const ContatoTutor = require('../models/ContatoTutor');
const Tutor = require('../models/Tutor');
const HTTPStatus = require('http-status');

module.exports = {
	async index(req, res) {

		const where = {};

		if (req.query.tipo) {
			where.tipo = req.query.tipo;
		}

		const contatos = await ContatoTutor.findAll({
			where
		});

		return res.json(contatos);
	},

	async store(req, res) {
		const { tipo, contato, observacao, tutor_id } = req.body;

    const tutor = await Tutor.findByPk(tutor_id);

    if(!tutor) {
			return res.status(HTTPStatus.BAD_REQUEST).json({erro: 'Tutor não encontrado!'});
    }
    
		const contatoTutor = await ContatoTutor.create({ tipo, contato, observacao, tutor_id });

		return res.json(contatoTutor);
	},

	async update(req, res) {
		const { tipo, contato, observacao, tutor_id } = req.body;

		await ContatoTutor.update({
			tipo, contato, observacao, tutor_id
		}, {
			where: {
				id: req.params.id
			}
		});

		return res.json({ mensagem: "Registro alterado com sucesso!" })
	},

	async delete(req, res) {
		await ContatoTutor.destroy({
			where: {
				id: req.params.id
			}
		});
		return res.json({ message: "Registro excluído com sucesso!" })
	}
};