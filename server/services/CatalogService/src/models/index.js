const Product = require('./Product');
const Category = require('./Category');

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
    Product,
    Category
};