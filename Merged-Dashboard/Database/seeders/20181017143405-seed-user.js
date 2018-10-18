'use strict';
const uuidv4 = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      user_id: uuidv4(),
      email: 'test@test.com',
      first_name: 'Leanne',
      last_name: 'Hassett',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: uuidv4(),
      email: 'test2@test.com',
      first_name: 'Bob',
      last_name: 'Tester',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      user_id: uuidv4(),
      email: 'test3@test.com',
      first_name: 'Sally',
      last_name: 'Tester',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
