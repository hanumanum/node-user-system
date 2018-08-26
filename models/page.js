const Sequelize = require("sequelize")
const db = require("./../configs/db")
/*
const env = process.env.NODE_ENV || "development";
const config = require('../configs/config.json')[env];
*/

let Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique:true
    },
    text: {
        type: Sequelize.TEXT,
    },
    published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    authorId:{
        type: Sequelize.INTEGER
     }
    }
)

module.exports = Page;