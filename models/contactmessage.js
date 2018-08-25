const Sequelize = require("sequelize")
const db = require("./../configs/db")
/*
const env = process.env.NODE_ENV || "development";
const config = require('../configs/config.json')[env];
*/

let ContactMessage = db.define('contactmessage', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    topic: {
        type: Sequelize.STRING, 
        
    },
    text: {
        type: Sequelize.TEXT,
    },
    readstatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    }
)

module.exports = ContactMessage;