var createError = require('http-errors');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserShema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    name : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    }
})
// authenticate input against database documents
UserShema.statics.authenticate = function(email,password,callback){
    User.findOne({email:email}).exec(function (error,user){
        if(error){
            return callback(error);
        } else if(!user){
            return callback(createError(404,'User not found'));
        }
        bcrypt.compare(password,user.password, function(error,result){
            if(error){
                return callback(error);
            }
            
            if(result === true){
                return callback(null,user);
            }else{
                return callback();
            }
        })
        
    })
}
// hash password before saving to database
UserShema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password,10,function(err,hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
})
var User = mongoose.model('User',UserShema);

module.exports = User;