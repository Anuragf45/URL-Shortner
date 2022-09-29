const urlModel = require('../models/urlModel')
const shortid = require('shortid');

let baseUrl = "http://localhost:3000"

const shortUrl = async(req,res)=>{

try {
    
} catch (error) {
    res.status()
}
   const data = req.body


  let urlcode= shortid.generate() 
    data.urlCode = urlcode

    let shortUrl = baseUrl + '/'+ urlcode
    data.shortUrl = shortUrl

  let result = await urlModel.create(data)

  let finaldata = await urlModel.findById(result._id).select({createdAt:0,updatedAt:0,__v:0})
 

//   console.log(finaldata);
   res.status(201).send({status:true,data:finaldata})

}

module.exports = {shortUrl}