const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const db = require('./db/index.js');
const Home = require('./db/Home.js');
const models = require('./models/models');

const app = express();
const port = process.env.PORT || 3004;

app.use(bodyparser.json());
app.use(morgan('dev'));
app.use('/homes/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/homes/:host_id/nearby', models.Homes.findSimilarHomes);

// app.post('/homes/:host_id/nearby', (req, res) =>

// app.put('/homes/:host_id/nearby', (req, res) =>

// app.delete('/homes/:host_id/nearby', (req, res) =>

app.listen(port, () => console.log(`yassss port ${port} is live!!!`));
