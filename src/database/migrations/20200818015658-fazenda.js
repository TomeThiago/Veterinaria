'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fazenda', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      telefone: Sequelize.STRING(25),
      email: Sequelize.STRING(200),
      cep: Sequelize.STRING(8),
      endereco: Sequelize.STRING(50),
      numero: Sequelize.STRING(10),
      complemento: Sequelize.STRING(50),
      ponto_referencia: Sequelize.STRING(50),
      bairro: Sequelize.STRING(50),
      cidade: Sequelize.STRING(50),
      estado: Sequelize.STRING(2),
      status: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: 'Ativo'
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('fazenda');
  }
};
