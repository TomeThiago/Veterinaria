const Pelagem = require('../models/Pelagem');

module.exports = {
    async index(req, res) {
        const pelagens = await Pelagem.findAll();
        return res.json(pelagens);
    },

    async store(req, res) {
        const { nome } = req.body;

        const pelagem = await Pelagem.create({ nome });

        return res.json(pelagem);
    },

    async update(req, res) {
        const { nome } = req.body;

        await Pelagem.update({
            nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Pelagem.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
}