const Joi = require("joi")
const User = require("../../models/user")
const errorTransformer = require("../../utils/JoiErrorTransformer");

module.exports = {
     signup : {
        validateFileds:function(req,res,next){
            Joi.validate(
                {
                    query:req.body
                },
                {
                    query:{
                        email: Joi.string()
                                    .trim()
                                    .lowercase()
                                    .empty()
                                    .email({ minDomainAtoms: 2 })
                                    .required(),
                        password: Joi
                                    .string()
                                    .empty()
                                    .regex(/^[a-zA-Z0-9]{3,30}$/)
                                    .required(),
                        username: Joi.string()
                                      .empty()
                                      .trim()
                                      .lowercase()
                                      .alphanum()
                                      .min(3)
                                      .max(30)
                                      .required(),
                    }
                },
                {
                    abortEarly:false
                 }, 
                 function(err){
                    if(err){
                        const errMsg = errorTransformer(err)
                        req.flash('signupMessageError', errMsg)
                        req.flash('formData', req.body)
                    }
                }
            )    
            next()
        },
        uniqueData:function(req, res, next){
            User.usernaemOrEmail(req.body.username, req.body.email)
                .then(function(user){
                    if(user){
                        if(user.username == req.body.username){
                            req.flash('signupMessageError', {"username":["username already exists"]})
                        }
                        if(user.email == req.body.email){
                            req.flash('signupMessageError', {"email":["email already exists"]})
                        }
                    }
                    req.flash("formData", req.body);
                    next();
                }).catch(function(err){
                    next(err);
                })
            
        }
    },
    signin:{
        validateFileds:function(req, res, next){
            Joi.validate(
                {
                    query:req.body
                },
                {
                    query:{
                        password: Joi
                                    .string()
                                    .empty()
                                    .required(),
                        email: Joi.string()
                                      .empty()
                                      .trim()
                                      .lowercase()
                                      .required(),
                    }
                },
                {
                    abortEarly:false
                 }, 
                 function(err){
                    if(err){
                        const errMsg = errorTransformer(err)
                        req.flash('siginMessageError', errMsg)
                        req.flash('formData', req.body)
                        
                    }
                }
            )    
            next()
        }
    }
 }