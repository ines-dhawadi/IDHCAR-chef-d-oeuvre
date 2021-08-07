const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artisanSchema = new Schema ({

nom:{
    type:String,
    required : true
},
prenom:{
    type:String,
    required : true
},
role:{
    type:String,
    required : true
},
desc:{
    type:String,
    required : true
},

latitude:{
    type:String,
    required : true
},
longitude:{
    type:String,
    required : true
},
imageP:{
    type:String,
    required : true
},
image1:{
    type:String,
    required : true
},
image2:{
    type:String,
    required : true
},
image3:{
    type:String,
    required : true
},
image4:{
    type:String,
    required : true
},
Ntelf:{
    type:String,
    required : true
},
adress:{
    type:String,
    required : true
},
gouvernorat:{
    type:String,
    required : true
}




})
module.exports = artisan = mongoose.model('artisan',artisanSchema)