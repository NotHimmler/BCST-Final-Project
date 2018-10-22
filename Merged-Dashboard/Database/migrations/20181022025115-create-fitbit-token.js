'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FitbitTokens', {
      MRN: {
        type: Sequelize.CHAR(8),
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'MRN'
        }
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
          type: Sequelize.STRING,
          allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FitbitTokens');
  }
};