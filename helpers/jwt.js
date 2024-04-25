const expressJwt = require('express-jwt')


function authJwt(req,res,next){
    const secret  = process.env.secret
    expressJwt({
        secret,
        algorithms : ['HS256'],
        //isRevoked : isRevoked,
        getToken : getTokenFromCookie
    }).unless({
        path : ['/users/login','/users/registro']
    })(req,res,next)
}

function getTokenFromCookie(req) {
    const token = req.cookies.token; // Obtener el token de la cookie
    if (token) {
        return token;
    }
    return null;
}


//function isRevoked(req,payload,done){
//    if(!payload.isAdmin){
//        done(null,true)
//    }
//    done()
//}

module.exports = authJwt

