const db = require('../db/index');
const createSampleHome = require('../db/utils/generateSampleData');

const models = {
  Homes: {
    findSimilarHomes: (req, res) => {
      const hostID = req.params.host_id;
      const findHomeQuery = `SELECT * from "Homes" 
        WHERE city=(SELECT city from "Homes" where id=${hostID}) and 
          price between (SELECT price from "Homes" where id=${hostID})+1 and 
          (SELECT price from "Homes" where id=${hostID})+10 and 
          rating > 3 
        ORDER BY "reviewCount" DESC 
        LIMIT 12;`;
      db.query(findHomeQuery, { type: db.QueryTypes.SELECT })
        .then(homes => {
          res.status(200).send(homes)
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

module.exports.Homes = models.Homes;