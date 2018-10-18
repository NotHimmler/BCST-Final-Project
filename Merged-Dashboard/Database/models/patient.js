'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
      Patient.hasMany(models.FitbitData, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
    Patient.hasMany(models.WalkForwardData, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
    Patient.hasMany(models.AmountData, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  return Patient;
};