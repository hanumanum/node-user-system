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
            next();
        }
    },
    signin:{
        check:function(req, res, next){
            next();
        }
    }
}