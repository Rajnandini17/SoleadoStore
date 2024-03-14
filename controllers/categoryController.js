const CategoryModel = require('../models/CategoryModel');
const slugify = require('slugify');

//create-category controller
const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(401).send({message: 'Name is required'});
        }
        const existingCategory = await CategoryModel.findOne({where: {name}});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category already exists!'
            });
        };

        const category = await new CategoryModel({name, slug: slugify(name)}).save();
        res.status(201).send({
            success: true, 
            message: 'new category created',
            category,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            error,
            message: 'Error in category'
        })
        
    }

}


//update-category controller
const updateCategoryController = async(req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await CategoryModel.findByPk(id);
        if(category) {
            await category.update({name, slug:slugify(name)}, {new: true});
            // const updatedCategory = await CategoryModel.findByPk(id);
            res.status(200).send({
                success: true,
                message: 'Category updated successfully',
                category,
            });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while updating category'
        });
    }
};


//get all categories controller
const categoryController = async(req, res) => {
    try {
        const category = await CategoryModel.findAll({});
        res.status(200).send({
            success: true,
            message: 'All categories list',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while loading all categories'
        });
    }

};


//get single category
const singleCategoryController = async(req, res) => {
    try {
        const category = await CategoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success: true, 
            message: 'get single category successful',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while loading category'
        });  
    }
};


//delete category controller
const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        const category = await CategoryModel.findByPk(id);
        if(category) {
            await category.destroy();
            res.status(200).send({
                success: true,
                message: 'Category Deleted Successfully',
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Category not found.'
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            error,
            message: 'error deleting category',
        });
    }
};

//featuredCategoriesController
const featuredCategoriesController = async(req, res) => {
    try {
        const featuredCategories = await CategoryModel.findAll({
            limit: 3,
            where: {
                isfeatured: true,
            },
        });
        res.status(200).send({
            success: true,
            message: 'Featured Categories list',
            categories: featuredCategories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while loading featured categories',
        });
    }
};


module.exports = {
    createCategoryController, 
    updateCategoryController,
    categoryController, 
    singleCategoryController, 
    deleteCategoryController, 
    featuredCategoriesController
};