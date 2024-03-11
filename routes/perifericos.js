const express = require('express')
const Periferico = require('../models/periferico')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const perifericoList = await Periferico.find()
    if(!perifericoList){
        return res.status(500).json({
            message : 'No se pudo encontrar ninguna impresora registrado'
        })
    }
    res.status(200).send(perifericoList)
})

router.get('/:id',async(req,res)=>{
    const periferico = await Periferico.findById(req.params.id)
    if(!periferico){
        return res.status(500).json({
            message : 'No se pudo encontrar la impresora'
        })
    }
    res.status(200).send(periferico)
})

router.post('/',async(req,res)=>{
    const { nombre, serie, fechaAdquisicion, ubicacion, estado, marca,entrada,rgb} = req.body
    let periferico = new Periferico({
        nombre : nombre,
        serie : serie,
        fechaAdquisicion : fechaAdquisicion,
        ubicacion : ubicacion,
        estado : estado,
        marca : marca,
        entrada : entrada,
        rgb : rgb
    })
    
    periferico = await periferico.save()

    if(!periferico){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    res.status(200).send(periferico)
})

module.exports = router