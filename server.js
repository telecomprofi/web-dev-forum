require('dotenv').load();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./app_server/models/db');
require('./app_server/config/passport');
const apiRoutesInit = require('./app_server/routes');

const app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/assets')));
app.use('/fonts/bootstrap', express.static('node_modules/bootstrap/dist/fonts'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use('/scripts', express.static('node_modules/jquery/dist'));

app.use(passport.initialize());

apiRoutesInit(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
