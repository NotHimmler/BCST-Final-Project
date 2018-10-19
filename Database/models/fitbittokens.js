'use strict';
module.exports = (sequelize, DataTypes) => {
  const FitbitTokens = sequelize.define('FitbitTokens', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  FitbitTokens.associate = function(models) {
    // associations can be defined here
      FitbitTokens.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  FitbitTokens.removeAttribute('id');
  return FitbitTokens;
};