const productModel = require('../models/productModel');
const CategoryModel = require('../models/CategoryModel');
const slugify = require('slugify');
const fs = require('fs');
const {Op} = require('sequelize');



//create-product 
const createProductController = async(req, res) => {
    try {
      const {name, description, price, category, quantity, shipping} = req.fields;
      const {photo} = req.files;

    console.log('Request Fields:', req.fields);
    console.log('CategoryId:', category);
      
      if(!name || !description || !price || !category || !quantity) {
        return res.status(500).send({error: 'all fields required'});
      }
      if(photo && photo.size > 1000000) {
        return res.status(500).send({error: 'Photo size exceeds limit'});
      }

      console.log('Creating product with categoryId:', category);

      const product = await new productModel({
        name,
        slug: slugify(name),
        description,
        price,
        category_id: category,
        quantity, 
        shipping,
        photo: photo ? fs.readFileSync(photo.path) : null,
      });

      console.log('Product created:', product);
      await product.save();
      
      res.status(201).send({
        success: true,
        message: 'Product created successfully',
        product,
      });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            error,
            message: 'Error in creating product'
        });
    }

};


//get-product
const getProductController = async(req, res) => {
    try {
       const products = await productModel.findAll({
        attributes: {exclude: ['photo']},
        limit: 12,
        order: [['createdAt', 'DESC']],
       });

       res.status(200).send({
        success: true,
        countTotal: products.length,
        message: 'All products',
        products,
       });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error: error.message
        });
    }
};


//getting a single product
const getSingleProductController = async(req, res) => {
    try {
        
        const products = await productModel.findOne({
            where: { slug: req.params.slug },
            attributes: {exclude: ['photo']},
        
        });
        console.log('Fetched Product:', products);
        if (!products) {
            return res.status(404).send({
              success: false,
              message: 'Product not found',
            });
          }
        res.status(200).send({
            success: true,
            message: 'product fetched',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting a single product',
            error
        });
    }
};


//product photo controller
const productPhotoController = async(req, res) => {
    try {
        const products = await productModel.findByPk(req.params.id, {
            attributes: ['photo'],
        });
        if(products && products.photo) {
            res.set('Content-type', 'image/png');
            return res.status(200).send(products.photo);
        } else {
            return res.status(404).send({
                success: false,
                message: 'Photo not found'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error getting photo',
            error
        });
    }
};


//delete product controller
const deleteProductController = async(req, res) => {
    try {
        const {id} = req.params;
        const products = await productModel.findByPk(id, {
            attributes: ['photo'],
        });
        if(products) {
            await products.destroy();
            res.status(200).send({
                success: true,
                message: 'Product Deleted Successfully',
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Product not found.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error deleting product',
            error
        });
    }
};


//update product controller
const updateProductController = async(req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
  
      console.log('Request Fields:', req.fields);
      console.log('CategoryId:', category);
        
        if(!name || !description || !price || !category || !quantity) {
          return res.status(500).send({error: 'all fields required'});
        }
        if(photo && photo.size > 1000000) {
          return res.status(500).send({error: 'Photo size exceeds limit'});
        }
  
        console.log('Updating product with categoryId:', category);

        const {id} = req.params;
        const product = await productModel.findByPk(id);

        if(!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }

        product.name = name;
        product.slug = slugify(name);
        product.description = description;
        product.price = price;
        product.category_id = category;
        product.quantity = quantity;
        product.shipping = shipping;

        if(photo) {
            product.photo = {
                data: fs.readFileSync(photo.path),
                contentType: photo.type,
            };
        }
        await product.save();
        console.log('Product updated:', product);
        res.status(201).send({
          success: true,
          message: 'Product updated successfully',
          product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in updating product',
            error
        });
    }
};

//filter product controller
const filterProductController = async (req, res) => {
    try {
       const {checked, radio} = req.body;
       let args = {}
       if(checked.length > 0) args.category_id = checked;
       if(radio.length) args.price = {[Op.gte]: radio[0],[Op.lte]: radio[1]};

       const products = await productModel.findAll({where: args,});
       res.status(200).send({
        success: true,
        products
       });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in filtering products',
            error
        });
    }
};


//product count controller
const productCountController = async(req, res) => {
try {
    const total = await productModel.count();
    res.status(200).send({
        success: true,
        total
    })
} catch (error) {
    console.log(error);
    res.status(400).send({
        message: 'Error in product count',
        error,
        success: false
    });
}
};


//product list controller
const productListController = async(req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.findAll({
            attributes: { exclude: ['photo'] },
            offset: (page - 1) * perPage,
            limit: perPage,
            order: [['createdAt', 'DESC']],
          });
          res.status(200).send({
            success: true,
            products,
          })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'error in page controller',
            error
        });
    }
};


//Search Controller
const searchController = async(req, res) => {
    try {
        const {keyword} = req.params;
        const result = await productModel.findAll({
            where: {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${keyword}%` } },
                  { description: { [Op.iLike]: `%${keyword}%` } },
                ],
              },
              attributes: { exclude: ['photo'] },
        });
        console.log(result);
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in search API',
            error
        });
    }
};


//related product controller
const relatedProductController = async(req, res) => {
    try {
       const {id, cid} = req.params;
       const products = await productModel.findAll({
        where: {
            category_id: cid,
            id: {[Op.ne]: id},
        },
        attributes: {exclude: ['photo']},
        limit: 5,
        include: [{
            model: CategoryModel,
            as: 'category',
        }],
       });
       res.status(200).send({
        success: true,
        products
       });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while getting related products',
            error
        });
    }
};

//category list Controller
const categoryListController = async(req, res) => {
    try {
        const category = await CategoryModel.findOne({where: {slug: req.params.slug}});
        const products = await productModel.findAll({
            where: { category_id: category.id },
            include: [{ model: CategoryModel, as: 'category' }],
        });
        res.status(200).send({
            success: true,
            category,
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while getting products',
            error
        });
    }
};






module.exports = {
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
};