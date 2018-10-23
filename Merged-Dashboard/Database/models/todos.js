'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    date_done: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
    Todos.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return Todos;
};