const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
    createCategoryController, 
    updateCategoryController, 
    categoryController, 
    singleCategoryController, 
    deleteCategoryController,
    featuredCategoriesController
} = require('../controllers/categoryController');

const router = express.Router();

//create category route
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update category route
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get-All categories
router.get('/get-category', categoryController);

//get single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

router.get('/get-featured-categories', featuredCategoriesController);


module.exports = router;