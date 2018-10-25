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
    return queryInterface.bulkInsert('Goals', [
      {
        goal_id: 'f5519ba3-1747-4ee5-ad94-78255e24e172',
        start: new Date("2018-10-01"),
        end: new Date("2018-11-01"),
        activity: "To walk independently to and from Bankstown train station from your home (~1km away) at least once per week to access community group activites within 5 months.",
        MRN: '80000001',
        goal_string: "To walk independently to and from Bankstown train station from your home (~1km away) at least once per week to access community group activites within 5 months.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goal_id: uuidv4(),
        start: new Date("2018-10-01"),
        end: new Date("2018-11-01"),
        activity: "To walk to the end of your stree and back without stopping on at least 3 days of the week measuring your walk using Runkeeper for the next 2 weeks.",
        MRN: '80000001',
        goal_string: "To walk to the end of your stree and back without stopping on at least 3 days of the week measuring your walk using Runkeeper for the next 2 weeks.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goal_id: uuidv4(),
        start: new Date("2018-10-01"),
        end: new Date("2018-11-01"),
        activity: "To walk at least 6000 steps on at least 3 days of the week measured using your Fitbit for the next 2 weeks.",
        MRN: '80000001',
        goal_string: "To walk at least 6000 steps on at least 3 days of the week measured using your Fitbit for the next 2 weeks.",
        parent_goal: 'f5519ba3-1747-4ee5-ad94-78255e24e172',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goal_id: uuidv4(),
        start: new Date("2018-10-01"),
        end: new Date("2018-11-01"),
        activity: "To achieve a score of > ........ on the Xbox kinect “stomp it” game by stepping only on the purple and orange lights within 2 weeks.",
        MRN: '80000001',
        parent_goal: 'f5519ba3-1747-4ee5-ad94-78255e24e172',
        goal_string: "To walk at least 6000 steps on at least 3 days of the week measured using your Fitbit for the next 2 weeks.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goal_id: uuidv4(),
        start: new Date("2018-10-01"),
        end: new Date("2018-11-01"),
        activity: "To play the WiiFit jogging plus game at least 3 times a week and complete the track in &lt; 8 minutes within 4 weeks.",
        MRN: '80000001',
        parent_goal: 'f5519ba3-1747-4ee5-ad94-78255e24e172',
        goal_string: "To play the WiiFit jogging plus game at least 3 times a week and complete the track in &lt; 8 minutes within 4 weeks.",
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
    return queryInterface.bulkDelete('Goals', null, {});
  }
};
