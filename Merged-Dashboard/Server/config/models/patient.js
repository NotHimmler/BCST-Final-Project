"use strict";
let Sequelize = require("sequelize");

let patientModel = {
    modelName: "Patient",
    column: {
        "patient_id": {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "User_Info",
                key: "userid"
            },
            primaryKey: true
        },
        "mrn": {
            type: Sequelize.STRING
        },
        "first_name": {
            type: Sequelize.STRING
        },
        "last_name": {
            type: Sequelize.STRING
        },
        "ward": {
            type: Sequelize.STRING
        },
        "patient_name": {
            type: Sequelize.STRING
        },
        "weekly_fibit_steps": {
            type: Sequelize.INTEGER
        },
        "fitbit_goal_attained": {
            type: Sequelize.DOUBLE
        },
        "weekly_walkforward_distances": {
            type: Sequelize.DOUBLE
        },
        "walkforward_goal_attained": {
            type: Sequelize.DOUBLE
        },
        // "userid": {
        //     // foreign key
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     references: {
        //         model: "User_Info",
        //         key: "userid"
        //     }
        // },
        "last_checkout": {
            type: Sequelize.STRING
        }
    },
    // relation: belongs to model "User_Info"
    belongsTo: "User_Info"
};

module.exports = patientModel;
