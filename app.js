require('dotenv').config();
require('module-alias/register')
const express = require('express');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');

const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const { packageRouter } = require('@routes');

const profile = {
  Api_type: process.env.Api_type,
  LicenceKey: process.env.LicenceKey,
  LoginID: process.env.LoginID,
  Version: process.env.Version,
};

global.profile = global.profile || profile;

const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());

app.use('/api/v1/package', packageRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  res.status(404).json({ success: false, message: 'NO PAGE FOUND', data: null, pagination: null  })
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = process.env.NODE_ENV === 'development' ? err.message: 'Some error occurred';
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(500).json({ success: false, message: res.locals.error, data: null, pagination: null  })
});

module.exports = app;
