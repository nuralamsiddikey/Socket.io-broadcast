const router = require('express').Router()
const path = require('path')

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/login/login.html'))
})

router.get('/chat',(req,res)=>{
     res.sendFile(path.join(__dirname,'../views/login/login.html'))
})



module.exports = router