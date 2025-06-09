const { UserInfo } = require('../models');
const ApiError = require('../error/ApiError');

class UserInfoController {
    async getOneUserInfo(req, res, next) {
        const { id } = req.params;
        const info = await UserInfo.findByPk(id);
        if (!info) return next(ApiError.notFound('Информация не найдена'));
        return res.json(info);
    }

    async updateOne(req, res, next) {
        const { id } = req.params;
        const fields = req.body;

        const userinfo = await UserInfo.findByPk(id);
        if (!userinfo) return next(ApiError.notFound('Профиль не найден'));

        Object.assign(userinfo, fields);
        await userinfo.save();

        return res.json(userinfo);
    }

    async deleteUserInfo(req, res, next) {
        const { id } = req.params;
        await UserInfo.destroy({ where: { id } });
        return res.json({ message: 'Удалено' });
    }
}

module.exports = new UserInfoController();
