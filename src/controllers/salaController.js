const salaModel = require('../models/salaModel');

exports.get=async()=>{
    let salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
}