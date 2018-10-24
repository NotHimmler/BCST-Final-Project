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
   return queryInterface.bulkInsert('WalkForwardData', [
    {
      MRN: "80000001",
      date: new Date("2016/4/13"),
      distance: 1.5,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
     MRN: "80000001",
     date: new Date("2016/4/12"),
     distance: 2.0,
     createdAt: new Date(),
     updatedAt: new Date()
  },
  {
   MRN: "80000001",
   date: new Date("2016/4/11"),
   distance: 3.6,
   createdAt: new Date(),
   updatedAt: new Date()
   },
   {
     MRN: "80000001",
     date: new Date("2016/4/10"),
     distance: 1.3,
     createdAt: new Date(),
     updatedAt: new Date()
  },
  {
     MRN: "80000001",
     date: new Date("2016/4/09"),
     distance: 0.8,
     createdAt: new Date(),
     updatedAt: new Date()
  },{
   MRN: "80000001",
   date: new Date("2016/4/08"),
   distance: 5.7,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/07"),
   distance: 6.6,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/06"),
   distance: 6.9,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/05"),
   distance: 1.5,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/04"),
   distance: 2.5,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/03"),
   distance: 2.6,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/02"),
   distance: 3.3,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/4/01"),
   distance: 3.78,
   createdAt: new Date(),
   updatedAt: new Date()
 },{
   MRN: "80000001",
   date: new Date("2016/3/31"),
   distance: 1.23,
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
   return queryInterface.bulkDelete('WalkForwardData', null, {});
  }
};
