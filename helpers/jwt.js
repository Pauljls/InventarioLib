const expressJwt = require('express-jwt')

function authJwt(req,res,next){
    const secret  = process.env.secret
    expressJwt({
        secret,
        algorithms : ['HS256'],
         
    })(req,res,next)

}

module.exports = authJwt

