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

let storeCountryNames = [];

app.get("/", function(req,res) {
    res.render("index");
});

app.get("/countryhelper",function(req,res) {
  res.render("country");
});

app.post("/", function(req,res) {
     let url = "https://coronavirus-19-api.herokuapp.com";
     const chosenOption = _.lowerCase(req.body.option);
     const cName = _.camelCase(req.body.cName);
     if(chosenOption === "global")
        url=url+"/all";
     if(chosenOption === "countries")
        url=url+"/countries";
     if(chosenOption === "country")
        url=url+"/countries/"+cName;
     const request = https.request(url,(response)=>{
         let data ='';
         response.on('data',(chunk)=>{
             data = data + chunk.toString();
             console.log(chunk);
         });
         response.on('end',()=>{
             const body = JSON.parse(data);
             console.log(body);
             for(var i=0;i<body.length;i++){
               storeCountryNames.push({
                 name: body[i].country,
                 noc: body[i].cases,
                 notc: body[i].todayCases,
                 nod: body[i].deaths,
                 nor: body[i].recovered,
                 noa: body[i].active,
                 nocr: body[i].critical,
                 nocpom: body[i].casesPerOneMillion,
                 nodpom: body[i].deathsPerOneMillion,
                 nott: body[i].totalTests,
                 notpom: body[i].testsPerOneMillion
              });
            }
             if(chosenOption === "global"){
                res.render("global", {
                  noc: body.cases,
                  nod: body.deaths,
                  nor: body.recoveries
                });
              }
              if(chosenOption === "countries")
                res.render("allcountries", {countryDetails: storeCountryNames });
              if(chosenOption === "country"){
                var temp;
                for(var i=0;i<storeCountryNames.length;i++)
                {
                  const storedCName = _.camelCase(storeCountryNames[i].country);
                  console.log(storedCName);
                  if(storedCName === cName) {
                      temp = storeCountryNames[i];
                      break;
                  }
                }
                console.log(JSON.parse(data));
                res.render("countryhelper", {countryDetails: temp });
              }
         });
     });
     request.on('error', (error)=>{
         console.log('An error',error);
     });
     request.end();
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000.");
});

// const http = require('http')
// const url = 'http://api.weatherstack.com/current?access_key=d5e29e33611cdfde58e9992628cebe15&query=37.8267,-122.4233&units=f'
//
// const request = http.request(url,(response)=>{
//     let data =''
//
//     response.on('data',(chunk)=>{
//         data = data + chunk.toString()
//         console.log(chunk)
//     })
//
//     response.on('end',()=>{
//         const body = JSON.parse(data)
//         console.log(body)
//     })
// })
//
// request.on('error', (error)=>{
//     console.log('An error',error)
// })
//
// request.end()
// you can access the final js object where you see the variable body
// data comes in chunk, so you have to add it manually
// axios and node-fetch will do this automatically
// fetch(url)
//   .then(resp => resp.json())
//   .then(data => console.log(data))
//   .catch(e => console.log(e))
// https://corona-tracker.juggernaut9.now.sh/
// https://github.com/Juggernaut9/corona-tracker
