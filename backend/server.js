const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const omitEmpty = require('omit-empty');
const camelcaseKeys = require('camelcase-keys');
const DB_MONGO = require('../backend/config/db.config');

const corsOptions = {
  origin: ['http://localhost:4200'],
};
const removeEmptyProperties = () => {
  return function (req, res, next) {
    req.body = omitEmpty(req.body);
    req.params = omitEmpty(req.params);
    req.query = omitEmpty(req.query);
    next()
  }
};
const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, {deep: true});
    req.params = camelcaseKeys(req.params);
    req.query = camelcaseKeys(req.query);
    next()
  }
};

// Connecting with mongo db
mongoose
  .connect(DB_MONGO.url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to Mongo', err.reason)
  });

const employeeRoute = require('../backend/routes/employee.route');
const userRoute = require('../backend/routes/user.route');

const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(removeEmptyProperties());
app.use(camelcase());
app.use(logger('dev'));
app.use(cors(corsOptions));//cross domain
app.use(express.static(path.join(__dirname, '../dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, '../dist/mean-stack-crud-app')));

app.use('/api', employeeRoute);
userRoute(app);

// Create port
const port = process.env.API_PORT || 4000;
// Setting up port with expressjs
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
});
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);// Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
});
