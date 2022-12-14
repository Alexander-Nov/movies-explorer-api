require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandling = require('./middlewares/errorHandling');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const { DEFAULT_MONGO_DB_LINK } = require('./utils/config');

const {
  PORT = 3000,
  NODE_ENV = 'develop',
  MONGO_PROD_DB,
} = process.env;

const options = {
  origin: [
    'https://localhost:3010',
    'http://localhost:3010',
    'https://diplom.novoselov.nomorepartiesxyz.ru',
    'http://diplom.novoselov.nomorepartiesxyz.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();

app.use(helmet());

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD_DB : DEFAULT_MONGO_DB_LINK);

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandling); // централизованный обработчик ошибок

app.listen(PORT);
