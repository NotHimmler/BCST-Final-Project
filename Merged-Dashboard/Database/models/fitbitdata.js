'use strict';
module.exports = (sequelize, DataTypes) => {
  const FitbitData = sequelize.define('FitbitData', {
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
    steps: {
      type: DataTypes.INTEGER
    }
  }, {});
  FitbitData.associate = function(models) {
    // associations can be defined here
      FitbitData.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  FitbitData.removeAttribute('id');
  return FitbitData;
};