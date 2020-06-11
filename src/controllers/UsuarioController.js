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
    },

    async update(req, res) {
        const { nome, email, senha, status } = req.body;

        await Usuario.update({
            nome, email, senha, status
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Usuario.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
};