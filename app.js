var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

var app = express();


//mongoose connection
mongoose.connect('mongodb://localhost:27017/userauth')
var db = mongoose.connection;

// mongo error
db.on('error',console.log.bind(console,"connection error:"));


// use session for tracking logins
app.use(session({
  secret : 'Hello world',
  resave : true,
  saveUninitialized : false,
  store: new MongoStore({
    mongooseConnection : db
  })
}));

// make user ID available in templates
app.use(function(req,res,next){
  res.locals.currentUser = req.session.userId;
  res.locals.username = req.session.username;
  next();
})

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var logoutRouter = require('./routes/logout');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/profile/:name', profileRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:err.message});
});

module.exports = app;
