const mongoose  = require('mongoose')

const urlSchema = new mongoose.Schema({

        urlCode: {type:String,
           
             
              trim:true},
              
    longUrl: { type:String,
        required:true,
       
         trim:true},
         
         shortUrl: {type:String,
            
            
             trim:true},

  },{timestamps:true})


  module.exports = mongoose.model('url',urlSchema)
