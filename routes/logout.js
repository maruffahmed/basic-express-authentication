var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session){
      // delete session object
      req.session.destroy(function(err){
          if(err){
              return next(err);
          }else{
              return res.redirect('/');
          }
      })
  }
});

module.exports = router;
