const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');

const skillsRouter = require('./routes/skillRouter');

const app = express();
app.use(cors());

app // Middlewares
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.json());

app // Routes
  .use('/skills', skillsRouter);

module.exports = app;