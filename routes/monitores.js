const express = require('express')
const Monitor  = require('../models/monitor')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const monitorList = await Monitor.find()
    if(!monitorList){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun cpu registrado'
        })
    }
    res.status(200).render('monitores',{
        monitorList :  monitorList
    })
})

router.get('/:id',async(req,res)=>{
    const monitor = await Monitor.findById(req.params.id)
    if(!monitor){
        return res.status(500).json({
            message : 'No se pudo encontrar el cpu'
        })
    }
    res.status(200).send(monitor)
})

router.post('/',async(req,res)=>{
    let monitor = new Monitor({
        nombre : req.body.nombre, 
        serie : req.body.serie,
        fechaAdquisicion : req.body.fechaAdquisicion,
        ubicacion : req.body.ubicacion,
        estado : req.body.estado,
        tamañoPantalla : req.body.tamañoPantalla,
        resolucion : req.body.resolucion,
        marca : req.body.marca
    })
    
    monitor = await monitor.save()

    if(!monitor){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    res.status(200).send(monitor)
})

module.exports = router