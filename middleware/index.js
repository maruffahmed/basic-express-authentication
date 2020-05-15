var createError = require('http-errors');
function loggedOut(req,res,next){
    if(req.session && req.session.userId){
        return res.redirect('/profile');
    }
    return next();
}
function requiredLogin(req,res,next){
    if(req.session && req.session.userId){
        next()
    }else{
        return next(createError(403,'You are not authorized to view this page.'));
    }
}
module.exports.loggedOut = loggedOut;
module.exports.requiredLogin = requiredLogin;