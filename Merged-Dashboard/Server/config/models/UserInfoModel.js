"use strict";
let Sequelize = require("sequelize");

const userInfoModel = {
    modelName: "User_Info",
    column: {
        "userid": {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        "email": {
            type: Sequelize.STRING
        },
        "registeredOn": {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        "admin": {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        "username": {
            type: Sequelize.STRING
        },
        "password": {
            type: Sequelize.STRING
        },
        "token": {
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
        }
    }
}

module.exports = userInfoModel;