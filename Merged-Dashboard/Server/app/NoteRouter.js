var express = require('express');
var request = require('request-promise-native');
var moment = require('moment');
var noteRouter = express.Router();
const db = require('../../Database/models/index.js');

noteRouter.post("/addNote/mrn/:mrn", (req, res) => {
    console.log(req.params.mrn);
    let body = req.body;
    db.Notes.findOrCreate({where: body})
    .then(data => {
        if(data[1]) {
            res.send({"okay": "Noted added"});
        } else {
            res.send({"error": "Not already exists"})
        }
    }).catch(err => {
        console.log(err);
        res.send({"error": err})
    })
})

noteRouter.get("/getNotes/user/:user", (req, res) => {
    console.log(req.params.user);
    db.Notes.findAll({where: {user: req.params.user}})
    .then(data => {
        console.log(data);
        if(data.length > 0) {
            res.send({"okay": "Noted added", data: data});
        } else {
            res.send({"error": "Not already exists"})
        }
    }).catch(err => {
        console.log(err);
        res.send({"error": err})
    })
})

module.exports = noteRouter;