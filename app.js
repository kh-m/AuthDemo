var express = require("express");

var app = express();
app.set('view engine', 'ejs');

app.get("/", function( req, res) {
    res.render("HOME");
})

app.listen(8000);
