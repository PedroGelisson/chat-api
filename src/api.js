 var express = require("express");
 var app = express();
 app.use(express.urlencoded({extended : true}));
 app.use(express.json());

 const router = express.Router();

 app.use('/sobre',router.get('/sobre',(req,res,next)=>{
    res.status(200).send({
    "nome":"API - CHAT",
    "versão": "0.1.0",
    "autor":"Pedro Silva"
    })
 }));

 app.use("/salas",router.get("/salas",(req,res,next)=>{
   const salaController = require("./controllers/salaController");
   res.status(200).send(res);
 }));
 
 module.exports=app;