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
        type: Sequelize.DATE,
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
      isCompleted: {
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
        type: Sequelize.TIME
      },
      dur_L: {
        type: Sequelize.TIME
      },
      dur_R: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.sequelize.queryInterface.addConstraint('AmountData', ['MRN','date','program','exercise'], {
        type: 'primary key',
        name: 'pk_amountdata'
     });;
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AmountData');
  }
};