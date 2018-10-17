'use strict';
module.exports = (sequelize, DataTypes) => {
  const AmountData = sequelize.define('AmountData', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
    },
    program: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    exercise: {
      type:DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sets: {
      type: DataTypes.INTEGER
    },
    sets_L: {
      type: DataTypes.INTEGER
    },
    sets_R: {
      type: DataTypes.INTEGER
    },
    reps: {
      type: DataTypes.INTEGER
    },
    reps_L: {
      type: DataTypes.INTEGER
    },
    reps_R: {
      type: DataTypes.INTEGER
    },
    dur: {
      type: DataTypes.TIME
    },
    dur_L: {
      type: DataTypes.TIME
    },
    dur_R: {
      type: DataTypes.TIME
    },
  }, {});
  AmountData.associate = function(models) {
    // associations can be defined here
    AmountData.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  return AmountData;
};