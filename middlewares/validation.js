const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Поле "Имя" должно быть заполнено',
        'string.min': 'Минимальная длина имени- 2 символа',
        'string.max': 'Максимальная длина имени - 30 символов',
      }),
    email: Joi.string().email().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный адрес email');
    }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "Пароль" должно быть заполнено',
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "country"',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "director"',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "duration"',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "year"',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "description"',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка в поле "image"');
    }),
    trailerLink: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "trailerLink"',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "nameRU"',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "nameEN"',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка в поле "thumbnail"');
    }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Отсутствует значение в поле "movieId"',
      }),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserProfileValidation,
  createMovieValidation,
  deleteMovieValidation,
};
