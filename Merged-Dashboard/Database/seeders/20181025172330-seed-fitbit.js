'use strict';
const fitbitData = require('../../data/fb-data.json');
//console.log(fitbitData);
const correctCols = fitbitData.map(item => {
  return ({
    steps: Number(item['Steps']),
    date: String(item['Date']),
    MRN: String(item['MRN']),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})

console.log("Seeding " + correctCols.length + " entries");

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
   return queryInterface.bulkInsert('FitbitData', correctCols, {})
   .catch((err) => {
     console.log(err);
     if(err.name === 'SequelizeUniqueConstraintError'){
       console.log("There was a unique constraint error");
       console.log(err.name);
      }
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
