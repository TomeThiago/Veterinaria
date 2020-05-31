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
    }
}