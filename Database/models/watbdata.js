'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatbData = sequelize.define('WatbData', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
    },
    dateMillis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    "numSteps": {
        type: DataTypes.INTEGER
    },
    "distance": {
        type: DataTypes.INTEGER
    },
    "duration": {
        type: DataTypes.INTEGER
    },
    "goalType": {
        type: DataTypes.STRING
    },
    "goalValue": {
        type: DataTypes.INTEGER
    }
  }, {});
  WatbData.associate = function(models) {
    // associations can be defined here
    WatbData.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  WatbData.removeAttribute('id');
  return WatbData;
};