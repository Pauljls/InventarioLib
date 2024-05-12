const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre : {type : String, required : true},
    apellidoP :  {type : String, required : true},
    apellidoM :  {type : String, required : true},
    correo : {type : String, required : true},
    contraseña : {type : String, required : true},
    telefono : {type : String, required : true},
    fechaCreacion : {type : Date, default: Date.now},
    isAdmin : {type : Boolean, required : true}
})


module.exports = mongoose.model('User', userSchema)