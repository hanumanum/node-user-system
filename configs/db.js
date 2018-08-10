const Sequelize = require('sequelize');
const config = require('./config.js');

module.exports = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});