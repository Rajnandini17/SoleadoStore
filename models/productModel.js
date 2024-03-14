const pg = require('pg');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./CategoryModel');

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photo: {
        type: DataTypes.BLOB,
    },
    shipping: {
        type: DataTypes.BOOLEAN,  
    }

}, {timestamps:true});

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = Product;