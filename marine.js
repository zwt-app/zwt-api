
const reader = require('xlsx')

const file = reader.readFile('./files/MarineTraffic_ExpectedArrivalExport_2022-07-31.xlsx')

let naviosMarine = [];

const temp = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[0]])
temp.forEach((res) => {
    var navio = {
        dtPrevisaoHrChegada: new Date(res["Reported Eta"]),
        navio: res["Vessel Name"],
    }

    naviosMarine.push(navio);

});


module.exports = { naviosMarine };