//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set(express.static("public"));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/records", function(req,res) {
  // if(req.body.recordType === "global")
  //     res.render("global");
  // if(req.body.recordType === "countries")
  //     res.render("countries");
  // if(req.body.recordType === "country")
  //     res.render("country");
  console.log(req.body);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000.");
});
