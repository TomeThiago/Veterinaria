'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      queryInterface.addColumn('movimentoestoque', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('movimentoestoque', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
      }),

      queryInterface.removeColumn('movimentoestoque', 'usuario_id');

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: (queryInterface, Sequelize) => {
    try {
      queryInterface.removeColumn('movimentoestoque', 'created_at');
      queryInterface.removeColumn('movimentoestoque', 'updated_at');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
