require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const router = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);
app.use(fileUpload({}));
app.use('/static', express.static(path.resolve(__dirname, '..', 'static')));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`CatalogService started on port ${PORT}`));
    } catch (e) {
        console.error('Startup error:', e);
    }
};

start();
