const Sequelize = require("sequelize");
const db = require("./../configs/db");

const env = process.env.NODE_ENV || "development";
//const env = require('dotenv').load().parsed.NODE_ENV;
const config = require('../configs/config.json')[env];
const bcrypt = require("bcrypt");
const validationMsgs = require("./../i18n/validation/"+config.i18n).validation;

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
    lastlogin: {
        type: Sequelize.DATE
    },

    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
        }
    },
    {
        instanceMethods: {
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
})


User.beforeCreate(function(user, options) {
    return bcrypt.hash(user.password, 10)
        .then(function(hash) {
            user.password = hash;
        })
        .catch(function(err) {
            throw new Error();
        });
});

module.exports = User;