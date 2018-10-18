"use strict";
let Sequelize = require("sequelize");
let amountData = require('./models/amountData');
let patient = require('./models/patient');

let modelsConfig = [{
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
            }
        }
    }, {
        modelName: "GlobalGoal",
        column: {
            "global_goal_id": {
                type: Sequelize.STRING,
                primaryKey: true
            },
            "start_date": {
                type: Sequelize.DATE
            },
            "end_date": {
                type: Sequelize.DATE
            },
            "content": {
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
        },
        belongsTo: "Patient"
    }, {
        modelName: "FitbitData",
        column: {
            "fitbit_data_id": {
                type: Sequelize.STRING,
                primaryKey: true
            },
            "date": {
                type: Sequelize.DATE
            },
            "step": {
                type: Sequelize.INTEGER
            },
            "goal_step": {
                type: Sequelize.DOUBLE
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
        },
        belongsTo: "Patient"
    }, {
        modelName: "WalkforwardData",
        column: {
            "walkforward_data_id": {
                type: Sequelize.STRING,
                primaryKey: true
            },
            "date": {
                type: Sequelize.DATE
            },
            "distance": {
                type: Sequelize.DOUBLE
            },
            "goal_distance": {
                type: Sequelize.DOUBLE
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
        },
        belongsTo: "Patient"
    }, {
        modelName: "PatientMatchTherapist",
        column: {
            "patient_match_therapist_id": {
                type: Sequelize.STRING,
                primaryKey: true
            },
            "therapist_id": {
                // foreign key
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "Therapist",
                    key: "therapist_id"
                }
            },
            "archived": {
                type: Sequelize.STRING
            },
            "graph_setting": {
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
    }, {
        modelName: "Therapist",
        column: {
            "therapist_id": {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "User_Info",
                    key: "userid"
                },
                primaryKey: true
            },
            "therapist_name": {
                type: Sequelize.STRING
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
            "graph_preference": {
                type: Sequelize.STRING
            }
        }
    },
    amountData,
    patient,
    {
        modelName: "App_Report",
        column: {
            "MRN": {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            "date": {
                type: Sequelize.INTEGER,
                primaryKey: true
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
    {
        modelName: "Tokens",
        column: {
            "userid": {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "User_Info",
                    key: "userid"
                },
                primaryKey: true
            },
            "token": {
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    }
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