var mongoose = require('mongoose');
var catagoriesModel = new mongoose.Schema({
    categories:{type:String, required:true}
})
var categoriesData = new mongoose.model('categoriesData', catagoriesModel);
module.exports = categoriesData