'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tutor', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: 'Ativo'
      },
      tipo_pessoa: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      cpf_cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      rg_ie: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      sexo: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
      },
      cep: {
        type: Sequelize.STRING(8),
      },
      endereco: {
        type: Sequelize.STRING(50),
      },
      numero: {
        type: Sequelize.STRING(10),
      },
      complemento: {
        type: Sequelize.STRING(50),
      },
      ponto_refencia: {
        type: Sequelize.STRING(50),
      },
      bairro: {
        type: Sequelize.STRING(50),
      },
      cidade: {
        type: Sequelize.STRING(50),
      },
      estado: {
        type: Sequelize.STRING(2),
      },
      observacao: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
   
  down: (queryInterface) => {
    return queryInterface.dropTable('tutor');
  }
};
