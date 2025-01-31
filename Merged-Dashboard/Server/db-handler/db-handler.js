"use strict";
let modelsConfig = require('../config/config.js').modelsConfig;
let Sequelize = require("sequelize");

let crypto = require('crypto');
let base64url = require('base64url');
let passwordGenerator = require('password-generator');

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
            this.sequelize.model('Tokens').create({token: token, userid: userId})
            .then(result => {
                console.log(result)
                resolve({token: token});
            }).catch(err => {
                console.log(err);
                reject({err: err});
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
                        this.createUserToken(iputUserid).then(data => {
                            if (data.err) reject({error: "There was an error"});
                            console.log("Token:")
                            console.log(data)
                            response[0].token = data.token;
                            resolve(response);
                        }).catch(err => {
                            console.log(err)
                            reject({error: "There was an error creating a token"})
                        })
                    }
                    //Set auth token for response
                    
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

        let sqlQuery = 'select patient_id from PatientMatchTherapist where patient_id = "test"';
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                // console.log(data);
                let response = data[0];
                console.log(response);
                if (response) {
                    resolve({patientIds: response[0].patient_id});
                } else {
                    resolve(errorInfo);
                }

            }).catch((e) => {
                resolve(e);
            });
        });
        return promise;

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

    getPatientMrnFromToken(token) {
        let sqlQuery = `SELECT mrn FROM Patient JOIN User_Info ON User_Info.userid = Patient.patient_id JOIN Tokens on Tokens.userid = User_Info.userid WHERE token = "${token}"`
        return new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                console.log(data[0]);
                let mrn = data[0][0].mrn
                if (mrn != undefined) {
                    resolve({mrn: mrn})
                } else {
                    reject({error: "No MRN for token"})
                }
                
            }).catch(err => {
                console.log(err)
                reject({error: "Token does not exist"})
            })
        })
    }

    walkDataHandler(walkData) {
        let token = walkData.token
        let promises = [];
        
        this.getPatientMrnFromToken(token).then((data) => {
            for (let i in walkData.walks) {
                let walk = walkData.walks[i]
                console.log(data)
                let sqlQuery = `INSERT INTO App_Report (numSteps, distance, duration, goalType, goalValue, date, MRN) VALUES ( ${walk.numSteps}, ${walk.distance}, ${walk.duration}, "${walk.goalType}", ${walk.goalValue}, ${Math.round(walk.date)}, "${data.mrn}")`;
                promises.push(
                    new Promise((resolve, reject) => {
                        this.sequelize.query(sqlQuery).then(data => {
                            let response = data[0];
                            console.log("Inserted");
                            if (response && response[0]) {
                                resolve();
                            }
                            
                        }).catch((e) => {
                            console.log("Walk not inserted")
                            reject(e);
                        });
                    })
                )
            }
        }).catch(err => {
            return err
        })
        
        return Promise.all(promises)
    }

    getWalkDataHandler(mrn) {
        let sqlQuery = `SELECT * FROM App_Report WHERE MRN = "${mrn}"`
        return new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0]
                if(response && response[0]) {
                    //console.log(response);
                    resolve(response);
                } else {
                    reject({error: "No data"})
                }
            }).catch(err => {
                console.log(err);
                reject({error: "DB Error"})
            })
        })
    }

    addPatientHandler(patientData) {
        console.log(patientData);
        let sqlQuery = `SELECT mrn FROM Patient WHERE mrn=${patientData.mrn}`
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQuery).then(data => {
                let response = data[0];
                console.log("Before if");
                if (response && response[0]) {
                    //MRN already in the database
                    console.log(response[0]);
                    reject({error: "MRN already in system"});
                } else {
                    //Create a new user_info entry for the new patient
                    //with random password, mrn = userid
                    let userInfo = {
                        userid: patientData.mrn,
                        admin: false,
                        username: patientData.mrn,
                        password: passwordGenerator()
                    }
                    this.updateUserInfoModel(userInfo).then(data => {
                        console.log("Successfully inserted into db");
                        resolve(data);
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                    })
                }
            }).catch((e) => {
                console.log(e)
                reject(e);
            });
        });
        return promise;
    }
}

module.exports = DBHandler;