const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserInfo } = require('../models');

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);

        try {
            const user = await User.create({ email, password: hashPassword, role });
            await UserInfo.create({ userId: user.id });

            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            return next(ApiError.internal('Ошибка при создании пользователя'));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return next(ApiError.internal('Пользователь не найден'));

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return next(ApiError.internal('Указан неверный пароль'));

        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
