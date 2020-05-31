const Especie = require('../models/Especie');

module.exports = {
    async index(req, res) {
        const especies = await Especie.findAll();
        return res.json(especies);
    },

    async store(req, res) {
        const { nome } = req.body;

        const especie = await Especie.create({ nome });

        return res.json(especie);
    }
}