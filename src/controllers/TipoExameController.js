const TipoExame = require('../models/TipoExame');

module.exports = {
    async index(req, res) {
        const tipoExame = await TipoExame.findAll();
        return res.json(tipoExame);
    },

    async store(req, res) {
        const { nome } = req.body;

        const tipoExame = await TipoExame.create({ nome });

        return res.json(tipoExame);
    },

    async update(req, res) {
        const { nome } = req.body;

        await TipoExame.update({
            nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await TipoExame.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
}