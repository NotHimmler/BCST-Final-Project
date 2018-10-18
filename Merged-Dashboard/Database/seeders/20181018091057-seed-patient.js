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
   return queryInterface.bulkInsert('Patients', [
     {
      MRN: "80000001",
      first_name: "D01",
      last_name: "Test",
      age: 81,
      sex: "M",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000002",
      first_name: "D02",
      last_name: "Test",
      age: 83,
      sex: "F",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000003",
      first_name: "D03",
      last_name: "Test",
      age: 55,
      sex: "F",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000004",
      first_name: "D04",
      last_name: "Test",
      age: 66,
      sex: "F",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000005",
      first_name: "D05",
      last_name: "Test",
      age: 84,
      sex: "F",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000006",
      first_name: "D06",
      last_name: "Test",
      age: 89,
      sex: "M",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000007",
      first_name: "D07",
      last_name: "Test",
      age: 57,
      sex: "F",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000008",
      first_name: "D08",
      last_name: "Test",
      age: 60,
      sex: "M",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000009",
      first_name: "D09",
      last_name: "Test",
      age: 88,
      sex: "F",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000010",
      first_name: "D10",
      last_name: "Test",
      age: 25,
      sex: "F",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000011",
      first_name: "D11",
      last_name: "Test",
      age: 40,
      sex: "M",
      is_archived: false,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000012",
      first_name: "D12",
      last_name: "Test",
      age: 35,
      sex: "M",
      is_archived: false,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000013",
      first_name: "D13",
      last_name: "Test",
      age: 87,
      sex: "F",
      is_archived: true,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000014",
      first_name: "D14",
      last_name: "Test",
      age: 65,
      sex: "M",
      is_archived: true,
      health_condition: 'Non-neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      MRN: "80000015",
      first_name: "D15",
      last_name: "Test",
      age: 75,
      sex: "M",
      is_archived: true,
      health_condition: 'Neurological',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }
], {}).catch(function (msg) {console.log(msg)});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Patients', null, {});
  }
};
