// 📁 src/index.js
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

// 📝 Логирование всех запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// 🔐 JWT Middleware
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Нет токена' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Неверный формат токена' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
    }
};

// 🔐 Проксирование Auth + User Service (без токена)
app.use('/api/users', createProxyMiddleware({
    target: 'http://auth-user-service:5000',
    changeOrigin: true,
    pathRewrite: { '^/api/users': '/api' }
}));

// 📦 Проксирование Catalog Service (c JWT)
app.use('/api/catalog', verifyJwt, createProxyMiddleware({
    target: 'http://catalog-service:5001',
    changeOrigin: true,
    pathRewrite: { '^/api/catalog': '/api' }
}));

// 📥 Фолбэк и проверка
app.get('/', (req, res) => {
    res.send('🚪 API Gateway is running');
});

app.listen(PORT, () => {
    console.log(`✅ Gateway running on port ${PORT}`);
});
