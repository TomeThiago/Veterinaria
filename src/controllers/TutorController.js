const Tutor = require('../models/Tutor');

module.exports = {
  async index(req, res) {
    const tutores = await Tutor.findAll();
    return res.json(tutores);
  },

  async store(req, res) {
    const { 
      nome,
      status,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      nacionalidade,
      sexo,
      data_nascimento,
      cep,
      endereco,
      numero,
      complemento,
      ponto_refencia,
      bairro,
      cidade,
      estado,
      observacao
    } = req.body;

    const tutor = await Tutor.create({ 
      nome,
      status,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      nacionalidade,
      sexo,
      data_nascimento,
      cep,
      endereco,
      numero,
      complemento,
      ponto_refencia,
      bairro,
      cidade,
      estado,
      observacao
    });

    return res.json(tutor);
  },

  async update(req, res) {
    const { 
      nome,
      status,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      nacionalidade,
      sexo,
      data_nascimento,
      cep,
      endereco,
      numero,
      complemento,
      ponto_refencia,
      bairro,
      cidade,
      estado,
      observacao
    } = req.body;

    await Tutor.update({ 
      nome,
      status,
      tipo_pessoa,
      cpf_cnpj,
      rg_ie,
      nacionalidade,
      sexo,
      data_nascimento,
      cep,
      endereco,
      numero,
      complemento,
      ponto_refencia,
      bairro,
      cidade,
      estado,
      observacao
    }, {
      where: {
        id: req.params.id
      }
    });

    return res.json({ message: "Registro alterado com sucesso!" })
  },

  async delete(req, res) {
    await Tutor.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.json({ message: "Registro excluído com sucesso!" })
  }
};