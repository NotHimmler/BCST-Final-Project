"use strict";
let modelsConfig = require('../config/config.js').modelsConfig;
let Sequelize = require("sequelize");

let crypto = require('crypto');
let base64url = require('base64url');
let UserInfoModel = require('../config/models/UserInfoModel');

const op = Sequelize.Op;

class DBHandler {
    constructor(args) {
        if (args) {
            console.log("using test database");
            this.defaultOption.storage = "./server_db/dashboard_test.sqlite"
        }
        this.initialize();
    }

    initialize() {
        let option = this.defaultOption();
        let dialect = option.dialect;
        let storage = option.storage;
        this.sequelize = new Sequelize('database', 'user', 'password', {
            // the sql dialect of the database
            // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
            dialect,
            // the storage engine for sqlite
            // - default ':memory:'
            storage,
            operatorsAliases: false,
            logging: false
        });
        // initialize DB
        this.initializeModels().then(() => {
            this.ready = true;
            console.log("DB is ready now");
        });
    }

    defaultOption() {
        return {
            dialect: "sqlite",
            storage: "./server_db/dashboard.sqlite",
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
                },
                "token:": {
                    type: Sequelize.STRING,
                    default: null,
                    allowNull: true
                }
            }
        };
    }

    // create all models here
    // config models option in config.js:modelsConfig
    initializeModels() {
        let promiseList = [];
        for(let i = 0,l = modelsConfig.length; i<l; i++) {
            let option = modelsConfig[i];
            // modelName and column is needed
            if(!option.modelName||!option.column) {
                continue;
            }
            let createModel = this.createModel(option);
            promiseList.push(createModel);
        }
        // this.intiModelsRelation();

        // let createUserInfoModel = this.createModel();
        // promiseList.push(createUserInfoModel);
        return Promise.all(promiseList);
    }

    // intiModelsRelation() {
    //     let sequelize = this.sequelize;
    //     let User = sequelize.model("User_Info");
    //     let Paitent = sequelize.model("Patient");
    //     let Therapist = sequelize.model("Therapist");
    //     Paitent.belongsTo(User);
    //     Therapist.belongsTo(User);
    // }

    intiModelsRelation() {
        modelsConfig.forEach((item) => {
            let belongsToModelName = item.belongsTo;
            if(!belongsToModelName) {
                return;
            }
            let sequelize = this.sequelize;
            let belongsToModel =sequelize.model(belongsToModelName);
            sequelize.model(item.modelName).belongsTo(belongsToModel);
        });
    }

    // create a model
    createModel(option) {
        option = option || this.defaultOption();
        let modelName = option.modelName;
        let column = option.column;
        return this.sequelize.define(modelName, column, {
            freezeTableName: true, // table name is same as model name
            timestamps: false
            //it will delete the old model and create if option.sync = true
        }).sync(option.sync);
    }

    // createUserInfoModel(modelType, syncOption) {
    //     let option = this.defaultOption();
    //     let modelName = option.modelName;
    //     let modelColumn = option.column;
    //     return this.sequelize.define(modelName, modelColumn, {
    //         freezeTableName: true, // table name is same as model name
    //         timestamps: false
    //     }).sync(syncOption);
    // }

    updateUserInfoModel(userInfo) {
        let option = this.defaultOption();
        let modelName = option.modelName;
        return this.sequelize.model(modelName).create(userInfo);
    }

    removeUserInfo(userInfo) {
        let userId = userInfo.userid;
        let errorInfo = {"error": "User does not exist"}
        let sqlQuery = `delete from User_info where userid in ('${userId}')`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0]
            })
        })
    }

    createUserToken(userId) {
        let token = base64url(crypto.randomBytes(48));
        return new Promise((resolve, reject) => {
            this.sequelize.model('Tokens').insert({token: token, userid: userId})
            .then(result => {
                resolve({token: token});
            }).catch(err => {
                console.log(err);
                resolve({err: err});
            })
        })
    }

    loginHandler(inputUserInfo) {
        let iputUserid = inputUserInfo.userid;
        let inputPassword = inputUserInfo.password;
        let errorInfo = {
            error: "Wrong user name or password"
        };
        if (!iputUserid || !inputPassword) {
            errorInfo.error = "Username or password not given";
            return Promise.resolve(errorInfo);
        }
        let sqlQueryUserId = `select User_Info.userid, User_Info.username, User_Info.password, Tokens.token from User_Info left outer join Tokens ON User_Info.userid = Tokens.userid where User_Info.userid in ('${iputUserid}')`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQueryUserId).then(data => {
                let response = data[0];
                //Username and password are correct
                if (response && response[0] && inputPassword == response[0].password) {
                    //Check if there's already an auth token
                    
                    let token = response[0].token;
                    if (token == null) {
                        //No auth token, create one
                        token = this.createUserToken(iputUserid).then(data => {
                            if (data.err) resolve(errorInfo);
                            token = data.token;
                        })
                    }
                    //Set auth token for response
                    response[0].token = token
                    resolve(response);
                } else {
                    
                    reject(errorInfo);
                }

            }).catch((e) => {
                console.log(e);
                reject(errorInfo);
            });
        });
        return promise;
    }

    registerHandler(inputUserInfo) {
        let iputUserid = inputUserInfo.userid;
        let sqlQueryUserId = `select userid from User_Info where userid in ('${iputUserid}')`;
        let errorInfo = {
            error: "user name already exists"
        };
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQueryUserId).then(data => {
                let response = data[0];
                if (response && response[0] && iputUserid === response[0].userid) {
                    console.log('register:' + errorInfo);
                    resolve(errorInfo);
                } else {
                    return this.updateUserInfoModel(inputUserInfo)
                }
            }).then(() => {
                console.log('register:'+iputUserid);
                resolve(inputUserInfo);
            }).catch((e) => {
                this.updateUserInfoModel(inputUserInfo).then(() => {
                    console.log('register:'+iputUserid);
                    resolve(inputUserInfo);
                });
            });
        });
        return promise;
    }

    lastCheckoutHandler(patientId) {
        let errorInfo = {
            error: "No such patient."
        };
        if (!patientId) {
            return Promise.resolve(errorInfo);
        }
        let sqlQuery = `select last_checkout from Patient where patient_id in ('${patientId}')`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                if (response && response[0] && response[0].last_checkout) {
                    resolve({lastChecked: response[0].last_checkout});
                } else {
                    resolve(errorInfo);
                }

            }).catch((e) => {
                resolve(e);
            });
        });
        return promise;

    }

    patientListHandler(therapistId) {
        let errorInfo = {
            error: "No such therapist."
        };
        if (!therapistId) {
            return Promise.resolve(errorInfo);
        }
        // Patient.findAll({
        //     include: [{
        //         model: PatientMatchTherapist,
        //         where: {

        //         }
        //     }]
        // }
        // )

        // let sqlQuery = `select patient_id from PatientMatchTherapist where therapist_id in ('${therapistId}')`;
        // let promise = new Promise((resolve, reject) => {
        //     this.sequelize.query(sqlQuery).then(data => {
        //         let response = data[0];
        //         if (response && response[0] && response[0].last_checkout) {
        //             resolve(response[0].last_checkout);
        //         } else {
        //             resolve(errorInfo);
        //         }

        //     }).catch((e) => {
        //         resolve(e);
        //     });
        // });
        // return promise;

    }

    //FITBIT DATA
    fitbitHandler(patientId) {
        let errorInfo = {
            error: "No such patient."
        };
        if (!patientId) {
            return Promise.resolve(errorInfo);
        }
        let sqlQuery = `SELECT date,step 
                        FROM FitbitData 
                        WHERE patient_id ="${patientId}"
                        ORDER BY date(date)
                        `;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                if (response && response[0]) {
                    resolve({data: data[0]});
                } else {
                    resolve(errorInfo);
                }

            }).catch((e) => {
                resolve(e);
            });
        });
        return promise;

    }

    insertWalkData(walkData, mrn) {
        let sqlQuery = `select mrn from Patient inner join Patient ON Patient.patientid=User_Info.userid where User_Info.token=${walkData.token}`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                if (response && response[0] && response[0].last_checkout) {
                    resolve(response[0].last_checkout);
                } else {
                    reject(errorInfo);
                }

            }).catch((e) => {
                reject(e);
            });
        });
        return promise;
    }

    walkDataHandler(walkData) {
        let sqlQuery = `INSERT INTO App_Report (numSteps, distance, duration, goalType, goalValue, date, MRN) VALUES ( ${walkData.numSteps}, ${walkData.distance}, ${walkData.duration},${walkData.goalType},${walkData.goalValue}, ${new Date(walkData.date)} (select mrn from Patient inner join Patient ON Patient.patientid=User_Info.userid where User_Info.token=${walkData.token}))`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                if (response && response[0] && response[0].last_checkout) {
                    console.log(response[0])
                    resolve();
                } else {
                    reject(errorInfo);
                }

            }).catch((e) => {
                reject(e);
            });
        });
        return promise;
    }

    addPatientHandler(patientData) {
        let sqlQuery = `SELECT mrn FROM Patient WHERE mrn=${patientData.MRN}`
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                if (response && response[0] && response[0].last_checkout) {
                    console.log(response[0]);
                } else {
                    reject(errorInfo);
                }
            }).catch((e) => {
                reject(e);
            });
        });
    }
}

module.exports = DBHandler;