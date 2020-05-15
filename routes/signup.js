var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware/index');

/* GET signup page. */
router.get('/',mid.loggedOut, function(req, res, next) {
    res.render('signup', { title: 'Signup'});
});

/* POST signup page. */
router.post('/', function(req, res, next) {
    if(
        req.body.email &&
        req.body.name &&
        req.body.pass &&
        req.body.confirm_pass
    ){
        // check the confirm password
        if(req.body.pass !== req.body.confirm_pass){
            return next(createError(400,'Password do not match.'));
        }
        // create object with form data
        var userData = {
            email : req.body.email,
            name : req.body.name,
            password : req.body.pass
        };

        // use schema's 'create' method to inser document into mongo
        User.create(userData, (err,user) => {
            if(err){
                return next(err);
            }
            req.session.userId = user._id;
            res.redirect('/profile');
        })
    }else{
        next(createError(400));
    }
});

module.exports = router;
