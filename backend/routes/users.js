const router = require('express').Router();

const {
  getUser, getUsers, updateProfile, updateAvatar, getProfile
} = require('../controllers/users');

const { validateUserId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validate');

router.get('/users', getUsers);
router.get('/users/me', getProfile);
router.get('/users/:userId', validateUserId, getUser);
router.patch('/users/me', validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
