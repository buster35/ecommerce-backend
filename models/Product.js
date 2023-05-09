// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER
      //doesnt allow null
      //primary key
      //auto increment
    },
    product_name: {
      type: DataTypes.STRING
      //doesnt allow null
    },
    price: {
      type: DataTypes.DECIMAL
      //no null
      //validate
    },
    stock: {
      type: DataTypes.INTEGER
      //no null
      //default 10
      //validate
    },
    category_id: {
      type: DataTypes.INTEGER
      //ref Category model 'id'
    }
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
