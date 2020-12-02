'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atendimentoprodutoestoque', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      atendimentoproduto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'atendimentoproduto',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    return queryInterface.dropTable('atendimentoprodutoestoque');
  }
};
