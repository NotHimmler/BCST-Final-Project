var express = require('express');
var app = express();
var path = require('path');

app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/main.js", express.static("dist/main.js"));

app.get("", (req, res, err) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
})

app.listen(process.env.PORT || 8080, function() {
    console.log("Server listening on port 8080.");
})