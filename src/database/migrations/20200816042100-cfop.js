'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => { 
    return queryInterface.createTable('cfop', { 
      id:{
        type: Sequelize.STRING(4),
        allowNull: false,
        primaryKey: true,
      },
      descricao:{
        type: Sequelize.STRING(60),
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
    return queryInterface.dropTable('cfop');
  }
};
