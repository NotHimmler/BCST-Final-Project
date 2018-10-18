var express = require('express');
var watbRouter = express.Router();
const db = require('../../Database/models'); // new require for db object  

watbRouter.get("/mrn/", function(req, res) {
    return db.WatbData.findById(req.params.mrn)
    .then((data) => res.send(data))
    .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
 });

 watbRouter.post("/addData", function(req, res) {
     let body = req.body
     return db.WatbData.findOrCreate({where: {MRN: body.mrn, dateMillis: body.date},
                                      defaults: {numSteps: body.numSteps,
                                                distance: body.distance,
                                                duration: body.duration,
                                                goalType: body.goalType,
                                                goalValue: body.goalValue
                                    }                                      
    }).then(data => {
        res.status(200);
        res.send({okay: "Data uploaded"})
    }).catch(err => {
        console.log(err);
        res.status(400);
        res.send({error: "Error inserting walk data into DB"})
    })
 })

module.exports = watbRouter;