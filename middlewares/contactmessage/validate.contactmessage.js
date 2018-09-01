const Joi = require("joi")
const errorTransformer = require("../../utils/JoiErrorTransformer");

module.exports = {
    validateFileds: function (req, res, next) {
        Joi.validate(
            {
                query: req.body
            },
            {
                query: {
                    email: Joi.string()
                        .trim()
                        .lowercase()
                        .empty()
                        .email({ minDomainAtoms: 2 })
                        .required(),
                    contactmessage: Joi.string()
                        .trim()
                        .empty()
                        .required(),
                    topic: Joi.string().trim()
                }
            },
            {
                abortEarly: false
            },
            function (err) {
                if (err) {
                    const errMsg = errorTransformer(err)
                    res.render('contact', {
                        valid: false,
                        validation: errMsg,
                        formData: req.body
                    })
                } else {
                    next();
                }
            }
        )

    },

}