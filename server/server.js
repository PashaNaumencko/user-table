const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./api/routes/index');

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

const port = 3000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});

module.exports = app;
