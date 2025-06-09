const User = require('./User');
const UserInfo = require('./UserInfo');

User.hasOne(UserInfo, { foreignKey: 'userId' });
UserInfo.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    UserInfo
};