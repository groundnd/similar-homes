const express = require('express');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('./db/index.js');
const Home = require('./db/Home.js');

const app = express();
const port = process.env.PORT || 3004;


app.use('/accomdations/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/similarhomes/:host_id/nearby', (req, res) => {
  const hostID = req.params.host_id;
});

app.listen(port, () => console.log(`yassss port ${port} is live!!!`));
