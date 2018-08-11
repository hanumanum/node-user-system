const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require('./config.json')[env];

module.exports = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});