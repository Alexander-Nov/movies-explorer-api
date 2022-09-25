const router = require('express').Router();
const { updateUserProfileValidation } = require('../middlewares/validation');

const {
  updateUserProfile, getUserProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserProfileValidation, updateUserProfile);

module.exports = router;
