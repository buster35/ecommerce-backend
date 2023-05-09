// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//Setting up associations between the four table models//
// Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.
Product.belongsToMany(Tag, { through: "ProductTag" })

Tag.belongsToMany(Product, { through: "ProductTag" })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

// > **Hint:** Make sure you set up foreign key relationships that match the column we created in the respective models.