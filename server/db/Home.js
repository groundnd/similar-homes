const Sequelize = require('sequelize');
const db = require('./index.js');


const Home = db.define('Home', {
  propertyAvail: Sequelize.STRING,
  city: Sequelize.STRING,
  locationName: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.DECIMAL,
  reviewCount: Sequelize.INTEGER,
});

module.exports = Home;
