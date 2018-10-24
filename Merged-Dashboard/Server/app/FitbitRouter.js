var express = require('express');
var request = require('request-promise-native');
var moment = require('moment');
var fitbitRouter = express.Router();
const db = require('../../Database/models/index.js');
//db.FitbitTokens.sync();
//db.FitbitData.sync();

const Sequelize = require('sequelize');
const {gt, lte, ne, like, in: opIn} = Sequelize.Op;

//Fitbit API calls

//Date format needs to be yyyy-MM-dd
//Defaults to the past week
function getDataBetweenDates(token, user_id, date1, date2) {
    let endDate = date1 ? moment(date1) : moment(new Date());
    let baseDate = date2 ? moment(date2) : moment().subtract(6, "days");
    const baseString = baseDate.format("YYYY-MM-DD")
    const endString = endDate.format("YYYY-MM-DD");
    let url = `https://api.fitbit.com/1/user/${user_id}/activities/tracker/steps/date/${baseString}/${endString}.json`
    let options = {
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return new Promise((resolve, reject) => {
        request(options).then(data => {
            resolve(data);
        }).catch(err => {
            console.log("Could not fetch fitbit data");
            let errors = JSON.parse(err.error)
            for(let error of errors.errors) {
                if(error.errorType === 'expired_token')
                    console.log(error.message)
                    resolve({error:'expired_token'});
                    return;
            }
            reject(err);
        })
    })
}

////////////////////////////////////////////////////

// Get all fb data
fitbitRouter.get('/', function(req,res) {
    return db.FitbitData.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

// Get fb data for patient with specific mrn
fitbitRouter.get("/mrn/:mrn", function(req, res) {
    //console.log(req.params.mrn)
    return db.FitbitData.findAll({
        attributes: ['MRN', 'date', 'steps'],
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']],
        limit: 7,
    })
    .then((data) => {
        //No database in fitbit table
        console.log("DB Data");
        if (data.length == 0) {
            //Check if there is a fitbit token
            db.FitbitTokens.findOne({where: {MRN: req.params.mrn}})
            .then(data => {
                //console.log(data);
                if(data == null) {
                    res.send({error: "No data for patient with this mrn"})
                } else {
                    //Use fitbit api to get data
                    let token = data.dataValues.token;
                    let user_id = data.dataValues.user_id;
                    getDataBetweenDates(token, user_id).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send({"error": err})
                    })
                }
            }).catch(err => {
                console.log('There was an error querying contacts', JSON.stringify(err))
                return res.send(err)
            })
        //There is stored data in the database
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

 // Get fb data for patient with specific mrn
fitbitRouter.get("/mrn/:mrn/datelimit", function(req, res) {
    //console.log(req.params.mrn)
    return db.FitbitData.findAll({
        attributes: ['MRN', 
        [Sequelize.fn('min', Sequelize.col('date')), 'from'],
        [Sequelize.fn('max', Sequelize.col('date')), 'to']],
        where: {
            MRN: req.params.mrn,
        },
        group: ['MRN']
    })
    .then((data) => {
        if (data.length == 0) {
            //Check if there is a fitbit token
            db.FitbitTokens.findOne({where: {MRN: req.params.mrn}})
            .then(data => {
                //console.log(data);
                if(data == null) {
                    res.send({error: "No data for patient with this mrn"})
                } else {
                    let defaultData = [{
                        to:moment(new Date()),
                        from:"2000-01-01",
                    }];
                    res.send(defaultData);
                }
            }).catch(err => {
                console.log('There was an error querying contacts', JSON.stringify(err))
                return res.send(err)
            })
        //There is stored data in the database
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

// Get fb data for patient with specific mrn between specific dates
// Dates should be in the format "YYYY-MM-DD"
fitbitRouter.get("/mrn/:mrn/dates/:from/:to", function(req, res) {
    return db.FitbitData.findAll({
        attributes: ['MRN', 'date', 'steps'],
        where: {
            MRN: req.params.mrn,
            date: {
                [gt]: moment(req.params.from),
                [lte]: moment(req.params.to).add(1, 'days')
            }
        },
        order: [['date', 'DESC']],
    })
    .then((data) => {
        if (data.length == 0) {
            //Check if there is a fitbit token
            db.FitbitTokens.findOne({where: {MRN: req.params.mrn}})
            .then(data => {
                //console.log(data);
                if(data == null) {
                    res.send({error: "No data for patient with this mrn"})
                } else {
                    //Use fitbit api to get data
                    let token = data.dataValues.token;
                    let user_id = data.dataValues.user_id;
                    getDataBetweenDates(token, user_id, req.params.from, req.params.to).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send({"error": err})
                    })
                }
            }).catch(err => {
                console.log('There was an error querying contacts', JSON.stringify(err))
                return res.send(err)
            })
        //There is stored data in the database
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

 // Get fb data for patient with specific mrn
fitbitRouter.get("/mrn/:mrn/weekly", function(req, res) {
    //console.log(req.params.mrn)
    db.sequelize.query("SELECT MRN,strftime('%Y-%m-%d', `date`)AS `week end`,SUM(steps) FROM `FitbitData` WHERE MRN = 80000001 GROUP BY strftime('%W', `date`)", { type: db.sequelize.QueryTypes.SELECT})
    /* return db.FitbitData.findAll({
        attributes: ['MRN', "steps",
        [Sequelize.fn('strftime', Sequelize.col('date'), '%m-%d-%Y'), 'date']],
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']]
    }) */
    .then((data) => {
        if (data == null) {
            res.send({error: "No patient with this mrn"})
        } else {
            res.send(data)
            //console.log(data);
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

  // Get fb data for patient with specific mrn
fitbitRouter.get("/mrn/:mrn/weeklytest", function(req, res) {
    //console.log(req.params.mrn)
    db.sequelize.query("SELECT MRN,strftime('%Y-%m-%d', `date`)AS `date`,strftime('%W', `date`)AS `week`, strftime('%w', `date`)AS `weekday`,steps FROM `FitbitData` WHERE MRN = 80000001", { type: db.sequelize.QueryTypes.SELECT})
    /* return db.FitbitData.findAll({
        attributes: ['MRN', "steps",
        [Sequelize.fn('strftime', Sequelize.col('date'), '%m-%d-%Y'), 'date']],
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']]
    }) */
    .then((data) => {
        if (data == null) {
            res.send({error: "No patient with this mrn"})
        } else {
            res.send(data)
            //console.log(data);
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

// FITBIT AUTH STUFF
//=============================================================================================
fitbitRouter.get('/getAuthBasic', (req, res) => {
    const fitbitSecret = process.env.FBCS;
    const fitbitClient = process.env.FBCID;
    let auth_basic = (Buffer.from(fitbitClient + ":" + fitbitSecret)).toString('base64');
    res.send(auth_basic);
})

fitbitRouter.post('/addFitbitToken', (req, res) => {
    let body = req.body;
    let code = body.code
    let mrn = body.mrn;
    const fitbitSecret = process.env.FBCS;
    const fitbitClient = process.env.FBCID;
    let auth_basic = (Buffer.from(fitbitClient + ":" + fitbitSecret)).toString('base64');
    let serverDomain = process.env.DEV ? require('./TestConfig').redirect_uri : require('./BuildConfig').redirect_uri;
    let options = {
        url: `https://api.fitbit.com/oauth2/token?clientId=22CZMN&grant_type=authorization_code&redirect_uri=${serverDomain}/fitbitAuth/&code=${code}`,
        headers: {
            'Authorization': `Basic ${auth_basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST"
    }
    request(options).then(data => {
        let data2 = JSON.parse(data);
        let token = data2["access_token"];
        let refreshToken = data2['refresh_token'];
        let user_id = data2['user_id'];
        let defaults = {
            token: token,
            refreshToken: refreshToken,
            user_id: user_id
        }

        db.FitbitTokens.findOrCreate({where: {MRN: mrn}, defaults: defaults})
        .then(data => {
            console.log(data);
            res.status(200);
        }).catch(err => {
            console.log(err);
            res.status(400);
            res.send({error: "Database error"});
        })
    }).catch(err => {
        console.log(err)
    })
})

fitbitRouter.get('/getAuthURL', (req, res) => {
    let config = process.env.DEV ? require("./TestConfig") : require("./BuildConfig");
    let clientId = config.client_id;
    let serverDomain = config.redirect_uri;
    let url = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${serverDomain}/fitbitAuth/&scope=activity%20profile&expires_in=31536000`
    res.send({url: url});
})

// 404 not found
fitbitRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = fitbitRouter;