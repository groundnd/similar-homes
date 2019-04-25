const db = require('../db/index');

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
          const similarHomesQuery = `SELECT * from "Homes" where city='${city}' and price between ${minPrice} and ${maxPrice} and rating > 3 ORDER BY "reviewCount" DESC limit 12;`;
          
          db.query(similarHomesQuery, { type: db.QueryTypes.SELECT })
            .then(homes => {
              res.status(200).send(homes);
            })      
        })
        .catch(err => res.status(404).end(err));
    },
    createHome: (req, res) => {
      const hostID = req.params.host_id;

    },
    updateHome: (req, res) => {
      const hostID = req.params.host_id;
      const addReview = `UPDATE "Homes" SET "reviewCount" = "reviewCount" + 1 where id=${hostID};`;
      

    },
    deleteHome: (req, res) => {
      const hostID = req.params.host_id;
      const deleteHome = `DELETE FROM "Homes" where id=${hostID};`;
      if (hostID > 10000000) {
        db.query(deleteHome)
          .then((data) => {
            console.log(data);
            res.sendStatus(202);
          });
      }

    }
  }
};