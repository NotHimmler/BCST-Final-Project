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
   return queryInterface.bulkInsert('FitbitData', [
     {
       MRN: "80000001",
       date: new Date("2016/4/13"),
       steps: 120,
       createdAt: new Date(),
       updatedAt: new Date()
    },
    {
      MRN: "80000001",
      date: new Date("2016/4/12"),
      steps: 2996,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    MRN: "80000001",
    date: new Date("2016/4/11"),
    steps: 4909,
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
      MRN: "80000001",
      date: new Date("2016/4/10"),
      steps: 5825,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      MRN: "80000001",
      date: new Date("2016/4/09"),
      steps: 5552,
      createdAt: new Date(),
      updatedAt: new Date()
   },{
    MRN: "80000001",
    date: new Date("2016/4/08"),
    steps: 4781,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/07"),
    steps: 6656,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/06"),
    steps: 3082,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/05"),
    steps: 4268,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/04"),
    steps: 3198,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/03"),
    steps: 6433,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/02"),
    steps: 6014,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/4/01"),
    steps: 8958,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    MRN: "80000001",
    date: new Date("2016/3/31"),
    steps: 6144,
    createdAt: new Date(),
    updatedAt: new Date()
  }
], {});
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
