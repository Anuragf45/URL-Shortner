
const express = require('express')
const router = express.Router()
const {shortUrl,getShortUrl}= require('../controllers/urlController')


router.get('/testme',(req,res)=>{
    res.json('api🎇🎇')
})



router.post('/url/shorten',shortUrl)

router.get('/:urlCode',getShortUrl)

module.exports = router