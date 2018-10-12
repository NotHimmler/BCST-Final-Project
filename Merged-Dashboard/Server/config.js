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
    {
        modelName: "Patient_Info",
        column: {
            "MRN": {
                type: Sequelize.STRING
            },
            "admin": {
                type: Sequelize.BOOLEAN,
                defaultValue:false
            },
            "password": {
                type: Sequelize.STRING
            },
            "firstName": {
                type: Sequelize.STRING
            },
            "lastName": {
                type: Sequelize.STRING
            }
        }
    },
    {
        modelName: "App_Report",
        column: {
            "MRN": {
                type: Sequelize.STRING
            },
            "date": {
                type: Sequelize.DATE
            },
            "numSteps": {
                type: Sequelize.INTEGER
            },
            "distance": {
                type: Sequelize.INTEGER
            },
            "duration": {
                type: Sequelize.INTEGER
            },
            "goalType": {
                type: Sequelize.STRING
            },
            "goalValue": {
                type: Sequelize.INTEGER
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