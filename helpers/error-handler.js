function errorHandler(err,req,res,next){
    if(err.code == 'credentials_required'){
        res.status(500).json({
            message : "Se requiere el token de autenticacion"
        })
    }
    if(err.code == 'invalid_token'){
        res.status(500).json({
            message : "Se envio un token invalido"
        })
    }

}

module.exports= errorHandler
