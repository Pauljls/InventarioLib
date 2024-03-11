const mongoose = require('mongoose')

const impresoraSchema = mongoose.Schema({
    tipo : {type :String, require :  true},
    nombre : {type :String, require :  true},
    serie : {type :String, require :  true},
    fechaAdquisicion : {type :Date, require :  true},
    ubicacion : {type :String, require :  true},
    estado :{type :String, require :  true},
    marca : {type: String, require : true},
    tipoDeImpresion : {type: String, require : true},
    colorFisico : {type: String, require : true},
})

module.exports = mongoose.model('Impresora',impresoraSchema)