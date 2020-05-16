var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware/index');

/* GET users listing. */
router.get('/',mid.requiredLogin, function(req, res, next) {
  User.findById(req.session.userId).exec(function(error,user){
    if(error){
      return next(error);
    }else{
      res.render('profile',{name:user.name,email:user.email,username:user.username})
    }
  })
});

module.exports = router;
