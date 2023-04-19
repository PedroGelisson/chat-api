exports.get=()=>{
    let salaModel = require('../models/salaModel');
    return salaModel.listarSalas();
}