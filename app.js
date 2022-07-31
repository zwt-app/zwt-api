const bodyParser = require('body-parser')

var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
const { naviosMarine } = require('./marine.js')
const { naviosANTAQ } = require('./antaq.js')

// A consulta de APIs da PSP foi realizada através da planilha disponibilizada por eles mesmos; PSP = Porto sem Papel

for (let horario of horarios) {
    for (let anuencia of anuencias) {
        if (anuencia.duv == horario.duv) {
            //horario.agenteMaritimo = anuencia.agenteMaritimo;

            horario.dtHrChegada = addHours(anuencia.hrDiferenca, horario.dtHrChegada)

            if (horario.tempoAdicional == undefined)
                horario.tempoAdicional = 0;

            if (anuencia.hrDiferenca != undefined) {
                horario.tempoAdicional += anuencia.hrDiferenca;
            }

            if (horario.dtHrChegada != horario.dtHrChegadaDuv) {
                horario.status = "ATRASADO"
            }
        }
    }
}

for (let horario of horarios) {
    for (let navio of naviosMarine) {
        if (navio.navio == horario.navio) {
            horario.dtHrChegadaMarine = navio.dtPrevisaoHrChegada;

            if (horario.dtHrChegadaMarine > horario.dtHrChegada && horario.status != "CONCLUÍDO") {
                horario.dtHrChegada = horario.dtHrChegadaMarine;
                horario.status = "ATRASADO - BY MARINE TRAFFIC"
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
    const crescente = horarios.sort(function (a, b) {
        if (a.dtHrChegada !== undefined && b.dtHrChegada !== undefined) {
            return new Date(a.dtHrChegada) - new Date(b.dtHrChegada);
        } else {
            return 8640000000000000;
        }
    });

    res.send({
        response: crescente
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

    var dtHrModificada = undefined;

    if (req.body.idOcorrencia != undefined && req.body.idDuv) {

        for (let ocorrencia of ocorrencias) {
            for (let horario of horarios) {
                if (req.body.idOcorrencia == ocorrencia.id && req.body.idDuv == horario.duv) {
                    horario.dtHrChegada = addHours(ocorrencia.hrIncrementa, horario.dtHrChegada)

                    if (horario.tempoAdicional == undefined)
                        horario.tempoAdicional = 0;

                    horario.tempoAdicional += ocorrencia.hrIncrementa;

                    if (horario.dtHrChegada != horario.dtHrChegadaDuv) {
                        horario.status = "ATRASADO"
                    }

                    dtHrModificada = horario.dtHrChegada

                    for (let horarioNavio of horarios) {
                        if (horarioNavio.dtHrChegada < horario.dtHrChegada && horarioNavio.berco === horario.berco && horario.status != "CONCLUÍDO") {
                            const horariosDecrescente = horarios.sort(function (a, b) {
                                return new Date(b.dtHrChegada) - new Date(a.dtHrChegada);
                            });

                            horariosDecrescenteBerco = {};

                            for (let horarioDec of horariosDecrescente) {
                                if (horarioDec.berco == horarioNavio.berco) {
                                    horariosDecrescenteBerco = horarioDec;
                                    break;
                                }
                            }

                            horario.tempoAtracacao = horariosDecrescenteBerco.tempoAtracacao
                            horario.dtHrChegada = new Date(horariosDecrescenteBerco.dtHrChegada)

                            horario.dtHrChegada = addHours(horario.tempoAtracacao, horario.dtHrChegada);
                            horario.tempoEsperaBarra = (horario.dtHrChegada - horario.dtHrChegadaDuv) / 3600 / 1000;
                            horario.status = "REALOCADO";

                            dtHrModificada = horario.dtHrChegada;

                            break;
                        }
                    }



                    break;
                }
            }
        }
    }

    if (dtHrModificada != undefined) {
        for (let horario of horarios) {
            if (horario.dtHrChegada < dtHrModificada) {
                horario.statusTime = "UP";
            } else {
                horario.statusTime = "DOWN";
            }

            if (horario.status == "CONCLUÍDO") {
                horario.statusTime = "";
            }
        }
    }

    res.send({
        response: "OK"
    });
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

app.get('/navios/:duv', function (req, res) {
    var duv = req.params.duv;

    for (let horario of horarios) {
        for (let navio of navios) {
            if (horario.duv == navio.duv) {
                navio.status = horario.status;
                navio.name = horario.navio;
            }
        }
    }

    for (let navio of navios) {
        if (navio.duv == duv) {
            res.send({
                response: navio
            });
            return false;
        }
    }

    res.send({
        response: undefined
    });
});

// API PSC STATUS

// ATRACADO PORTO  
// EM ANDAMENTO

app.post('/pcs/status', function (req, res) {
    if (req.body.status != undefined && req.body.idDuv) {
        for (let horario of horarios) {
            if (req.body.idDuv == horario.duv) {
                horario.status = req.body.status
                horario.dtHrChegada = undefined;

                res.send({
                    response: "OK"
                });
                break;
            }
        }

    }
});

var PORT = process.env.PORT || 9080;

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})