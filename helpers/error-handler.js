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


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVmNmU2NzVhNDQzNzZmZjM0OThlNDAiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzEwMjEyODMxLCJleHAiOjE3MTAyOTkyMzF9.tO9OGaBpfPQMJ8sAmXae9Ay-zg_mQ_t3jVgFfwAUeGE
