const http = require('http');
const https = require('https');
const request = require('request');

var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


const { horarios } = require('./horarios.js')

// A consulta de APIs da PSP foi realizada através da planilha disponibilizada por eles mesmos; PSP = Porto sem Papel
const { anuencias } = require('./anuencias.js')

for (let horario of horarios) {
    for (let anuencia of anuencias) {
        if (anuencia.duv == horario.duv) {
            horario.dtHrChegada = addHours(anuencia.hrDiferenca, horario.dtHrChegada)
        }
    }
}

console.log(horarios);
console.log(anuencias);

function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
}


app.get('/', function (req, res) {
    res.send({
        response: "OK"
    });
});


app.get('/horarios', function (req, res) {
    res.send({
        response: horarios
    });
});

app.get('/horarios/:duv', function (req, res) {
    var duv = req.params.duv;

    for (let horario of horarios) {
        if (horario.duv == duv) {
            res.send({
                response: horario
            });
            return false;
        }
    }

    res.send({
        response: undefined
    });
});

const hostname = '127.0.0.1';


// http.createServer(app, function (req, res) {
//     console.log(`Server running at http://${hostname}:9080/`);
// }).listen(process.env.PORT || 9080);

// https.createServer(app, function (req, res) {
//     console.log(`Server running at http://${hostname}:9443/`);
// }).listen(9443);

var PORT = 9080;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})