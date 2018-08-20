var express = require('express');
var app = express();

app.use(express.static("Client"));

app.get("/", (req, res, err) => {
    res.send("dist/index.html");
})

app.listen(process.env.PORT, function() {
    console.log("Server listening on port 8080.");
})