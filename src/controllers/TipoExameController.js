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
    }
}