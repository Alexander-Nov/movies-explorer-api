const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserProfile, getUserProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

// router.get('/', getUsers);

// router.get('/:id', celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().hex().length(24),
//   }),
// }), getUserById);

// router.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string()
//       .pattern(urlRegExp)
//       .message('Поле "avatar" должно быть валидным url-адресом'),
//   }),
// }), updateUserAvatar);

module.exports = router;
