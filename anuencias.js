
const reader = require('xlsx')

const file = reader.readFile('./files/Anexo_5532893_Porto_sem_papel_amostragem.xlsx')

let data = []

const sheets = file.SheetNames
let anuencias = [];

for (let i = 0; i < sheets.length; i++) {


    if (sheets[i] == "tb_anuencias") {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            var anuencia = {
                duv: res.anue_duv_nr,
                dtRegistro: new Date(res.anue_dt_registro),
                dtAtualizacao: new Date(res.anue_dt_atualizacao),
                hrDiferenca: (new Date(res.anue_dt_atualizacao) - new Date(res.anue_dt_registro)) / 3600 / 1000
            }

            anuencias.push(anuencia);

        })
    }
}


module.exports = { anuencias };