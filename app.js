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
const { anuencias } = require('./anuencias.js')
const { ocorrencias } = require('./ocorrencias.js')
const { navios } = require('./navios.js')

// A consulta de APIs da PSP foi realizada através da planilha disponibilizada por eles mesmos; PSP = Porto sem Papel


for (let horario of horarios) {
    for (let anuencia of anuencias) {
        if (anuencia.duv == horario.duv) {
            horario.dtHrChegada = addHours(anuencia.hrDiferenca, horario.dtHrChegada)

            if (horario.dtHrChegada != horario.dtHrChegadaDuv) {
                horario.status = "ATRASADO"
            }
        }
    }
}

function addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
}


app.get('/', function (req, res) {
    res.send({
        response: "OK"
    });
});

// HORARIOS

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

// OCORRENCIAS

app.get('/ocorrencias', function (req, res) {
    res.send({
        response: ocorrencias
    });
});

app.post('/ocorrencias', function (req, res) {
    console.log('receiving data ...');
    console.log('body is ', req.body);
    //res.send(req.body);

    //req.body.id

});

// NAVIOS 

app.get('/navios', function (req, res) {

    for (let horario of horarios) {
        for (let navio of navios) {
            if (horario.duv == navio.duv) {
                navio.status = horario.status;
                navio.name = horario.navio;
            }
        }
    }

    res.send({
        response: navios
    });
});





const hostname = '127.0.0.1';

var PORT = process.env.PORT || 9080;

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})