var express = require('express');
var fitbitRouter = express.Router();
const db = require('../../Database/models/index.js');
db.FitbitTokens.sync();
db.FitbitData.sync();

const Sequelize = require('sequelize');
const {gt, lte, in: opIn} = Sequelize.Op;

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
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']],
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
    return db.FitbitData.findAll({
        attributes: ["MRN", [Sequelize.fn('sum', Sequelize.col('steps')), 'steptotal']],
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']],
        group: ['MRN'],
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