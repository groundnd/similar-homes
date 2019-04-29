const Sequelize = require('sequelize');
const db = require('./index.js');
const data = require('./utils/dataPath.js');

const Home = db.define('Home', {
  propertyAvail: Sequelize.STRING,
  locationName: Sequelize.STRING,
  photoUrl: Sequelize.STRING,
  price: Sequelize.INTEGER,
  rating: Sequelize.DECIMAL,
  reviewCount: Sequelize.INTEGER,
  city: Sequelize.STRING,
}, 
{
  timestamps: false,
}
);

db.sync({ force: true })
  .then(() => db.query(`COPY "Homes" ("id","city","locationName","photoUrl","price","propertyAvail","rating","reviewCount") FROM '${data.path}' (DELIMITER(','));`)
    .then(() =>
      db.query(`SELECT setval('"Homes_id_seq"', max(id)) FROM "Homes";`)
        .then(() => {
          console.log('done');
        }) 
    )
  );
