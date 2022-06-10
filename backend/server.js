//https://www.bezkoder.com/node-js-angular-12-jwt-auth/
require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const requestMiddle = require('../backend/middleware/request.middleware');
const schemaMongo = require('./graphql/schema');
const resolver = require('./graphql/resolver');
const {schemaPostgres} = require('../backend/postgres/graphql/schemas/schama');
const DB_MONGO = require('../backend/config/db.config');
const corsOptions = require("./config/cors.config");
const {initDataMongo} = require("./helper/mongodb.helper");
const fileUpload = require("express-fileupload");
const Broker = require("./rabbitmq/rabbitMQ");
const {publishToExchange, saveImage} = require("./rabbitmq/utils/function");

// Connecting with mongo db
mongoose.connect(DB_MONGO.url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    initDataMongo();
  })
  .catch((err) => {
    console.error('Error connecting to Mongo', err)
  });

//declare API Routes
const authRoute = require('../backend/routes/auth.route');
const employeeRoute = require('../backend/routes/employee.route');
const userRoute = require('../backend/routes/user.route');
const userPostgresRoute = require('../backend/postgres/user.postgres.route');
const userPostgresRouterNew = require('./postgres/routes/user.postgres.route');
const {graphqlHTTP} = require("express-graphql");

const app = express();
app.use(fileUpload({}));
const RMQProducer = new Broker().init();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));

//register middlewares
app.use(requestMiddle.removeEmptyProperties());
app.use(requestMiddle.camelcase());

app.use(logger('dev'));
app.use(cors(corsOptions)); //cross domain
app.use(express.static(path.join(__dirname, '../dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, '../dist/mean-stack-crud-app')));

app.use(async (req, res, next) => {
  try {
    req.RMQProducer = await RMQProducer;
    next();
  } catch (error) {
    process.exit(1);
  }
});

// Route upload file use RabbitMQ
app.post("/upload", async (req, res) => {
  const {data} = req.files.image;
  try {
    const message = await saveImage(data)
    await publishToExchange(req.RMQProducer, {
      message, routingKey: "image",
    });
    res.status(200).send("File uploaded & created thumbnail successfuly!")
  } catch (error) {
    console.log(error)
    res.status(400).send(`File not uploaded!`)
  }
});

//register GraphQL
app.use("/graphql", graphqlHTTP({
  schema: schemaMongo, rootValue: resolver, graphiql: true,
}));
app.use('/graphqlPostgres', graphqlHTTP({
  schema: schemaPostgres, graphiql: true
}));

//Use API Routes
app.use('/api', employeeRoute);
app.use('/api/postgresnew/user', userPostgresRouterNew);
userRoute(app);
authRoute(app);
userPostgresRoute(app);
require('../backend/routes/board.route')(app);

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  console.error('Server error: ' + err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
});

// Create port
const port = process.env.API_PORT || 4000;
// Setting up port with expressjs
const server = app.listen(port, () => {
  console.log(`Connected to port ${port}`)
});

process.on("SIGINT", async () => {
  process.exit(1);
});
process.on("exit", (code) => {
  RMQProducer.channel.close();
  RMQProducer.connection.close();
});
