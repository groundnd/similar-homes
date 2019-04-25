const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const db = require('./db/index.js');
const Home = require('./db/Home.js');

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyparser.json());
app.use(morgan('dev'));
app.use('/homes/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/homes/:host_id/nearby', (req, res) => {
  const hostID = req.params.host_id;
  const findHomeQuery = `SELECT * from "Homes" where id=${hostID}`;
  db.query(findHomeQuery, { type: db.QueryTypes.SELECT })
    .then(results => {
      const home = results[0];
      const city = home.city;
      const minPrice = home.price + 1;
      const maxPrice = minPrice + 10;
      const similarHomesQuery = `SELECT * from "Homes" where city='${city}' and price between ${minPrice} and ${maxPrice} and rating > 3 ORDER BY "reviewCount" DESC limit 12;`;
      db.query(similarHomesQuery, { type: db.QueryTypes.SELECT })
        .then(homes => {
          res.status(200).send(homes);
        })      
    })
    .catch(err => res.status(404).end(err));
});

app.listen(port, () => console.log(`yassss port ${port} is live!!!`));
