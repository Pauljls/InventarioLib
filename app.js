const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const usersRoutes = require('./routes/users')
const cpuRoutes = require('./routes/cpus')
const monitorRoutes =require('./routes/monitores')
const impresoraRoutes =require('./routes/impresoras')
const perifericoRoutes = require('./routes/perifericos')
const trannsformadorRoutes = require('./routes/transformadores')
require('dotenv/config')

//MIDLEWARES
app.use(bodyparser.json())
app.use(morgan('tiny'))

//RUTAS
app.use('/users',usersRoutes)
app.use('/equiposInformaticos/cpus', cpuRoutes)
app.use('/equiposInformaticos/monitores', monitorRoutes)
app.use('/equiposInformaticos/impresoras', impresoraRoutes)
app.use('/equiposInformaticos/perifericos', perifericoRoutes)
app.use('/equiposInformaticos/transformadores', trannsformadorRoutes)

mongoose.connect(process.env.DB_KEY)
.then(()=>{
    console.log('La base de datos se conecto exitosamente')
})
.catch(err => console.log(err))
app.listen(3000, ()=>{
    console.log('El servidor esta funcionando en http://localhost:3000')
})
