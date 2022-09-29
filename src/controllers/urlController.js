const urlModel = require('../models/urlModel')
const shortid = require('shortid');
const isvalidUrl = require('valid-url')



let baseUrl = "http://localhost:3000"

const shortUrl = async(req,res)=>{

try {

    const datas = req.body
    let{longUrl} = datas
  

    if(Object.keys.length ==0 )
    return res.status(400).send({status:false,message:"body cant be Empty"})

    
if(!longUrl)
return res.status(400).send({status:false,message:"longUrl is required"})


const validURl = (longUrl) => {
    const regx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(longUrl)
    return regx
};

if(!validURl(longUrl))
return res.status(401).send({status:false,message:"your long-Url is invalid "})


    let urlcode= shortid.generate() 
    datas.urlCode = urlcode
  
      let shortUrl = baseUrl + '/'+ urlcode
      datas.shortUrl = shortUrl
  
    let result = await urlModel.create(datas)
  
    let finaldata = await urlModel.findById(result._id).select({createdAt:0,updatedAt:0,__v:0})
   
     res.status(201).send({status:true,data:finaldata})
    
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}}





const getShortUrl = async(req,res)=>{
   try {
    
    let data = req.params.urlCode
    

const finalData = await urlModel.findOne({urlCode:data}).select({shortUrl:1,_id:0})
   
              
    res.status(301).send({status:true,data:finalData})

   } catch (error) {
    res.status(500).send({status:false,message:error.message})
    
   }
}
module.exports = {shortUrl,getShortUrl}