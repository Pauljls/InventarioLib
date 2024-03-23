const express = require('express')
const CPU  = require('../models/itemcpu')
const router  = express.Router()
const multer =  require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/uploads/images')
    },
    filename: function(req,file,cb){
        const filename = file.fieldname+'-'+Date.now() 
        cb(null,filename)
    }
})
const uploadConf = multer({storage : storage})

router.get('/',async(req,res)=>{
    const cpuList = await CPU.find()
    if(!cpuList){
        return res.status(500).json({
            message : 'No se pudo encontrar ningun cpu registrado'
        })
    }
    res.render('cpus',{cpuList :cpuList})
    //res.status(200).send(cpuList)
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

router.post('/',uploadConf.single('image'),async(req,res)=>{
    const localPath = `${req.protocol}://${req.get('host')}/`;
    let cpu = new CPU({
        nombre : req.body.nombre, 
        serie : req.body.serie,
        fechaAdquisicion : req.body.fechaAdquisicion,
        ubicacion : req.body.ubicacion,
        estado : req.body.estado,
        procesador : req.body.procesador,
        ram : req.body.ram,
        image: `${localPath}${req.file.filename}`
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