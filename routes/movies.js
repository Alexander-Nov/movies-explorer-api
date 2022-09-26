const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле данными
router.post('/', createMovieValidation, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
