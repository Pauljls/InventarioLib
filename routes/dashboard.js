const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    const datos = req.user
    res.status(200).render('dashboard',{
        datos: datos
    })
})
router.get('/equiposInformaticos',(req,res)=>{
    res.status(200).render('equiposInformaticos')
})


module.exports = router