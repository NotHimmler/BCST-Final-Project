var express = require('express');
var amountRouter = express.Router();
const db = require('../../Database/models/index.js');
//db.AmountData.sync();

const Sequelize = require('sequelize');
const {gt, lte, ne, like, in: opIn} = Sequelize.Op;

const amountData = require('../../data/amount-data.json');

const correctCols = amountData.map(item => {
  return ({
    sets: Number(item["Sets"]),
    sets_L: Number(item['SetsLeft']),
    sets_R: Number(item['SetsRight']),
    dur_L: String(item['DurationLeft']),
    dur_R: String(item['DurationRight']),
    dur: String(item['Duration']),
    reps: Number(item['Repetitions']),
    reps_L: Number(item['RepetitionsLeft']),
    reps_R: Number(item['RepetitionsRight']),
    date: String(item['Date']),
    program: String(item['PatientExerciseDatesExercisesPrograms::Name'].replace('AMOUNT program: ', '')),
    exercise: String(item['PatientExerciseDatesExercises::Exercise title']),
    is_completed: Boolean(item['ExerciseCompleted_c']),
    MRN: String(item['MRN'])
  })
})

/* db.AmountData.findOrCreate({where: correctCols[0]})
.then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
}) */

// Get all fb data
amountRouter.get('/', function(req,res) {
    return db.AmountData.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

amountRouter.get("/programs", (req, res) => {
    db.AmountData.findAll().then(entries => {
        let programs = entries.map(item => item['program']) 
        let unique = Array.from(new Set(programs));
        res.send({okay: "List retrieved", programs: unique});
    }).catch(err => {
        console.log(err);
        res.send({error: "Database error"});
    })
})

amountRouter.get("/programs/exercises/:program", (req, res) => {
    let program = req.params.program;
    console.log(program);
    db.AmountData.findAll({where: {program: program}})
    .then(data => {
        let exercises = data.map(item => item['exercise']);
        let unique = Array.from(new Set(exercises));
        res.send({okay: "List retrieved", exercises: unique});
    }).then(err => {
        console.log(err);
        res.send({"error": "Database error"})
    })
})

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