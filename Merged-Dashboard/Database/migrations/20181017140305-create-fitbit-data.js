'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FitbitData', {
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
      steps: {
        type: Sequelize.INTEGER
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
      return queryInterface.sequelize.queryInterface.addConstraint('FitbitData', ['MRN','date'], {
        type: 'primary key',
        name: 'pk_fitbitdata'
     });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FitbitData');
  }
};