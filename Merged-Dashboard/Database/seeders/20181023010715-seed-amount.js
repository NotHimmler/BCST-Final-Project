'use strict';
const amountData = require('../../data/amount-data.json');

const correctCols = amountData.map(item => {
  return ({
    sets: Number(item["Sets"]),
    sets_L: Number(item['SetsLeft']),
    sets_R: Number(item['SetsRight']),
    dur_L: String(item['DurationLeft']),
    dur_R: String(item['DurationRight']),
    dur: String(item['Duration']),
    reps: Number(item['Repetitions']),
    reps_L: Number(item['RepetitionsLeft']),
    reps_R: Number(item['RepetitionsRight']),
    date: String(item['Date']),
    program: String(item['PatientExerciseDatesExercisesPrograms::Name'].replace('AMOUNT program: ', '')),
    exercise: String(item['PatientExerciseDatesExercises::Exercise title']),
    is_completed: Boolean(item['ExerciseCompleted_c']),
    MRN: String(item['MRN'])
  })
})

console.log(correctCols.length);

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
   return queryInterface.bulkInsert('AmountData', correctCols, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
