'use strict';
const amountData = require('../../data/amount-data.json');

const correctCols = amountData.map(item => {
  return ({
    sets: item["Sets"],
    sets_L: item['SetsLeft'],
    sets_R: item['SetsRight'],
    dur_L: String(item['DurationLeft']),
    dur_R: String(item['DurationRight']),
    dur: item['Duration'],
    reps: item['Repetitions'],
    reps_L: item['RepetitionsLeft'],
    reps_R: item['RepetitionsRight'],
    date: item['Date'],
    program: item['PatientExerciseDatesExercisesPrograms::Name'].replace('AMOUNT program: ', ''),
    exercise: item['PatientExerciseDatesExercises::Exercise title'],
    is_completed: item['ExerciseCompleted_c'],
    MRN: String(item['MRN'])
  })
})

console.log(correctCols);

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
