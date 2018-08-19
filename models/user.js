const Sequelize = require("sequelize")
const db = require("./../configs/db")
const Op = Sequelize.Op

const env = process.env.NODE_ENV || "development";
const config = require('../configs/config.json')[env];
const bcrypt = require("bcrypt");
const validationMsgs = require("./../i18n/validation/"+config.i18n).validation;

let User = db.define('user', {
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
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verify_token:{
        type:Sequelize.STRING
    }    
    }
)

User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

User.usernaemOrEmail = function(username,email){
    console.log(username, email)
    return User.findOne({where: { [Op.or]: [{username: username  },{email:email}] }});
}


User.beforeCreate(function(user, options) {
    return bcrypt.hash(user.password, 10)
        .then(function(hash) {
            user.password = hash;
            user.verify_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            console.log(user.verify_token) 
        })
        .catch(function(err) {
            throw new Error();
        });
});

module.exports = User;