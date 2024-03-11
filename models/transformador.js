const mongoose = require('mongoose')

const transformadorSchema = mongoose.Schema({
    tipo : {type :String, require :  true},
    nombre : {type :String, require :  true},
    serie : {type :String, require :  true},
    fechaAdquisicion : {type :Date, require :  true},
    ubicacion : {type :String, require :  true},
    estado :{type :String, require :  true},
    volEntrada : {type: String, require : true},
    potencia : {type: String, require : true},
    
})

module.exports = mongoose.model('Transformador', transformadorSchema)