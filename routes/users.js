const express = require('express')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const User  = require('../models/user')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const userList = await User.find()
    if(!userList){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun usuario'
        })
    }
    //res.status(200).send(userList)
    res.render('users',{userList : userList})
})
router.post('/registro',async(req,res)=>{
    let user = new User({
        nombre : req.body.nombre,
        apellidoP : req.body.apellidoP,
        apellidoM : req.body.apellidoM,
        correo : req.body.correo,
        contraseña: bcrypt.hashSync(req.body.contraseña,10),
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

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
    const {correo , contraseña} = req.body
    const user  = await User.findOne({
        correo : correo
    })
    //VALIDACION DE EXISTENCIA DEL USUARIOS
    if(!user){
        return res.status(400).json({
            message : "No se pudo encontrar al usuario"
        })
    }
    //VALIDACION DE CONTRASEÑA DEL USUARIO
    if(user && bcrypt.compareSync(contraseña ,user.contraseña)){
        //FIRMA DEL TOKEN
        const secret = process.env.secret
        const token = jwt.sign({
            //INFORMACION DEL TOKEN
            userId : user._id,
            isAdmin : user.isAdmin
        },secret,{expiresIn : '1d'})
   
        res.status(200).send({
            email : user.correo,
            token : token
        })

    }else{
        res.status(400).send({message : 'La contraseña es incoorrecta'})
    }
    
})


router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun usuario'
        })
    }
    //res.status(200).send(user)
    res.render('user')
})


module.exports = router