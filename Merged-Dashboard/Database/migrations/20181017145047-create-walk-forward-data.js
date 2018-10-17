'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WalkForwardData', {
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
      distance: {
        type: Sequelize.DOUBLE
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
      return queryInterface.sequelize.queryInterface.addConstraint('WalkForwardData', ['MRN','date'], {
        type: 'primary key',
        name: 'pk_walkforwarddata'
     });;
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WalkForwardData');
  }
};