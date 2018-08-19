const Sequelize = require("sequelize")
const db = require("./../configs/db")
const Op = Sequelize.Op

const env = process.env.NODE_ENV || "development";
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
        })
        .catch(function(err) {
            throw new Error();
        });
});

module.exports = User;