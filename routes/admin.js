var express = require('express')
var router = express.Router()
// var multer = require('multer');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        // Preserve the file extension
        const fileExtension = file.originalname.split('.').pop();
        // Generate a unique filename
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileExtension;
        cb(null, uniqueFilename);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
        }
    }
});

var categoriesController = require('../Controller/categoriesController')
var dishesController = require('../Controller/dishesController')




// --categories--

router.post('/postcategories',categoriesController.postCategories);
router.get('/getcategories',categoriesController.getCategories);
router.get('/getcategoriesbyid/:id',categoriesController.getCategoriesById);
router.put('/putcategories/:id',categoriesController.putCategoriesById);
router.delete('/deletecategories/:id',categoriesController.deleteCategoriesById);



router.post('/postdishes', upload.single('image'),dishesController.postDishes);
router.get('/getdishes',dishesController.getDishes);
router.get('/getdishesbyid/:id',dishesController.getDishesById);
router.put('/putdishes/:id',upload.single('image'),dishesController.putDishesById);
router.delete('/deletedishes/:id',dishesController.deleteDishesById);

module.exports = router