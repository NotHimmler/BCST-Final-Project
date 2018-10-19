var express = require('express');
var watbRouter = express.Router();
const db = require('../../Database/models/index.js'); // new require for db object  
db.WatbData.sync().then(data => {
    console.log("table created")
})
watbRouter.get("/mrn/:mrn", function(req, res) {
    return db.WatbData.findAll({where: {MRN: req.params.mrn}})
    .then((data) => res.send(data))
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

 watbRouter.post("/addData", function(req, res) {
     let mrn = req.body.mrn;
     let walks = req.body.walks;
     let promises = [];
     for(let index in walks) {
         let walk = walks[index];
         promises.push( new Promise((resolve, reject) => {
            db.WatbData.findOrCreate({where: {MRN: mrn, dateMillis: Math.round(walk.date)},
                defaults: {numSteps: walk.numSteps,
                          distance: walk.distance,
                          duration: walk.duration,
                          goalType: walk.goalType,
                          goalValue: walk.goalValue
              }                                      
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
        })
        )
     }
     Promise.all(promises).then(data => {
        res.status(200);
        res.send({okay: "Data uploaded"})
     }).catch(err => {
        console.log(err);
        res.status(400);
        res.send({error: "Error inserting walk data into DB"})
    })
 })

module.exports = watbRouter;