const Cargo = require('../models/Cargo');

module.exports = {   
    async index(req, res) {
        const cargo = await Cargo.findAll();
        return res.json(cargo);
    },

    async store(req, res) {
        const { nome, status, descricao } = req.body;

        const cargo = await Cargo.create({ nome, status, descricao });

        return res.json(cargo);
    }
};