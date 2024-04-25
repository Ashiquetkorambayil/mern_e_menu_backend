var asynchandler = require('express-async-handler');
var dishesModel = require('../Model/DishesModel')

exports.postDishes = asynchandler(async (req, res) => {
    const { price, dishes, categories } = req.body; // Corrected field name
    const image = req.file ? req.file.filename : undefined;
    console.log(req.body, "heloooooooo");
    
    try {
        const newDish = await dishesModel.create({
            price: price,
            dishes: dishes,
            categories: categories, // Corrected field name
            image: image
        });
        res.status(200).json({
            message: 'Dishes posted successfully',
            dish: newDish
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while posting Dishes');
    }
});

exports.getDishes = async (req, res) => {
    const search = req.query.search;
    console.log(search, "the search term"); // Log the search term
    try {
        const query = {};
        if (search) {
            query.$or = [
                { categories: { $regex: search, $options: 'i' } }
            ];
        }
        console.log(query, "the query"); // Log the formed query
        const response = await dishesModel.find(query);
        console.log(response, "the response"); // Log the response from the database
        res.status(200).json(response);
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).send('An error occurred while fetching data');
    }
};



exports.getDishesById = asynchandler(async(req,res)=>{
    const {id} = req.params
    // console.log(req.params, 'the id is here')
    try{
        const response = await dishesModel.findById(id)
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).send('An error occured while fetching data')
    }
})

exports.putDishesById = asynchandler(async(req, res)=>{
    const {id} = req.params;
    const {categories, price, dishes} = req.body;
    const image = req.file ? req.file.filename : undefined;
    console.log(req.bod)
   

    try{
    
        const update = {
            categories:categories,
           price:price,
           dishes:dishes,
           image:image
        }
        const updateData = await dishesModel.findByIdAndUpdate(id, {$set:update}, {new:true})
        res.status(200).json(updateData)
       
    }catch(err){
        res.status(500).json({err:'error while updating data'})
    }
})

exports.deleteDishesById = asynchandler(async(req, res)=>{
    const {id} = req.params
    try{
        const response = await dishesModel.findByIdAndDelete(id)
        res.status(200).json(response)
    }catch(err){
        console.log(err)
    }
})