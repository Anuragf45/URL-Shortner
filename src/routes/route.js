
const express = require('express')
const router = express.Router()
const {shortUrl}= require('../controllers/urlController')


router.get('/testme',(req,res)=>{
    res.json('api🎇🎇')
})



router.post('/url/shorten',shortUrl)

module.exports = router