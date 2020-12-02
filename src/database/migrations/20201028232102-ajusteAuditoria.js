'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn('auditoria', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('auditoria', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      })

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: (queryInterface, Sequelize) => {
    try {
      queryInterface.removeColumn('auditoria', 'created_at');
      queryInterface.removeColumn('auditoria', 'updated_at');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
