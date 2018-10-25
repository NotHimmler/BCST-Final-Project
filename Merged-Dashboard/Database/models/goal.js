'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    goal_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    measurement: {
      type: DataTypes.DOUBLE
    },
    freq_val: {
      type: DataTypes.INTEGER
    },
    freq_unit: {
      type: DataTypes.STRING
    },
    per: {
      type: DataTypes.STRING
    },
    link_to: {  //Link goal to technology e.g. fitbit
      type: DataTypes.STRING
    },
    goal_string: {  //String to display on front-end
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Goal.associate = function(models) {
    // associations can be defined here
    Goal.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      allowNull: false,
      onDelete: 'CASCADE'
    });
    Goal.belongsTo(models.User, {
      foreignKey: 'created_by',
      onDelete: 'CASCADE'
    });
    // Unary relationship for global goal and sub goal
    Goal.belongsTo(models.Goal, {
      foreignKey: 'parent_goal',
      onDelete: 'CASCADE'
    });
    Goal.hasMany(models.Goal, {
      foreignKey: 'parent_goal',
      onDelete: 'CASCADE'
    });
  };
  return Goal;
};