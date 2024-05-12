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
    const user = req.user
    res.render('users',{userList : userList, datos: user})
})

router.get('/registro',async(req,res)=>{
    res.status(200).render('userRegistro')
})

router.post('/registro',async(req,res)=>{
    let isAdmin = req.body.isAdmin === 'on';

    let user = new User({
        nombre : req.body.nombre,
        apellidoP : req.body.apellidoP,
        apellidoM : req.body.apellidoM,
        correo : req.body.correo,
        contraseña: bcrypt.hashSync(req.body.contraseña,10),
        telefono : req.body.telefono,
        isAdmin : isAdmin, 
    })
    
    user = await user.save()

    if(!user){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    //res.status(200).send(user)

    res.redirect('/users/login')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const user = await User.findOne({ correo });

        // Validación de existencia del usuario
        if (!user) {
            return res.status(400).json({ message: "No se pudo encontrar al usuario" });
        }

        // Validación de contraseña del usuario
        if (user && bcrypt.compareSync(contraseña, user.contraseña)) {
            // FIRMA DEL TOKEN
            const secret = process.env.secret;
            const token = jwt.sign({
                // Información del token
                userId: user._id,
                isAdmin: user.isAdmin,
                nombre : user.nombre
            }, secret, { expiresIn: '1d' });

            // Establecer la cookie de token
            res.cookie('token', token, { httpOnly: true });

            // Redireccionar al usuario al dashboard
            res.redirect('/dashboard');
        } else {
            res.status(400).send({ message: 'La contraseña es incorrecta' });
        }
    } catch (error) {
        console.error("Error al procesar la solicitud de inicio de sesión:", error);
        res.status(500).send({ message: 'Se produjo un error al iniciar sesión' });
    }
});

module.exports = router;


router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun usuario'
        })
    }
    //res.status(200).send(user)
    res.render('user',user)
})


module.exports = router