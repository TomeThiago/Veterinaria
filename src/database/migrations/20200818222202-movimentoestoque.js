'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movimentoestoque', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      estoque_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'estoque',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      quantidade: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movimentoestoque');
  }
};
