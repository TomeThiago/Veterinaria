const Grupo = require('../models/Grupo');

module.exports = {
    async index(req, res) {
        const grupos = await Grupo.findAll();
        return res.json(grupos);
    },

    async store(req, res) {
        const { nome, status } = req.body;

        const grupo = await Grupo.create({ nome, status });

        return res.json(grupo);
    },

    async update(req, res) {
        const { nome, status } = req.body;

        await Grupo.update({
            nome, status
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Grupo.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
}