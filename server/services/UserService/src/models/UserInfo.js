const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserInfo = sequelize.define('user_info', {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATE },
    gender: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
});

module.exports = UserInfo;