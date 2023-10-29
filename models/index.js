// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: "CASCADE"
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: "CASCADE"
});

// Products belongToMany Tags
Product.belongsToMany(Tag, {
  foreignKey: "product_id",
  through: ProductTag,
  onDelete: "CASCADE"
});

// Tags belongToMany Products 
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag,
  onDelete: "CASCADE"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};