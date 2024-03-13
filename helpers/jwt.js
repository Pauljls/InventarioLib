const expressJwt = require('express-jwt')

function authJwt(req,res,next){
    const secret  = process.env.secret
    expressJwt({
        secret,
        algorithms : ['HS256'],
        isRevoked : isRevoked
    }).unless({
        path : ['/users/login','/users/registro']
    })(req,res,next)
}

function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done()
}

module.exports = authJwt

