"use strict";
let Sequelize = require("sequelize");
let Util = require("../core/util");

class DBHandler {
    constructor() {
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
        // create model-table link
        this.createUserInfoModel().then(() => {
            this.ready = true;
            console.log("DB is ready now");
        });
    }

    defaultOption() {
        return {
            dialect: "sqlite",
            storage: "./server_db/userInfo.sqlite",
            modelName: "User_Info",
            column: {
                "userid": {
                    type: Sequelize.STRING
                },
                "email": {
                    type: Sequelize.STRING
                },
                "registeredOn": {
                    type: Sequelize.STRING
                },
                "admin": {
                    type: Sequelize.BOOLEAN
                },
                "username": {
                    type: Sequelize.STRING
                },
                "password": {
                    type: Sequelize.STRING
                }
            }
        };
    }

    createUserInfoModel(modelType, syncOption) {
        let option = this.defaultOption();
        let modelName = option.modelName;
        let modelColumn = option.column;
        return this.sequelize.define(modelName, modelColumn, {
            freezeTableName: true, // table name is same as model name
            timestamps: false
        }).sync(syncOption);
    }

    updateUserInfoModel(userInfo) {
        let option = this.defaultOption();
        let modelName = option.modelName;
        return this.sequelize.model(modelName).create(userInfo);
    }

    loginHandler(inputUserInfo) {
        let iputUserid = inputUserInfo.userid;
        let inputPassword = inputUserInfo.password;
        let errorInfo = {
            error: "Wrong user name or password"
        };
        if (!iputUserid || !inputPassword) {
            return Promise.resolve(errorInfo);
        }
        let sqlQueryUserId = `select userid,username,password from User_Info where userid in ('${iputUserid}')`;
        let promise = new Promise((resolve, reject) => {
            this.sequelize.query(sqlQueryUserId).then(data => {
                let response = data[0];
                if (response && response[0] && inputPassword === response[0].password) {
                    resolve(response);
                } else {
                    resolve(errorInfo);
                }

            }).catch((e) => {
                resolve(errorInfo);
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
}
let dBHandler = new DBHandler();
module.exports = dBHandler;