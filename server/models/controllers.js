const db = require('../db/index');
const createSampleHome = require('../db/utils/generateSampleData');

module.exports = {
  Homes: {
    findSimilarHomes: (req, res) => {
      const hostID = req.params.host_id;
      const findHomeQuery = `SELECT * from "Homes" where id=${hostID}`;
      db.query(findHomeQuery, { type: db.QueryTypes.SELECT })
        .then(results => {
          const home = results[0];
          const city = home.city;
          const minPrice = home.price + 1;
          const maxPrice = minPrice + 10;
          const similarHomesQuery = `SELECT * from "Homes" 
            WHERE city='${city}' and price between ${minPrice} and ${maxPrice} and rating > 3 
            ORDER BY "reviewCount" DESC 
            LIMIT 12;`;
          db.query(similarHomesQuery, { type: db.QueryTypes.SELECT })
            .then(homes => {
              res.status(200).send(homes);
            })      
        })
        .catch(err => res.status(404).end(err));
    },
    createHome: (req, res) => {
      const home = createSampleHome();
      const insertHome = `INSERT INTO "Homes" ("propertyAvail","locationName","photoUrl",price,rating,"reviewCount",city)
        VALUES ('${home.propertyAvail}','${home.locationName}','${home.photoUrl}',${home.price},${home.rating},${home.reviewCount},'${home.city}');`;
      db.query(insertHome)
        .then(result => {
          res.sendStatus(202);
        });

    },
    updateReview: (req, res) => {
      const hostID = req.params.host_id;
      const addReview = `UPDATE "Homes" SET "reviewCount" = "reviewCount" + 1 where id=${hostID};`;
      db.query(addReview)
        .then((data) => {
          res.sendStatus(200);
        });
    },
    deleteHome: (req, res) => {
      const hostID = req.params.host_id;
      const deleteHome = `DELETE FROM "Homes" where id=${hostID};`;
      if (hostID > 10000000) {
        db.query(deleteHome)
          .then(() => {
            res.sendStatus(202);
          });
      }

    }
  }
};