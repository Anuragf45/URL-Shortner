const urlModel = require('../models/urlModel')
const shortid = require('shortid');

let baseUrl = "http://localhost:3000"

const shortUrl = async(req,res)=>{

try {

    const datas = req.body
    let{longUrl} = datas
  

    if(Object.keys.length ==0 )
    return res.status(400).send({status:false,message:"body cant be Empty"})

    
if(!longUrl)
return res.status(400).send({status:false,message:"longUrl is required"})

    let urlcode= shortid.generate() 
    datas.urlCode = urlcode
  
      let shortUrl = baseUrl + '/'+ urlcode
      datas.shortUrl = shortUrl
  
    let result = await urlModel.create(datas)
  
    let finaldata = await urlModel.findById(result._id).select({createdAt:0,updatedAt:0,__v:0})
   
     res.status(201).send({status:true,data:finaldata})
    
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}


}

module.exports = {shortUrl}