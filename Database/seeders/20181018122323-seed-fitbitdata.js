'use strict';
const csvFilePath = '../csv/test.csv'
const csv=require("csvtojson");
const fs=require('fs');

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
   console.log("trying?");
   csv().fromFile(csvFilePath).then( () => {
     console.log("anything?");
   });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('FitbitData', null, {});
  }
};
