"use strict";
let Sequelize = require("sequelize");

let modelsConfig = [{
        modelName: "User_Info",
        column: {
            "userid": {
                type: Sequelize.STRING
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
            }
        }
    },
    // add models config here
    // {
    //  modelName: "Test_Model",
    //  column: {
    //     "time": {
    //         type: Sequelize.DATE,
    //         defaultValue: Sequelize.NOW
    //     },
    //  }
    // }
];
let config = {
    modelsConfig
};
module.exports = config;