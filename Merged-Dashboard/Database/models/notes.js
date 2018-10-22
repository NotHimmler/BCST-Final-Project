'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    mrn: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    note: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user: {
      type: DataTypes.STRING,
      primaryKey: true
    },
  }, {});
  Notes.associate = function(models) {
    // associations can be defined here
  };
  Notes.removeAttribute('id');
  return Notes;
};