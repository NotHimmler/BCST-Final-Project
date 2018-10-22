'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgExercises = sequelize.define('ProgExercises', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
    },
    program: {
      type: DataTypes.STRING,
    }
  }, {});
  ProgExercises.associate = function(models) {
    // associations can be defined here
  };
  return ProgExercises;
};