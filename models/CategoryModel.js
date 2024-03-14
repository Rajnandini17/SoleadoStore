const pg = require('pg');
const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      lowercase: true, 
    },
    isfeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  }, {
    tableName: 'categories',
  });

  module.exports = Category;