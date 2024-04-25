var mongoose = require('mongoose')
var dishesModel = new mongoose.Schema({
    image:{type:String},
    price:{type:Number, },
    dishes:{type:String},
    categories:{type:String, required:true}
})
var dishesData = new mongoose.model('dishesData', dishesModel)
module.exports = dishesData