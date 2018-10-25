'use strict';
module.exports = (sequelize, DataTypes) => {
  const FitbitGoal = sequelize.define('FitbitGoal', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
      validate: {
        isNumeric: {
          msg: "MRN needs to be numeric"
        }
      }
    },
  }, {});
  FitbitGoal.associate = function(models) {
    // associations can be defined here
    FitbitGoal.belongsTo(models.Goal, {
      foreignKey: 'goal_id',
      onDelete: 'CASCADE'
    });
    FitbitGoal.belongsTo(models.Patient,{
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  return FitbitGoal;
};