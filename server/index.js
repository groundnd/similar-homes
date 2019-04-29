require('newrelic');
const compression = require('compression');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const redis = require('redis');
// const morgan = require('morgan');
const models = require('./models/controllers');
const app = express();
const port = process.env.PORT || 3004;
const client = redis.createClient(6379);
const redisTTL = 1800;

client.on('error', (err) => {
  console.log("Error " + err)
});

app.use(bodyparser.json());
// app.use(morgan('dev'));
// app.use(compression());
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/homes/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/homes/:host_id/nearby', (req, res) => {
  const hostID = req.params.host_id;
  const hostRedisKey = `relatedHomesForHost:${hostID}`;
  return client.hgetall(hostRedisKey, (err, cachedHomes) => {
    if (cachedHomes) {
      const relatedHomes = JSON.parse(cachedHomes[redisTTL]);
      console.log('retrieved from cache');
      res.send(relatedHomes);
    } else {
      return models.Homes.findSimilarHomes(hostID, (homes) => {
        client.hsetnx(hostRedisKey, redisTTL, JSON.stringify(homes));
        console.log('added to cache');
        res.status(200).send(homes);
      });
    }
  });
}); 

app.post('/homes', models.Homes.createHome);

app.put('/homes/:host_id', models.Homes.updateReview);

app.delete('/homes/:host_id', models.Homes.deleteHome);

app.listen(port, () => console.log(`yassss port ${port} is live!!! Worker ${process.pid} started`));

module.exports = client;
