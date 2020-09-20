'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'tutor',
      'nacionalidade',
      {
        type: Sequelize.STRING(11),
        allowNull: false,
        defaultValue: 'Brasileiro'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tutor', 'nacionalidade');
  }
};
