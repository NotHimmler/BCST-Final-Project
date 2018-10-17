'use strict';
module.exports = (sequelize, DataTypes) => {
  const WalkForwardData = sequelize.define('WalkForwardData', {
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
    distance: {
      type: DataTypes.DOUBLE
    }
  }, {});
  WalkForwardData.associate = function(models) {
    // associations can be defined here
    WalkForwardData.belongsTo(models.Patient, {
      foreignKey: 'MRN',
      onDelete: 'CASCADE'
    });
  };
  WalkForwardData.removeAttribute('id');
  return WalkForwardData;
};