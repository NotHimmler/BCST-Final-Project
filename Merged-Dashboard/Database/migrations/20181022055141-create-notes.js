'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notes', {
      mrn: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      note: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      user: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notes');
  }
};