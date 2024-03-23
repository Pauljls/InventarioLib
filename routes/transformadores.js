const express = require('express')
const Transformador = require('../models/transformador')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const transformadorList = await Transformador.find()
    if(!transformadorList){
        return res.status(500).json({
            message : 'No se pudo encontrar trnasformador registrado'
        })
    }
    res.status(200).render('transformadores',{
        transformadorList : transformadorList
    })
})

router.get('/:id',async(req,res)=>{
    const transformador = await Transformador.findById(req.params.id)
    if(!transformador){
        return res.status(500).json({
            message : 'No se pudo encontrar el trasnformador'
        })
    }
    res.status(200).send(transformador)
})

router.post('/',async(req,res)=>{
    const { tipo, nombre, serie, fechaAdquisicion, ubicacion, estado, volEntrada, potencia} = req.body
    let trannsformador = new Transformador({
        tipo : tipo,
        nombre : nombre,
        serie : serie,
        fechaAdquisicion : fechaAdquisicion,
        ubicacion : ubicacion,
        estado : estado,
        volEntrada : volEntrada,
        potencia : potencia
    })
    
    transformador = await trannsformador.save()

    if(!trannsformador){
        return res.status(500).json({
            message  :  "Error al registrar transformador"
        })
    }
    res.status(200).send(trannsformador)
})

module.exports = router