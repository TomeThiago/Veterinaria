const Fornecedor = require('../models/Fornecedor');
const HTTPStatus = require('http-status');

module.exports = {

  async index(req, res) {
    try {
      const where = {};

      if (!req.params.id) {

        if (req.query.nome) {
          where.nome = { [Op.like]: `%${req.query.nome}%` };
        }

        if (req.query.cpf_cnpj) {
          where.cpf_cnpj = req.query.cpf_cnpj;
        }

        if (req.query.rg_ie) {
          where.rg_ie = req.query.rg_ie;
        }

        if (req.query.cidade) {
          where.cidade = req.query.cidade;
        }

        if (req.query.estado) {
          where.estado = req.query.estado;
        }

        if (req.query.status) {
          where.status = req.query.status;
        }
      } else {
        where.id = req.params.id;
      }

      const fornecedores = await Fornecedor.findAll({
        where
      });

      return res.status(HTTPStatus.OK).json(fornecedores);
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao consultar os fornecedores!" });
    }
  },

  async store(req, res) {
    try {
      const {
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        cep,
        endereco,
        numero,
        complemento,
        ponto_referencia,
        bairro,
        cidade,
        estado,
        observacao,
        contribuinte
      } = req.body;

      if (!nome) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'nome não informado!' });
      }

      if (!tipo_pessoa) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'tipo_pessoa não informado!' });
      }

      if (!cpf_cnpj) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'cpf_cnpj não informado!' });
      }

      if (!rg_ie) {
        return res.status(HTTPStatus.BAD_REQUEST).json({ messagem: 'rg_ie não informado!' });
      }

      await Fornecedor.create({
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        cep,
        endereco,
        numero,
        complemento,
        ponto_referencia,
        bairro,
        cidade,
        estado,
        observacao,
        contribuinte,
        status: 'Ativo'
      });

      return res.status(HTTPStatus.OK).json({ messagem: "Fornecedor cadastrado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao cadastrar o fornecedor!" });
    }
  },

  async update(req, res) {
    try {

      const fornecedor = await Fornecedor.findByPk(req.params.id);

      if (!fornecedor) {
        return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Fornecedor não encontrado!' });
      }

      const {
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        cep,
        endereco,
        numero,
        complemento,
        ponto_referencia,
        bairro,
        cidade,
        estado,
        observacao,
        contribuinte,
        status
      } = req.body;

      await Fornecedor.update({
        nome,
        tipo_pessoa,
        cpf_cnpj,
        rg_ie,
        cep,
        endereco,
        numero,
        complemento,
        ponto_referencia,
        bairro,
        cidade,
        estado,
        observacao,
        contribuinte,
        status
      }, {
        where: {
          id: req.params.id
        }
      });

      return res.json({ messagem: "Fornecedor alterado com sucesso!" });
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao alterar o fornecedor!" });
    }
  },

  async delete(req, res) {
    try {
      const fornecedor = await Fornecedor.findByPk(req.params.id);

      if (!fornecedor) {
        return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: 'Fornecedor não encontrado!' });
      }

      await Fornecedor.update({
        status: 'Inativo'
      }, {
        where: {
          id: fornecedor.id
        }
      });

      return res.json({ messagem: "Fornecedor excluído com sucesso!" })
    } catch (err) {
      return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ messagem: "Erro ao excluir o fornecedor!" });
    }
  }
};