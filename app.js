const express = require('express')
const app =  express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const usersRoutes = require('./routes/users')
const cpuRoutes = require('./routes/cpus')
const monitorRoutes =require('./routes/monitores')
require('dotenv/config')

//MIDLEWARES
app.use(bodyparser.json())
app.use(morgan('tiny'))

//RUTAS
app.use('/users',usersRoutes)
app.use('/inventario/cpus', cpuRoutes)
app.use('/inventario/monitores', monitorRoutes)

mongoose.connect(process.env.DB_KEY)
.then(()=>{
    console.log('La base de datos se conecto exitosamente')
})
.catch(err => console.log(err))
app.listen(3000, ()=>{
    console.log('El servidor esta funcionando en http://localhost:3000')
})
