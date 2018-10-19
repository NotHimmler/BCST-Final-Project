var express = require('express');
var fitbitRouter = express.Router();
const db = require('../../Database/models/index.js');
db.FitbitTokens.sync();
db.FitbitData.sync();
fitbitRouter.get('/', function(req,res) {
    res.send("Hello World! This is fitbit router!");
});

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