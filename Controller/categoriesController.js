var asynchandler = require('express-async-handler')
var catagoriesModel = require('../Model/CategoriesModel')


exports.postCategories = asynchandler(async(req, res)=>{
    const {categories} = req.body
    
    try{
        await catagoriesModel.create({
            categories:categories
        })
        res.status(200).send('Categories posted successfully')
    }catch(err){
        console.log(err)
        res.status(500).send('An error occured while posting categories')
    }
})

exports.getCategories = asynchandler(async(req,res)=>{
    try{
        const response = await catagoriesModel.find()
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).send('An error occured while fetching data')
    }
})

exports.getCategoriesById = asynchandler(async(req,res)=>{
    const {id} = req.params
    console.log(req.params, 'the id is here')
    try{
        const response = await catagoriesModel.findById(id)
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).send('An error occured while fetching data')
    }
})

exports.putCategoriesById = asynchandler(async(req, res)=>{
    const {id} = req.params;
    const {categories} = req.body;
   
   

    try{
    
        const update = {
           categories:categories
        }
        const updateData = await catagoriesModel.findByIdAndUpdate(id, {$set:update}, {new:true})
        res.status(200).json(updateData)
       
    }catch(err){
        res.status(500).json({err:'error while updating data'})
    }
})

exports.deleteCategoriesById = asynchandler(async(req, res)=>{
    const {id} = req.params
    try{
        const response = await catagoriesModel.findByIdAndDelete(id)
        res.status(200).json(response)
    }catch(err){
        console.log(err)
    }
})