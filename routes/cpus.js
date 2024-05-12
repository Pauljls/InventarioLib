const express = require('express')
const CPU  = require('../models/itemcpu')
const router  = express.Router()
const multer =  require('multer')
const bodyparser = require('body-parser')

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        //VALIDACION DE TIPO DE ARCHIVO
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Tipo de imagen invalida')
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/images/uploads')
    },
    filename: function(req,file,cb){
        //AGREGAR LA EXXTENSION DEL ARCHIVO
        const extension= FILE_TYPE_MAP[file.mimetype]
        const filename =  file.originalname.split(' ').join('-')
                cb(null,filename+'-'+Date.now()+'.'+extension)
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

router.get('/registro',(req,res)=>{
    res.render('addItem')
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


router.post('/registro',uploadConf.single('image'),async(req,res)=>{
    //NOMBRE DEL ARCHIVO
    let filename = req.file.filename

    //NOMBRE DE LA RUTA
    const localPath = `${req.protocol}://${req.get('host')}/public/images/uploads/`;
    let cpu = new CPU({
        nombre : req.body.nombre, 
        serie : req.body.serie,
        fechaAdquisicion : req.body.fechaAdquisicion,
        ubicacion : req.body.ubicacion,
        estado : req.body.estado,
        procesador : req.body.procesador,
        ram : req.body.ram,
        image: `${localPath}${filename}`
    })
    
    cpu = await cpu.save()

    if(!cpu){
        return res.status(500).json({
            message  :  "Error al crear al usuario"
        })
    }
    //res.status(200).send(cpu)
    res.redirect('/equiposInformaticos/cpus')
})

router.patch('/:id',bodyparser.json({extended : true}),uploadConf.single('image'),async(req,res)=>{
  try{
    //let filename = req.file.filename
    //const path = `${req.protocol}://${req.get('host')}/public/images/uploads/`;
    const {nombre, serie, fechaAdquisicion, ubicacion, estado, procesador, ram, image} = req.body  
    const cpu = await CPU.findByIdAndUpdate(req.params.id,{
        nombre : nombre,
        serie : serie,
        fechaAdquisicion :  fechaAdquisicion,
        ubicacion : ubicacion,
        estado : estado,
        procesador :  procesador,
        ram : ram
        //image : `${path}${filename}`
    })
    res.send(cpu)
    //res.redirect('/equiposInformaticos/cpus')
}catch(err){
    res.status(500).send(err)
  }
  
})

router.delete('/:id',async(req,res)=>{
    try{
        const user = await CPU.findByIdAndDelete(req.params.id)
        if(!user){
            return res.send(400).json({message : 'El ususario no existe'})
        }
        res.send(user)
    }catch(err){
        console.log(err)
    }
})

module.exports = router