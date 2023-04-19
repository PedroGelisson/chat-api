function listarSalas(){
    return[
        
            {
                "_id": {
                  "$oid": "643f23ae05d9d250c7229522"
                },
                "nome": "Guerreiros da Info",
                "tipo": "publica"
              },
              {
                "_id": {
                  "$oid": "643f23d205d9d250c7229524"
                },
                "nome": "So os confirmado",
                "tipo": "privada",
                "chave": 123456
              }
        
    ];
}
module.exports={listarSalas};