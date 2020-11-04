'use strict';

const SHA256 = require('crypto-js/sha256');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [{
      nome: "Root",
      cargo_id: 1,
      email: 'administrador@systemvet.com',
      senha: SHA256('S1sV3t@dmin20#SysVet!20').toString(),
      administrador: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
