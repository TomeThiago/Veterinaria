const AreaAtuacao = require('../models/AreaAtuacao');

module.exports = {   
    async index(req, res) {
        const areaAtuacao = await AreaAtuacao.findAll();
        return res.json(areaAtuacao);
    },

    async store(req, res) {
        const { nome, status } = req.body;

        const areaAtuacao = await AreaAtuacao.create({ nome, status });

        return res.json(areaAtuacao);
    }
};