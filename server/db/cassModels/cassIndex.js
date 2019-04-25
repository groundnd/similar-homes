const ExpressCassandra = require('express-cassandra');
const sample = require('../utils/dataPath');

let models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'SDC',
        queryOptions: {consistency: ExpressCassandra.consistencies.one}
    },
    ormOptions: {
        defaultReplicationStrategy : {
            class: 'SimpleStrategy',
            replication_factor: 1
        },
        migration: 'safe',
    }
});

let Homes = models.loadSchema('Homes', {
    fields:{
      id: "int",
      propertyAvail: "text",
      locationName: "text",
      photoUrl: "text",
      price: "int",
      rating: "decimal",
      reviewCount: "int",
      city: "text",
      createdAt: "timestamp",
      updatedAt: "timestamp",
    },
    key:[["city"],"price", "rating"],
    clustering_order: {
      "price": "asc",
      "rating": "desc",
    },
    indexes: ["id"]
});

console.log(models.instance.Homes === Homes);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
Homes.syncDB(function(err, result) {
  if (err) throw err;
  models.close(err => {
    if(err) throw err;
    console.log('connection closed');
  });
});
