const ExpressCassandra = require('express-cassandra');
let models = ExpressCassandra.createClient({
    clientOptions: {
        contactPoints: ['127.0.0.1'],
        protocolOptions: { port: 9042 },
        keyspace: 'mykeyspace',
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

let Homes = models.loadSchema('Home', {
    fields:{
      id: "int",
      propertyAvail: "text",
      locationName: "text",
      photoUrl: "text",
      price: "int",
      rating: "decimal",
      reviewCount: "int",
      city: "text",
    },
    key:["id"]
});

console.log(models.instance.Person === Homes);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
Homes.syncDB(function(err, result) {
    if (err) throw err;
    // result == true if any database schema was updated
    // result == false if no schema change was detected in your models
});