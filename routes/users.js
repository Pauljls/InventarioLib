const express = require('express')
const User  = require('../models/user')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const userList = await User.find()
    if(!userList){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun usuario'
        })
    }
    res.status(200).send(userList)
})

router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun usuario'
        })
    }
    res.status(200).send(user)
})

router.post('/',async(req,res)=>{
    let user = new User({
        nombre : req.body.nombre,
        apellidoP : req.body.apellidoP,
        apellidoM : req.body.apellidoM,
        correo : req.body.correo,
        contraseña: req.body.contraseña,
        telefono : req.body.telefono,
        isAdmin :req.body.isAdmin, 
    })
    
    user = await user.save()

    if(!user){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    res.status(200).send(user)
})

module.exports = router