'use strict';
module.exports = (sequelize, DataTypes) => {
  const AmountData = sequelize.define('AmountData', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    program: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    exercise: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    is_completed: {
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
      type: DataTypes.STRING
    },
    dur_L: {
      type: DataTypes.STRING
    },
    dur_R: {
      type: DataTypes.STRING
    },
  }, {});
  AmountData.associate = function(models) {
    // associations can be defined here
    AmountData.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  AmountData.removeAttribute('id');
  return AmountData;
};