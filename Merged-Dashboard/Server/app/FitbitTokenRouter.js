var express = require('express');
var fitbitTokenRouter = express.Router();
const db = require('../../Database/models/index.js'); // new require for db object

const Sequelize = require('sequelize');
const {gt, lte, ne, like, in: opIn} = Sequelize.Op;

// Get all patients
fitbitTokenRouter.get('/', function(req,res) {
    return db.FitbitTokens.findAll()
    .then((tokens) => res.send(tokens))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

// Get patient with specific mrn
fitbitTokenRouter.get("/mrn/:mrn", function(req, res) {
    return db.FitbitTokens.findOne({where: {MRN: req.params.mrn}})
    .then((tokens) => {
        if (tokens == null) {
            res.send({error: "No fitbit token exists for this patient"})
        } else {
            res.send(tokens)
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

// 404 not found
fitbitTokenRouter.get('*', function(req,res) {
    res.status(404).send('404 not found');
});

module.exports = fitbitTokenRouter;