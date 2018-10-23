var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//Routes
var fitbit = require('./app/FitbitRouter');
var patient = require('./app/PatientRouter');
let watb = require('./app/WatbRouter');
let user = require('./app/UserRouter');
let amount = require('./app/AmountRouter');
let notes = require('./app/NoteRouter');
let fitbittokens = require('./app/FitbitTokenRouter');
let goal = require('./app/GoalRouter');

app.use(bodyParser.json({ type: 'application/json' }));

//Front end stuff
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/data", express.static("data"));
app.use("/vendors", express.static("vendors"));
app.use("/javascript", express.static("javascript"));
app.use("/main.js", express.static("dist/main.js"));
app.use("/login.html", express.static("Client/login.html"));

//Route stuff
app.use('/api/fitbit', fitbit);
app.use('/api/patient', patient);
app.use('/api/watb', watb);
app.use('/api/user', user);
app.use('/api/amount', amount);
app.use('/api/notes', notes);
app.use('/api/tokens', fitbittokens);
app.use('/api/goal', goal);
require('./app/Routes.js')(app);

let port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Server listening on port " + port);
});