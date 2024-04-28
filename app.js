const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const dashboard = require('./routes/dashboard')
const usersRoutes = require('./routes/users')
const cpuRoutes = require('./routes/cpus')
const monitorRoutes =require('./routes/monitores')
const impresoraRoutes =require('./routes/impresoras')
const perifericoRoutes = require('./routes/perifericos')
const trannsformadorRoutes = require('./routes/transformadores')
const authJwt = require('./helpers/jwt')
const errorHandler =  require('./helpers/error-handler')
require('dotenv/config')


//MIDLEWARES
app.use('*',cors())
app.use(bodyparser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
app.use(authJwt)
app.use(errorHandler)

//MOTOR DE PLANTILLAS
app.set('view engine','ejs')
app.set('views', __dirname + "/views")



//RUTAS
app.use('/dashboard',dashboard)
app.use('/users',usersRoutes)
app.use('/equiposInformaticos/cpus', cpuRoutes)
app.use('/equiposInformaticos/monitores', monitorRoutes)
app.use('/equiposInformaticos/impresoras', impresoraRoutes)
app.use('/equiposInformaticos/perifericos', perifericoRoutes)
app.use('/equiposInformaticos/transformadores', trannsformadorRoutes)
app.use('*',(req,res)=>{
    res.status(404).json({
        message: "Pagina no encontrada"
    })
})

mongoose.connect(process.env.DB_KEY)
.then(()=>{
    console.log('La base de datos se conecto exitosamente')
})
.catch(err => console.log(err))
app.listen(3000, ()=>{
    console.log('El servidor esta funcionando en http://localhost:3000/users/login')
})
