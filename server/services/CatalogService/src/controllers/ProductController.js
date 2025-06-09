const { Product, Category } = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

class ProductController {
    async create(req, res, next) {
        try {
            const { name, description, price, type, stock, available, categoryId } = req.body;
            let imagePath = null;

            if (req.files && req.files.image) {
                const image = req.files.image;
                const fileName = `${Date.now()}_${image.name}`;
                const uploadPath = path.resolve(__dirname, '..', 'static', fileName);
                await image.mv(uploadPath);
                imagePath = `/static/${fileName}`;
            }

            const product = await Product.create({
                name,
                description,
                price,
                image: imagePath,
                type,
                stock,
                available,
                categoryId
            });

            res.json(product);
        } catch (err) {
            next(err);
        }
    }

    async getAll(req, res, next) {
        try {
            const { categoryId, minPrice, maxPrice, type, available } = req.query;
            const where = {};

            if (categoryId) where.categoryId = categoryId;
            if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
            if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice), ...where.price };
            if (type) where.type = type;
            if (available !== undefined) where.available = available === 'true';

            const products = await Product.findAll({ where, include: Category });
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id, { include: Category });
            if (!product) return res.status(404).json({ message: 'Not found' });
            res.json(product);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductController();