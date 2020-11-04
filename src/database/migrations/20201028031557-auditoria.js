'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('auditoria', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      operacao: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      tabela: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      chave: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sincronizado: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('auditoria');
  }
};
