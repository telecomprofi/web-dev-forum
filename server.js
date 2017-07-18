const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./app_server/models/db');
const apiRoutesInit = require('./app_server/routes');

const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/assets')));

apiRoutesInit(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});