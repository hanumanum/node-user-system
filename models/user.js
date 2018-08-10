const Sequelize = require("sequelize");
const db = require("./../configs/db.js");
const config = require("./../configs/config.js");
const bcrypt = require("bcrypt");
//const msgs = require("./../i18n/"+config.i18n);
const validation = require("./../i18n/en-en.js").validation;

var User = db.define('user', {
    username: {
        type: Sequelize.STRING
        , unique: true
        , validate: {
            len: {
                args: [2, 12],
                msg: validation.usernameTooLong
            },
            isAlphanumeric: {
                args: true,
                msg: validation.usernameNotAlphanumeric
            },
            isUnique: function (value, next) {
                var self = this;
                User.find({ where: { username: value } })
                    .then(function (user) {
                        // reject if a different user wants to use the same email
                        if (user && self.id !== user.id) {
                            return next('Username is already in use!');
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
                msg: validation.passwordTooShort
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { args: true, msg: validation.emailInvalid },
            isUnique: function (value, next) {
                var self = this;
                User.find({ where: { email: value } })
                    .then(function (user) {
                        // reject if a different user wants to use the same email
                        if (user && self.id !== user.id) {
                            return next(validation.emailExists);
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
        //TODO: clearify ???
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