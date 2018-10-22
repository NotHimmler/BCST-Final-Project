'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    mrn: DataTypes.STRING,
    note: DataTypes.STRING,
    date: DataTypes.STRING,
    user: DataTypes.STRING
  }, {});
  Notes.associate = function(models) {
    // associations can be defined here
  };
  return Notes;
};