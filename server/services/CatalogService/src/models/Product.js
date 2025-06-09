const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING }, // путь или URL к изображению
    type: { type: DataTypes.STRING }, // product | service
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    available: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Product;