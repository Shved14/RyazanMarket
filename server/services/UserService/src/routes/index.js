const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const UserInfoController = require('../controllers/UserInfoController');
const auth = require('../middleware/authMiddleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/check', auth, UserController.check);

router.get('/userinfo/:id', auth, UserInfoController.getOneUserInfo);
router.put('/userinfo/:id', auth, UserInfoController.updateOne);
router.delete('/userinfo/:id', auth, UserInfoController.deleteUserInfo);

module.exports = router;
