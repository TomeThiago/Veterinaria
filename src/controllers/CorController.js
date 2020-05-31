const Cor = require('../models/Cor');

module.exports = {
    async index(req, res) {
        const cores = await Cor.findAll();
        return res.json(cores);
    },

    async store(req, res) {
        const { nome } = req.body;

        const cor = await Cor.create({ nome });

        return res.json(cor);
    }
}