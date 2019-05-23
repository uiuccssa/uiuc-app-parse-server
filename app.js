require("dotenv").config();

var express = require('express');

var ParseDashboard = require('parse-dashboard');
var ParseServer = require('parse-server').ParseServer;

var options = {allowInsecureHTTP: true};

var app = express();
var parseServer = new ParseServer({
    databaseURI: process.env.databaseURI,
    cloud: __dirname+'/cloud/main.js',
    appId: process.env.appId,
    masterKey: process.env.masterKey,
});


var parseDashboard = new ParseDashboard({
    "apps": [{
        "serverURL": process.env.serverURL,
        "appId": process.env.appId,
        "masterKey": process.env.masterKey,
        "production": false,
        "appName": "UIUC-CSSA-APP",
    }],
    "trustProxy": 1,
    "users": [
        {
            "user": process.env.user,
            "pass": process.env.pass,
        }
    ]
}, options);

app.use('/parse', parseServer);
app.use('/dashboard', parseDashboard);

module.exports = app;
