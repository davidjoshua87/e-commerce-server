require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan')

const index = require('./routes/index');
const users = require('./routes/users');
const items = require('./routes/items');
const categories = require('./routes/categories');

var app = express();

const dbUrl = 'mongodb://toko:123@ds123500.mlab.com:23500/toko';

mongoose.connect(dbUrl, (err) => {
  if(!err) {console.log('Connected to Database');}
  else {throw new Error(err);}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', index);
app.use('/users', users);
app.use('/items', items);
app.use('/categories', categories);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
