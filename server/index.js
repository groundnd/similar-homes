require('newrelic');
const compression = require('compression');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
// const morgan = require('morgan');
const models = require('./models/controllers');
const app = express();
const port = process.env.PORT || 3004;

app.use(bodyparser.json());
// app.use(morgan('dev'));
// app.use(compression());
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/homes/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/homes/:host_id/nearby', models.Homes.findSimilarHomes);

app.post('/homes', models.Homes.createHome);

app.put('/homes/:host_id', models.Homes.updateReview);

app.delete('/homes/:host_id', models.Homes.deleteHome);

app.listen(port, () => console.log(`yassss port ${port} is live!!! Worker ${process.pid} started`));

