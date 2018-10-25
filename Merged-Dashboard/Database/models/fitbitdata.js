'use strict';
module.exports = (sequelize, DataTypes) => {
  const FitbitData = sequelize.define('FitbitData', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
  return FitbitData;
};