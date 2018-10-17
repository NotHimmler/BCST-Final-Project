'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Goals', {
      goal_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      measurement: {
        type: Sequelize.DOUBLE
      },
      freq_val: {
        type: Sequelize.INTEGER
      },
      freq_unit: {
        type: Sequelize.STRING
      },
      per: {
        type: Sequelize.STRING
      },
      link_to: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      MRN: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Patients',
          key: 'MRN'
        }
      },
      parent_goal: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Goals',
          key: 'goal_id'
        }
      },
      goal_string: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Goals');
  }
};