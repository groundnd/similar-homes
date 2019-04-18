const Sequelize = require('sequelize');
const config = process.env.MYSQL_ROOT_PW || require('../../config/db-config');

const dbName = 'SDC';

const db = new Sequelize(dbName, config.userName, config.password, {
  host: process.env.MYSQL_URL || 'localhost',
  dialect: 'postgres',
  logging: false,
});

db
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to database: ', err));


module.exports = db;
