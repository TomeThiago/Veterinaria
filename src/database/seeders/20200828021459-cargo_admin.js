'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cargo', [{
      nome: 'Root',
      status: 'Ativo',
      descricao: 'Cargo dos usuários que possue todos os privilégios do sistema',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cargo', null, {});
  }
};
