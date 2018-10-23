'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AmountData', {
      MRN: {
        type: Sequelize.CHAR(8),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'MRN'
        }
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      program: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exercise: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sets: {
        type: Sequelize.INTEGER
      },
      sets_L: {
        type: Sequelize.INTEGER
      },
      sets_R: {
        type: Sequelize.INTEGER
      },
      reps: {
        type: Sequelize.INTEGER
      },
      reps_L: {
        type: Sequelize.INTEGER
      },
      reps_R: {
        type: Sequelize.INTEGER
      },
      dur: {
        type: Sequelize.STRING
      },
      dur_L: {
        type: Sequelize.STRING
      },
      dur_R: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AmountData');
  }
};