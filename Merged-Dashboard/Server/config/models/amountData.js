"use strict";
let Sequelize = require("sequelize");

let amountDataModel = {
    modelName: "AmountData",
    column: {
        "amount_data_id": {
            type: Sequelize.STRING,
            primaryKey: true
        },
        "exercise_title": {
            type: Sequelize.STRING
        },
        "date": {
            type: Sequelize.DATE
        },
        "completed": {
            type: Sequelize.STRING
        },
        "sets": {
            type: Sequelize.STRING
        },
        "sets_left": {
            type: Sequelize.STRING
        },
        "sets_right": {
            type: Sequelize.STRING
        },
        "repetitions": {
            type: Sequelize.STRING
        },
        "repetitions_left": {
            type: Sequelize.STRING
        },
        "repetitions_right": {
            type: Sequelize.STRING
        },
        "duration": {
            type: Sequelize.STRING
        },
        "duration_left": {
            type: Sequelize.STRING
        },
        "duration_right": {
            type: Sequelize.STRING
        },
        "patient_id": {
            // foreign key
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "Patient",
                key: "patient_id"
            }
        }
    }
};

module.exports = amountDataModel;
