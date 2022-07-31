const http = require('http');
const https = require('https');
const request = require('request');

var express = require('express');
var app = express();

const hostname = '127.0.0.1';

var horarios = [
    {
        mavio: "NAVIO A",
        dtHrChegadaDuv: "2022-07-31 12:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA A"
    },
    {
        mavio: "NAVIO B",
        dtHrChegadaDuv: "2022-07-31 12:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA B"
    },
    {
        mavio: "NAVIO C",
        dtHrChegadaDuv: "2022-07-31 12:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA C"
    },
    {
        mavio: "NAVIO D",
        dtHrChegadaDuv: "2022-07-31 15:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA D"
    },    {
        mavio: "NAVIO E",
        dtHrChegadaDuv: "2022-07-31 15:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA E"
    },
    {
        mavio: "NAVIO F",
        dtHrChegadaDuv: "2022-07-31 17:00:00",
        dtHrChegadaPratico: "2022-07-31 12:00:00",
        dtHrChegada: "2022-07-31 12:00:00", // FINAL
        tmpHorarioAdicionalPratico: 0,
        tamanhoNavio: undefined,
        mare: undefined,
        calado: undefined,
        tempoAdicional: 0,
        statusDesatracamento: true,
        tempoAtracacao: 3,
        dtHrMarineTraffic: undefined,
        berco: "BACIA F"
    },
];


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

http.createServer(app, function (req, res) {
    console.log(`Server running at http://${hostname}:9080/`);
}).listen(process.env.PORT || 9080);

https.createServer(app, function (req, res) {
    console.log(`Server running at http://${hostname}:9443/`);
}).listen(9443);