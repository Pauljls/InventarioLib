const mongoose = require('mongoose')

const monitorSchema = mongoose.Schema({
    nombre : {type :String, require :  true},
    serie : {type :String, require :  true},
    fechaAdquisicion : {type :Date, require :  true},
    ubicacion : {type :String, require :  true},
    estado :{type :String, require :  true},
    tamañoPantalla : {type: String, require : true},
    resolucion : {type: String, require : true},
    marca : {type: String, require : true}
})

module.exports = mongoose.model('Monitor',monitorSchema)