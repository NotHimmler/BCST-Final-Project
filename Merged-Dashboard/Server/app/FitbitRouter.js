var express = require('express');
var request = require('request-promise-native');
var moment = require('moment');
var fitbitRouter = express.Router();
const db = require('../../Database/models/index.js');
db.FitbitTokens.sync();
db.FitbitData.sync();

const Sequelize = require('sequelize');
const {gt, lte, ne, like, in: opIn} = Sequelize.Op;

//Fitbit API calls

//Date format needs to be yyyy-MM-dd
//Defaults to the past week
function getDataBetweenDates(token, date1, date2) {
    let endDate = date1 ? moment(date1) : moment(new Date());
    let baseDate = date2 ? moment(date2) : moment().subtract(6, "days");
    const baseString = baseDate.format("YYYY-MM-DD")
    const endString = endDate.format("YYYY-MM-DD");
    let url = `https://api.fitbit.com/1/user/-/activities/tracker/steps/date/${baseString}/${endString}.json`
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
                    getDataBetweenDates(token).then(data => {
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
        if (data == null) {
            res.send({error: "No patient with this mrn"})
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
    let mrn = body.mrn;
    let token = body.token;
    let refreshToken = body.refreshToken;
    db.FitbitTokens.findOrCreate({where: {MRN: mrn}, defaults: {token: token, refreshToken: refreshToken}})
    .then(data => {
        console.log(data);
        res.status(200);
        res.redirect("/");
    }).catch(err => {
        console.log(err);
        res.status(400);
        res.send({error: "Database error"});
    })
})

// 404 not found
fitbitRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = fitbitRouter;