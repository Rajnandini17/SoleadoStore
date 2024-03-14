const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
    createProductController, 
    getProductController, 
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    filterProductController,
    productCountController,
    productListController, 
    searchController,
    relatedProductController,
    categoryListController,
   
} = require('../controllers/productController');
const formidable = require('express-formidable');


const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get products
router.get('/get-product', getProductController);

//get single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:id', productPhotoController);

//delete product
router.delete('/product-delete/:id', deleteProductController);

//update product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

//filter-product
router.post('/filter-product', filterProductController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//Search product
router.get('/search/:keyword', searchController);

//similar product
router.get('/related-product/:id/:cid', relatedProductController);

//category wise product
router.get('/product-category/:slug', categoryListController);



module.exports = router;