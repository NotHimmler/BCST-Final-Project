'use strict';

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
   return queryInterface.bulkInsert('FitbitTokens', [
    {
      MRN: '80000020',
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkNaTU4iLCJzdWIiOiIzUDNRM04iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IHJwcm8iLCJleHAiOjE1NDAyMzE5MjksImlhdCI6MTU0MDIwMzEyOX0.XVFtPvcQCivUYjyQNX-PA9Nim4be8Sc9uYb0f6S5ZWE',
      refreshToken: '',
      user_id: "3P3Q3N",
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('FitbitTokens', null, {});
  }
};
