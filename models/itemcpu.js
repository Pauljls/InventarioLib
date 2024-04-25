const mongoose = require('mongoose')

const itemcpuSchema = mongoose.Schema({
    nombre : {type :String, require :  true},
    serie : {type :String, require :  true},
    fechaAdquisicion : {type :Date, require :  true},
    ubicacion : {type :String, require :  true},
    estado :{type :String, require :  true},
    procesador : {type: String, require : true},
    ram : {type: String, require : true},
    so : {type: String, default: 'Windows 10'},
    image : {type: String, default:''}
})

module.exports = mongoose.model('Cpu',itemcpuSchema)