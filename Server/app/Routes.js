var path = require('path');
var request = require('request');

let code = "";
let token = "";
let refreshToken = "";

module.exports = function(app) {
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
            url : "https://api.fitbit.com/oauth2/token?clientId=22CYWW&grant_type=authorization_code&redirect_uri=http://localhost:8080/physio-dashboard&code="+code,
            headers: {
                'Authorization': 'Basic MjJDWVdXOjM5YzVkMmQwYWU2NDAwMjQ5MjgyOGIyYzczMDgyZmYy',
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

app.get("*", (req, res, err) => {
    res.sendFile(path.join(__dirname, "../../dist/Client/index.html"));
})
}