'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    MRN: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
      validate: {
        isNumeric: {
          msg: "MRN needs to be numeric"
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER
    },
    sex: {
      type: DataTypes.STRING,
      validate: {
        isIn:{
          args: [['M','F']],
          msg: "Sex must be 'M' or 'F'",
      },
      }
    },
    health_condition: {
      type: DataTypes.STRING
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_archived: {
      type: DataTypes.DATE,
    },
    last_checkup_by: {
      type: DataTypes.STRING,
    },
    last_checkup_date: {
      type: DataTypes.DATE,
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
    // many to many relationship with user
    // Patient.belongsToMany(User, { through: UserPatients });
  };
  return Patient;
};