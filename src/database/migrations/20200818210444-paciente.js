'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('paciente', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      foto: {
        type: Sequelize.STRING(200),
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
      },
      sexo: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      especie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'especie',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      raca_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'raca',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      pelagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pelagem',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      cor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cor',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      porte: {
        type: Sequelize.STRING(7),
        allowNull: false,
      },
      castrado: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      microchipado: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      numero_chip: {
        type: Sequelize.STRING(100),
      },
      pedigree: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      numero_pedigree: {
        type: Sequelize.STRING(100),
      },
      peso: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false
      },
      fazenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'fazenda',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      pratica_atividade_esportiva: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      atividade_esportiva: {
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.STRING(7),
        allowNull: false,
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
    return queryInterface.dropTable('paciente');
  }
};
