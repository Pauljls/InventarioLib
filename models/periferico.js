const mongoose = require('mongoose')

const perifericoSchema = mongoose.Schema({
    nombre : {type :String, require :  true},
    serie : {type :String, require :  true},
    fechaAdquisicion : {type :Date, require :  true},
    ubicacion : {type :String, require :  true},
    estado :{type :String, require :  true},
    marca : {type: String, require : true},
    entrada : {type: String, require : true},
    rgb : {type: Boolean, require : true}
})

module.exports = mongoose.model('Periferico', perifericoSchema)