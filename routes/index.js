const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth); // авторизация

router.use('/users', userRouter);
router.use('/cards', movieRouter);

router.use('*', () => {
  throw new NotFoundError('Данные по указанному запросу не существуют');
});

module.exports = router;
