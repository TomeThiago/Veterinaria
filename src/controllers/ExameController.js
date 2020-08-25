const Especie = require('../models/Exame');

module.exports = {
    async index(req, res) {
        const especies = await Especie.findAll();
        return res.json(especies);
    },

    async store(req, res) {
        const { nome } = req.body;

        const especie = await Especie.create({ nome });

        return res.json(especie);
    },

    async update(req, res) {
        const { nome } = req.body;

        await Especie.update({
            nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Especie.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
}