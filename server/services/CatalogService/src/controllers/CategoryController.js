const { Category } = require('../models');

class CategoryController {
    async create(req, res) {
        const category = await Category.create(req.body);
        res.json(category);
    }

    async getAll(req, res) {
        const categories = await Category.findAll();
        res.json(categories);
    }
}

module.exports = new CategoryController();