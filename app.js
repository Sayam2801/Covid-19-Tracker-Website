//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
const flags = require("country-flags-svg");
const countries = flags.countries;

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
             // console.log(chunk);
         });
         response.on('end',()=>{
             const body = JSON.parse(data);
             // console.log(body);
             for(var i=0;i<body.length;i++){
               storeCountryNames.push({
                 name: body[i].country,
                 noc: body[i].cases,
                 notc: body[i].todayCases,
                 nod: body[i].deaths,
                 notd: body[i].todayDeaths,
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
                  nor: body.recovered
                });
              }
              if(chosenOption === "countries"){
                    var countryCodes = {};
                    countryCodes["Afghanistan"] = "af";
                    countryCodes["land Islands"]= "li";
                    countryCodes["Albania"] = "al";
                    countryCodes["Algeria"] = "dz";
                    countryCodes["American Samoa"] = "as";
                    countryCodes["Andorra"] = "ad";
                    countryCodes["Angola"] = "ao";
                    countryCodes["Anguilla"] = "ai";
                    countryCodes["Antarctica"] = "aq";
                    countryCodes["Antigua and Barbuda"] = "ag";
                    countryCodes["Argentina"] = "ar";
                    countryCodes["Armenia"] = "am";
                    countryCodes["Aruba"] = "aw";
                    countryCodes["Australia"] = "au";
                    countryCodes["Austria"] = "at";
                    countryCodes["Azerbaijan"] = "az";
                    countryCodes["Bahamas"] = "bs";
                    countryCodes["Bahrain"] = "bh";
                    countryCodes["Bangladesh"] = "bd";
                    countryCodes["Barbados"] = "bb";
                    countryCodes["Belarus"] = "by";
                    countryCodes["Belgium"] = "be";
                    countryCodes["Belize"] = "bz";
                    countryCodes["Benin"] = "bj";
                    countryCodes["Bermuda"] = "bm";
                    countryCodes["Bhutan"] = "bt";
                    countryCodes["Bolivia"] = "bo";
                    countryCodes["Bosnia and Herzegovina"] = "ba";
                    countryCodes["Botswana"] = "bw";
                    countryCodes["Bouvet Island"] = "bv";
                    countryCodes["Brazil"] = "br";
                    countryCodes["British Indian Ocean Territory"] = "io";
                    countryCodes["Brunei"] = "bn";
                    countryCodes["Bulgaria"] = "bg";
                    countryCodes["Burkina Faso"] = "bf";
                    countryCodes["Burundi"] = "bi";
                    countryCodes["Cambodia"] = "kh";
                    countryCodes["Cameroon"] = "cm";
                    countryCodes["Canada"] = "ca";
                    countryCodes["Cabo Verde"] = "cv";
                    countryCodes["Cayman Islands"] = "ky";
                    countryCodes["CAR"] = "cf";
                    countryCodes["Chad"] = "td";
                    countryCodes["Chile"] = "cl";
                    countryCodes["China"] = "cn";
                    countryCodes["Christmas Island"] = "cx";
                    countryCodes["Cocos (Keeling) Islands"] = "cc";
                    countryCodes["Colombia"] = "co";
                    countryCodes["Comoros"] = "km";
                    countryCodes["Congo"] = "cg";
                    countryCodes["DRC"] = "cd";
                    countryCodes["Cook Islands"] = "ck";
                    countryCodes["Costa Rica"] = "cr";
                    countryCodes["Ivory Coast"] = "ci";
                    countryCodes["Croatia"] = "hr";
                    countryCodes["Cuba"] = "cu";
                    countryCodes["Cyprus"] = "cy";
                    countryCodes["Czechia"] = "cz";
                    countryCodes["Denmark"] = "dk";
                    countryCodes["Djibouti"] = "dj";
                    countryCodes["Dominica"] = "dm";
                    countryCodes["Dominican Republic"] = "do";
                    countryCodes["Ecuador"] = "ec";
                    countryCodes["Egypt"] = "eg";
                    countryCodes["El Salvador"] = "sv";
                    countryCodes["Equatorial Guinea"] = "gq";
                    countryCodes["Eritrea"] = "er";
                    countryCodes["Estonia"] = "ee";
                    countryCodes["Ethiopia"] = "et";
                    countryCodes["Falkland Islands"] = "fk";
                    countryCodes["Faeroe Islands"] = "fo";
                    countryCodes["Fiji"] = "fj";
                    countryCodes["St. Barth"] = "bl";
                    countryCodes["Finland"] = "fi";
                    countryCodes["France"] = "fr";
                    countryCodes["French Guiana"] = "gf";
                    countryCodes["French Polynesia"] = "pf";
                    countryCodes["French Southern Territories"] = "tf";
                    countryCodes["Gabon"] = "ga";
                    countryCodes["Gambia"] = "gm";
                    countryCodes["Georgia"] = "ge";
                    countryCodes["Germany"] = "de";
                    countryCodes["Ghana"] = "gh";
                    countryCodes["Gibraltar"] = "gi";
                    countryCodes["Greece"] = "gr";
                    countryCodes["Greenland"] = "gl";
                    countryCodes["Grenada"] = "gd";
                    countryCodes["Guadeloupe"] = "gp";
                    countryCodes["Guam"] = "gu";
                    countryCodes["Guatemala"] = "gt";
                    countryCodes["Guernsey"] = "gg";
                    countryCodes["Guinea"] = "gn";
                    countryCodes["Guinea-Bissau"] = "gw";
                    countryCodes["Guyana"] = "gy";
                    countryCodes["Haiti"] = "ht";
                    countryCodes["Sint Maarten"] = "sx";
                    countryCodes["Vatican City"] = "va";
                    countryCodes["Honduras"] = "hn";
                    countryCodes["Hong Kong"] = "hk";
                    countryCodes["Hungary"] = "hu";
                    countryCodes["Iceland"] = "is";
                    countryCodes["India"] = "in";
                    countryCodes["Indonesia"] = "id";
                    countryCodes["Iran"] = "ir";
                    countryCodes["Iraq"] = "iq";
                    countryCodes["Ireland"] = "ie";
                    countryCodes["Isle of Man"] = "im";
                    countryCodes["Israel"] = "il";
                    countryCodes["Italy"] = "it";
                    countryCodes["Jamaica"] = "jm";
                    countryCodes["Japan"] = "jp";
                    countryCodes["Jersey"] = "je";
                    countryCodes["Jordan"] = "jo";
                    countryCodes["Kazakhstan"] = "kz";
                    countryCodes["Kenya"] = "ke";
                    countryCodes["Kiribati"] = "ki";
                    countryCodes["Diamond Princess"] = "kp";
                    countryCodes["S. Korea"] = "kr";
                    countryCodes["Kuwait"] = "kw";
                    countryCodes["Kyrgyzstan"] = "kg";
                    countryCodes["Laos"] = "la";
                    countryCodes["Latvia"] = "lv";
                    countryCodes["Lebanon"] = "lb";
                    countryCodes["Lesotho"] = "ls";
                    countryCodes["Liberia"] = "lr";
                    countryCodes["Libya"] = "ly";
                    countryCodes["Liechtenstein"] = "li";
                    countryCodes["Lithuania"] = "lt";
                    countryCodes["Luxembourg"] = "lu";
                    countryCodes["Macao"] = "mo";
                    countryCodes["North Macedonia"] = "mk";
                    countryCodes["Madagascar"] = "mg";
                    countryCodes["Malawi"] = "mw";
                    countryCodes["Malaysia"] = "my";
                    countryCodes["Maldives"] = "mv";
                    countryCodes["Mali"] = "ml";
                    countryCodes["Malta"] = "mt";
                    countryCodes["Marshall Islands"] = "mh";
                    countryCodes["Channel Islands"] = "mh";
                    countryCodes["Martinique"] = "mq";
                    countryCodes["Mauritania"] = "mr";
                    countryCodes["Mauritius"] = "mu";
                    countryCodes["Mayotte"] = "yt";
                    countryCodes["Mexico"] = "mx";
                    countryCodes["Micronesia"] = "fm";
                    countryCodes["Moldova"] = "md";
                    countryCodes["Monaco"] = "mc";
                    countryCodes["Mongolia"] = "mn";
                    countryCodes["Montenegro"] = "me";
                    countryCodes["Montserrat"] = "ms";
                    countryCodes["Morocco"] = "ma";
                    countryCodes["Mozambique"] = "mz";
                    countryCodes["Myanmar"] = "mm";
                    countryCodes["Namibia"] = "na";
                    countryCodes["Curaçao"] = "nr";
                    countryCodes["Nepal"] = "np";
                    countryCodes["Netherlands"] = "nl";
                    countryCodes["Caribbean Netherlands"] = "an";
                    countryCodes["New Caledonia"] = "nc";
                    countryCodes["New Zealand"] = "nz";
                    countryCodes["Nicaragua"] = "ni";
                    countryCodes["Niger"] = "ne";
                    countryCodes["Nigeria"] = "ng";
                    countryCodes["Niue"] = "nu";
                    countryCodes["Norfolk Island"] = "nf";
                    countryCodes["Northern Mariana Islands"] = "mp";
                    countryCodes["Norway"] = "no";
                    countryCodes["Saint Martin"] = "mf";
                    countryCodes["Oman"] = "om";
                    countryCodes["Pakistan"] = "pk";
                    countryCodes["Palau"] = "pw";
                    countryCodes["Palestine"] = "ps";
                    countryCodes["Panama"] = "pa";
                    countryCodes["Papua New Guinea"] = "pg";
                    countryCodes["Paraguay"] = "py";
                    countryCodes["Peru"] = "pe";
                    countryCodes["Philippines"] = "ph";
                    countryCodes["Pitcairn"] = "pn";
                    countryCodes["Poland"] = "pl";
                    countryCodes["Portugal"] = "pt";
                    countryCodes["Puerto Rico"] = "pr";
                    countryCodes["Qatar"] = "qa";
                    countryCodes["Réunion"] = "re";
                    countryCodes["Romania"] = "ro";
                    countryCodes["Russia"] = "ru";
                    countryCodes["Rwanda"] = "rw";
                    countryCodes["Saint Helena"] = "sh";
                    countryCodes["Saint Kitts and Nevis"] = "kn";
                    countryCodes["Saint Lucia"] = "lc";
                    countryCodes["Saint Pierre Miquelon"] = "pm";
                    countryCodes["St. Vincent Grenadines"] = "vc";
                    countryCodes["Samoa"] = "ws";
                    countryCodes["San Marino"] = "sm";
                    countryCodes["Sao Tome and Principe"] = "st";
                    countryCodes["Saudi Arabia"] = "sa";
                    countryCodes["Senegal"] = "sn";
                    countryCodes["Serbia"] = "rs";
                    countryCodes["Seychelles"] = "sc";
                    countryCodes["Sierra Leone"] = "sl";
                    countryCodes["Singapore"] = "sg";
                    countryCodes["Slovakia"] = "sk";
                    countryCodes["Slovenia"] = "si";
                    countryCodes["Solomon Islands"] = "sb";
                    countryCodes["Somalia"] = "so";
                    countryCodes["South Africa"] = "za";
                    countryCodes["South Georgia and the South Sandwich Islands"] = "gs";
                    countryCodes["Spain"] = "es";
                    countryCodes["Sri Lanka"] = "lk";
                    countryCodes["Sudan"] = "sd";
                    countryCodes["South Sudan"] = "ss";
                    countryCodes["Suriname"] = "sr";
                    countryCodes["Svalbard and Jan Mayen"] = "sj";
                    countryCodes["Eswatini"] = "sz";
                    countryCodes["Sweden"] = "se";
                    countryCodes["Switzerland"] = "ch";
                    countryCodes["Syria"] = "sy";
                    countryCodes["Taiwan"] = "tw";
                    countryCodes["Tajikistan"] = "tj";
                    countryCodes["Tanzania"] = "tz";
                    countryCodes["Thailand"] = "th";
                    countryCodes["Timor-Leste"] = "tl";
                    countryCodes["Togo"] = "tg";
                    countryCodes["Tokelau"] = "tk";
                    countryCodes["Tonga"] = "to";
                    countryCodes["Trinidad and Tobago"] = "tt";
                    countryCodes["Tunisia"] = "tn";
                    countryCodes["Turkey"] = "tr";
                    countryCodes["Turkmenistan"] = "tm";
                    countryCodes["Turks and Caicos"] = "tc";
                    countryCodes["Tuvalu"] = "tv";
                    countryCodes["Uganda"] = "ug";
                    countryCodes["Ukraine"] = "ua";
                    countryCodes["UAE"] = "ae";
                    countryCodes["UK"] = "gb";
                    countryCodes["USA"] = "us";
                    countryCodes["United States Minor Outlying Islands"] = "um";
                    countryCodes["Uruguay"] = "uy";
                    countryCodes["Uzbekistan"] = "uz";
                    countryCodes["Vanuatu"] = "vu";
                    countryCodes["Venezuela"] = "ve";
                    countryCodes["Vietnam"] = "vn";
                    countryCodes["British Virgin Islands"] = "vg";
                    countryCodes["MS Zaandam"] = "vi";
                    countryCodes["Wallis and Futuna"] = "wf";
                    countryCodes["Western Sahara"] = "eh";
                    countryCodes["Yemen"] = "ye";
                    countryCodes["Zambia"] = "zm";
                    countryCodes["Zimbabwe"] = "zw";
                res.render("allcountries", {countryDetails: storeCountryNames, cCodes: countryCodes });
              }
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

app.post("/country", function(req,res) {
     const str = req.body.cName;
     const countryName = str.toLowerCase();
     // console.log(countryName);
     let jsonData = "";
     for(var i=0;i<storeCountryNames.length;i++)
     {
       const storedCountryName = _.lowerCase(storeCountryNames[i].name);
       if(storedCountryName === countryName)
       {
         jsonData = storeCountryNames[i];
         // console.log(storedCountryName);
         break;
       }
     }
     // console.log(jsonData);
     res.render("country", {countryDetails: jsonData});
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running on port 3000.");
});
