//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/", function(req,res) {
    res.render("index");
});

app.post("/records", function(req,res) {
     let url = "https://coronavirus-19-api.herokuapp.com";
     console.log(url);
     const chosenOption = _.lowerCase(req.body.option);
     const cName = _.camelCase(req.body.cName);
     console.log(chosenOption);
     console.log(cName);
     if(req.body.option === "global")
        url=url+"/all";
     if(req.body.option === "countries")
        url=url+"/countries";
     if(req.body.option === "country")
        url=url+"/countries/"+cName;
     console.log(url);
     https.request(url, function(response) {
       response.on("data", function(data) {
         const covidData = JSON.parse(data);
         console.log(covidData);
       });
     });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000.");
});
