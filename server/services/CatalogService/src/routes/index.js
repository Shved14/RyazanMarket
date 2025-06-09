const Router = require('express');
const router = new Router();
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
