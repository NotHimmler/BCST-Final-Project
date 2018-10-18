'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      MRN: {
        type: Sequelize.CHAR(8),
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER
      },
      sex: {
        type: Sequelize.STRING
      },
      health_condition: {
        type: Sequelize.STRING
      },
      is_archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      return queryInterface.addConstraint('Patients', ['sex'], {
        type: 'check',
        where: {
           sex: ['M', 'F']
        }
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Patients');
  }
};