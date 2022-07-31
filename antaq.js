
const reader = require('xlsx')

const file = reader.readFile('./files/sig-ANTAQ.xlsx')

let naviosANTAQ = [];

const temp = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]])
temp.forEach((res) => {
    var navio = {
        navio: res["NomedaEmbarcaçãoAfretada"],
        status: res["Status"],
    }

    naviosANTAQ.push(navio);
});

const { horarios } = require('./horarios.js')

for (let horario of horarios) {
    for (let navio of naviosANTAQ) {
        if (navio.status === "Afretamento Cancelado") {
            if (horario.navio == navio.navio) {
                if (horario.cancelamentos == undefined)
                    horario.cancelamentos = 0;

                horario.cancelamentos += 1;
            }
        }
    }
}


module.exports = { naviosANTAQ };