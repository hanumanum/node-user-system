const Sequelize = require("sequelize");
const db = require("./../configs/db");
const config = require("./../configs/config");
const bcrypt = require("bcrypt");
//const validation = require("./../i18n/validation/"+config.i18n).validation;
const validationMsgs = require("./../i18n/validation/en-en").validation;

var User = db.define('user', {
    username: {
        type: Sequelize.STRING
        , unique: true
        , validate: {
            len: {
                args: [2, 12],
                msg: validationMsgs.usernameTooLong
            },
            isAlphanumeric: {
                args: true,
                msg: validationMsgs.usernameNotAlphanumeric
            },
            isUnique: function (value, next) {
                var self = this;
                User.find({ where: { username: value } })
                    .then(function (user) {
                        if (user && self.id !== user.id) {
                            return next(validationMsgs.usernameExists);
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [8, 20],
                msg: validationMsgs.passwordTooShort
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { args: true, msg: validationMsgs.emailInvalid },
            isUnique: function (value, next) {
                var self = this;
                User.find({ where: { email: value } })
                    .then(function (user) {
                        if (user && self.id !== user.id) {
                            return next(validationMsgs.emailExists);
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    }, 
    {
        instanceMethods: {
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    })


    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });
    
module.exports = User;