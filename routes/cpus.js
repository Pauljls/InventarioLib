const express = require('express')
const CPU  = require('../models/itemcpu')
const router  = express.Router()

router.get('/',async(req,res)=>{
    const cpuList = await CPU.find()
    if(!cpuList){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun cpu registrado'
        })
    }
    res.status(200).send(cpuList)
})

router.get('/:id',async(req,res)=>{
    const cpu = await CPU.findById(req.params.id)
    if(!cpu){
        return res.status(500).json({
            message : 'No se pudo encontrar el cpu'
        })
    }
    res.status(200).send(cpu)
})

router.post('/',async(req,res)=>{
    let cpu = new CPU({
        nombre : req.body.nombre, 
        serie : req.body.serie,
        fechaAdquisicion : req.body.fechaAdquisicion,
        ubicacion : req.body.ubicacion,
        estado : req.body.estado,
        procesador : req.body.procesador,
        ram : req.body.ram,
    })
    
    cpu = await cpu.save()

    if(!cpu){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    res.status(200).send(cpu)
})

module.exports = router