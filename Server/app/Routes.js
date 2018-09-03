var path = require('path');
var request = require('request');

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

//Catchall route - allows usage of react router
//Might be better to set each route individually
//So that we can have 404 pages for non-existent pages
app.get("*", (req, res, err) => {
    res.sendFile(path.join(__dirname, "../../dist/Client/index.html"));
})
}