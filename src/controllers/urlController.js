const urlModel = require('../models/urlModel')
const shortid = require('shortid');
const isvalidUrl = require('valid-url')
const{isValidUrl} = require('../utils/validation')



let baseUrl = "http://localhost:3000"

const shortUrl = async(req,res)=>{

try {

    const datas = req.body
    let{longUrl} = datas
  

    if(Object.keys.length ==0 )
    return res.status(400).send({status:false,message:"body cant be Empty"})

     if(!longUrl)
    return res.status(400).send({status:false,message:"longUrl is required"})

    if(!isValidUrl(longUrl))
    return res.status(401).send({status:false,message:"your long-Url is invalid "})

    
  let uniqueUrl = await urlModel.findOne({longUrl:longUrl}).select({createdAt:0,updatedAt:0,__v:0,_id:0})

   if(uniqueUrl)
   return res.status(200).send({status:true,data:uniqueUrl})

    let urlcode= shortid.generate() 
    datas.urlCode = urlcode
  
      let shortUrl = baseUrl + '/'+ urlcode
      datas.shortUrl = shortUrl
  
    await urlModel.create(datas)
  
    let finaldata = await urlModel.findOne({urlCode:urlcode}).select({createdAt:0,updatedAt:0,__v:0,_id:0})


     res.status(201).send({status:true,data:finaldata})
    
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}}



const getShortUrl = async(req,res)=>{
   try {
    
    let data = req.params.urlCode
    

const finalData = await urlModel.findOne({urlCode:data}).select({longUrl:1,_id:0})
//    if(!finalData)
//    return res.status(404).send({status:false,message:`This Url {} not Found`})
              
    res.status(200).send({status:true,data:finalData})

   } catch (error) {
    res.status(500).send({status:false,message:error.message})
    
   }
}
module.exports = {shortUrl,getShortUrl}