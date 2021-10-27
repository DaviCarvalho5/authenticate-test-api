const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database/index.js');

const routes = require('./routes.js')

const app = express();
const port = process.env.API_PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);

  app.use(cors());
  next();
})

app.use(express.urlencoded());
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`>>> API is listening on port ${port}`);
});