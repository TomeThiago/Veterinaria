'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atendimento', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(7),
        allowNull: false,
        defaultValue: 'Ativo'
      },
      anamnese: {
        type: Sequelize.TEXT,
      },
      ultimos_tratamentos: {
        type: Sequelize.TEXT,
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
      tipotutor: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      tutor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tutor',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      tipoatendimento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipoatendimento',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
      inicio: {
        type: Sequelize.DATE,
      },
      termino: {
        type: Sequelize.DATE,
      },
      inicio_previsto: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tempo_previsto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      diagnostico: {
        type: Sequelize.TEXT,
      },
      observacao: {
        type: Sequelize.TEXT,
      },
      peso_animal: {
        type: Sequelize.DECIMAL(8,2),
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
    return queryInterface.dropTable('atendimento');
  }
};
