const Sequelize = require("sequelize");
const db = require("./../configs/db");

const env = process.env.NODE_ENV || "development";
//const env = require('dotenv').load().parsed.NODE_ENV;
const config = require('../configs/config.json')[env];
const bcrypt = require("bcrypt");
const validationMsgs = require("./../i18n/validation/"+config.i18n).validation;

var User = db.define('user', {
    username: {
        type: Sequelize.STRING, 
        unique: true
        
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    firstname: {
        type:Sequelize.STRING
    },
    lastname: {
        type:Sequelize.STRING
    },
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