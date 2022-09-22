const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Movie.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      // eslint-disable-next-line no-underscore-dangle
      if (err.name === 'ValidationError' || err._message === 'card validation failed') {
        next(new ValidationError('Введены некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .then((card) => {
      const cardOwner = card.owner.toString().replace('new ObjectId("', '');
      if (cardOwner !== req.user._id) {
        next(new ForbiddenError('Можно удалять только свои карточки'));
      } else {
        Movie.findByIdAndRemove(req.params.id)
          .then((removedCard) => res.send(removedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для удаления карточки'));
      } else {
        next(err);
      }
    });
};

// const likeCard = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.id,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(() => {
//       throw new NotFoundError('Карточка с указанным id не найдена');
//     })
//     .then((card) => res.send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new ValidationError('Переданы некорректные данные для постановки лайка'));
//       } else {
//         next(err);
//       }
//     });
// };

// const dislikeCard = (req, res, next) => {
//   Movie.findByIdAndUpdate(
//     req.params.id,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(() => {
//       throw new NotFoundError('Карточка с указанным id не найдена');
//     })
//     .then((card) => res.send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new ValidationError('Переданы некорректные данные для удаления лайка'));
//       } else {
//         next(err);
//       }
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
