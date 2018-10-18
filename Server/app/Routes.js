var path = require('path');
var request = require('request');

var dbHandler = require('../db-handler/db-handler');
var dbHandler = new dbHandler();

const data = process.argv[2] == "dev" ? require('./TestConfig') : require('./BuildConfig');

let code = "";
let token = "";
let refreshToken = "";

module.exports = function(app) {
app.get("/getAuthUrl", (req, res, err) => {
    let url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id="+data.client_id+"&redirect_uri="+data.redirect_uri+"&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
    let toSend = {"url": url};
    res.json(toSend);
})

app.get("/getSteps", (req, res, err) => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + token
        },
        url: "https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json"
    }
    request(options, (err, response, body) => {
        if(!err) {
            bodyJson = JSON.parse(body);
            res.json({steps: bodyJson["activities-steps"][0].value});
        }
    })
    
})

app.get("/physio-dashboard", (req, res, err) => {
    if(req.query.code) {
        code = req.query.code;
        let options = {
            method: 'POST',
            url : "https://api.fitbit.com/oauth2/token?clientId="+ data.client_id +"&grant_type=authorization_code&redirect_uri="+data.redirect_uri+"&code="+code,
            headers: {
                'Authorization': 'Basic ' + data.auth_basic,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        request(options, function(err, response, body) {
            if(err) {
                console.log("Error");
            } else {
                resJson = JSON.parse(body);
                token = resJson.access_token;
                refreshToken = resJson.refresh_token;
                res.redirect("/fitbitData");
            }
        });
    } 
    
});

app.get('/api/v1/patient/lastCheckout', function (req, res) {
    let query = req.query;
    let patientId = query.patientId;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.lastCheckoutHandler(patientId).then((lastCheckoutRes) => {
        res.send(lastCheckoutRes);
    });
});


// FITBIT DATA QUERY
app.get('/api/v1/patient/fitbit', function (req, res) {
    let query = req.query;
    let patientId = query.patientId;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.fitbitHandler(patientId).then((fitbitRes) => {
        res.send(fitbitRes);
    });
});

app.post('/api/v1/login', function (req, res) {
    let body = req.body;
    let userInfo = body.userInfo;
    if (!dbHandler.ready) {
        res.json({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.loginHandler(userInfo).then((userInfoRes) => {
        res.send({token: userInfoRes[0].token});
    }).catch(err => {
        res.send({error: "Login failed"})
    });
});

app.post('/api/v1/walkData', function (req, res) {
    let body = req.body;
    console.log(body);
    if (!dbHandler.ready) {
        res.json({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.walkDataHandler(body).then((dbResponse) => {
        console.log("Inserted data")
        res.end(200);
    }).catch(err => {
        console.log(err)
        res.send(err)
    });
});

app.post('/api/v1/register', function (req, res) {
    let body = req.body;
    let userInfo = body.userInfo;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.registerHandler(userInfo).then((userInfoRes) => {
        res.send(userInfoRes);
    });
});

app.get("*", (req, res, err) => {
    res.sendFile(path.join(__dirname, "../../dist/Client/index.html"));
})

app.get('/api/v1/therapist/patientList', function (req, res) {
    let query = req.query;
    let therapistId = query.therapistId;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.patientListHandler(therapistId).then((patientListRes) => {
        res.send(patientListRes);
    });
});

app.post('/api/v1/addPatient', function(req, res) {
    let body = req.body;
    if(!dbHandler.ready) {
        res.send({error: "DB is not ready"});
        return;
    }
    dbHandler.addPatientHandler(body.patientInfo).then(() => {
        res.status(200);
        res.end();
    }).catch(err => {
        res.status(500);
        res.send(err);
    });
})

app.post("/api/v1/getWalkData", function(req, res) {
    let body = req.body;
    dbHandler.getWalkDataHandler(body.mrn).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400);
        res.json({error: "Could not get walk data"});
    });
})

}

