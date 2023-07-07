 var express = require("express");
 var app = express();
 const salaController = require('./controllers/salaController');
 const token = require('./util/token');
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
 
 app.use("/entrar",router.post("/entrar",async(req,res,next)=>{
  const usuarioController  = require("./controllers/usuarioController");
  let resp= await usuarioController.entrar(req.body.nick);
  res.status(200).send(resp)
 }));
 
app.use('/salas', router.get('/salas', async (req, res, next) => {
    if (await
        token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    ) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" })
    }

}));

app.use('/sala/entrar', router.put('/sala/entrar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    console.log(req.headers);
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);

}));

app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    const { nome, tipo } = req.body;
    let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
    res.status(200).send(resp);
}));

app.use('/sala/mensagem/', router.post('/sala/mensagem', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}));

app.use('/sala/mensagens/', router.get('/sala/mensagens', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.buscarMensagens(req.query.idsala, req.query.timestamp);
    res.status(200).send(resp);
}));

app.use('/sala/sair', router.put('/sala/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    console.log(req.headers);
    let resp = await salaController.sairSala(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));

app.use('/sair', router.put('/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
      return false;
      
    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.sairChat(req.headers.iduser);
    
    res.status(200).send(resp);
  }));


 module.exports=app;