const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id"
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tag",
        id: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'ProductTag',
  }
);

module.exports = ProductTag;
