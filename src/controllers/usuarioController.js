const token = require ("../util/token");
const usuarioModel = require('../models/usuarioModel');

exports.entrar=async(nick)=>{
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedID){
        return {
            "idUser":resp.insertedID,
            "token":await token.setToken(JSON.stringify(resp.insertedID).replace(/"/g,''),nick),
            "nick":nick
        }
    }
}