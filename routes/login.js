var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware/index');

/* GET login page. */
router.get('/',mid.loggedOut, function(req, res, next) {
  res.render('login', { title: 'Log In'});
});

/* POST login page. */
router.post('/', function(req, res, next) {
  
    if(
        req.body.email &&
        req.body.pass
    ){
        User.authenticate(req.body.email, req.body.pass, function(error, user){
            if(error || !user){
                return next(createError(401,'Wrong email or password!!'));
            }else{
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    }else{
        return next(createError(401,'Email and password are required'));
    }
});

module.exports = router;
