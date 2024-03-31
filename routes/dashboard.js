const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).render('dashboard')
})
router.get('/equiposInformaticos',(req,res)=>{
    res.status(200).render('equiposInformaticos')
})

module.exports = router