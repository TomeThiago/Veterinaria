const Cor = require('../models/Cor');

module.exports = {
    async index(req, res) {
        let cores;
        if(req.query.id){
            cores = await Cor.findAll({
                where: {
                    id: req.query.id
                }
            });
        } else {
            cores = await Cor.findAll();    
        }
        return res.json(cores);
    },

    async store(req, res) {
        const { nome } = req.body;

        const cor = await Cor.create({ nome });

        return res.json(cor);
    },

    async update(req, res) {
        const { nome } = req.body;

        await Cor.update({
            nome: nome
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Cor.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
}