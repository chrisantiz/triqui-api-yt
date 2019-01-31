const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, ORIGINS } = require('./keys');

const app = express();

app
    .set('port', process.env.PORT || PORT)
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors({ origin: ORIGINS }))
    .use(morgan('dev'))

module.exports = app;