const Usuario = require('../models/Usuario');

module.exports = {   
    async index(req, res) {
        const usuario = await Usuario.findAll();
        return res.json(usuario);
    },

    async store(req, res) {
        const { nome, email, senha, status } = req.body;

        const usuario = await Usuario.create({ nome, email, senha, status });

        return res.json(usuario);
    }
};