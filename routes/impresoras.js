const express = require('express')
const Impresora  = require('../models/impresora')
const impresora = require('../models/impresora')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const impresoraList = await Impresora.find()
    if(!impresoraList){
        return res.status(500).json({
            message : 'No se pudo encontrar ninguna impresora registrado'
        })
    }
    res.status(200).render('impresoras', {impresoraList : impresoraList})
})

router.get('/:id',async(req,res)=>{
    const impresora = await Impresora.findById(req.params.id)
    if(!impresora){
        return res.status(500).json({
            message : 'No se pudo encontrar la impresora'
        })
    }
    res.status(200).send(impresora)
})

router.post('/',async(req,res)=>{
    let impresora = new Impresora({
        tipo : req.body.tipo,
        nombre : req.body.nombre,
        serie : req.body.serie,
        fechaAdquisicion : req.body.fechaAdquisicion,
        ubicacion : req.body.ubicacion,
        estado : req.body.estado,
        marca : req.body.marca,
        tipoDeImpresion : req.body.tipoDeImpresion,
        colorFisico : req.body.colorFisico,
    })
    
    impresora = await impresora.save()

    if(!impresora){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    res.status(200).send(impresora)
})

module.exports = router