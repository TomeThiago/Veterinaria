const Cargo = require('../models/Cargo');

module.exports = {   
    async index(req, res) {
        let cargo;
        if(req.query.id){
            cargo = await Cargo.findAll({
                where: {
                    id: req.query.id 
                }
            });
        } else {
            cargo = await Cargo.findAll();
        }
        
        return res.json(cargo);
    },

    async store(req, res) {
        const { nome, status, descricao } = req.body;

        const cargo = await Cargo.create({ nome, status, descricao });

        return res.json(cargo);
    },

    async update(req, res) {
        const { nome, status, descricao } = req.body;

        await Cargo.update({
            nome, status, descricao
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.json({message: "Registro alterado com sucesso!"})
    },

    async delete(req, res) {
        await Cargo.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({message: "Registro excluído com sucesso!"})
    }
};