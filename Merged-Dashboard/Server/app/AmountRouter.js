var express = require('express');
var amountRouter = express.Router();
const db = require('../../Database/models/index.js');
db.AmountData.sync();

const Sequelize = require('sequelize');
const {gt, lte, ne, like, in: opIn} = Sequelize.Op;

// Get all fb data
amountRouter.get('/', function(req,res) {
    return db.AmountData.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

// Get fb data for patient with specific mrn
amountRouter.get("/mrn/:mrn", function(req, res) {
    //console.log(req.params.mrn)
    return db.AmountData.findAll({
        where: {
            MRN: req.params.mrn,
        },
        order: [['date', 'DESC']],
    })
    .then((data) => {
        if (data == null) {
            res.send({error: "No data for this mrn"})
        } else {
            res.send(data)
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

 amountRouter.post("/addLog/mrn/:mrn", function(req, res) {
    let body = req.body;
    body["MRN"] = req.params.mrn;
    return db.AmountData.findOrCreate({where: body})
    .then((data) => {
        console.log(data[1])
        if (!data[1]) {
            res.send({error: "Log already exists"})
        } else {
            res.send({okay: "Entry created"})
        }
    })
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });
 

// 404 not found
amountRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = amountRouter;