'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pacienteexame', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'paciente',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      tipoexame_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipoexame',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      exame_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exame',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      realizado: {
        type: Sequelize.DATE,
      },
      realizado_interno: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      diagnostico: {
        type: Sequelize.TEXT,
      },
      observacao: {
        type: Sequelize.TEXT,
      },
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
    return queryInterface.dropTable('pacienteexame');
  }
};
