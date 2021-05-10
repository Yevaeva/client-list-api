'use strict';

Promise = require('bluebird');
const  express = require('express');
const  helmet = require('helmet');
const  compress = require('compression');
const  cors = require('cors');
const  logger = require('morgan');
const  body_parser = require('body-parser');
const  error_handler = require('errorhandler');
const  path = require('path');

// Initialize express app
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument) 
);

app.is_running = Promise.pending();
app.db_connect = require('./mongo');

app.get('/downloads/:filename', (req, res)=>{
  const filePath = path.join(__dirname, '../../public/downloads/'+req.params.filename);
  res.download(filePath);
});


app.use(body_parser.json({limit: '10mb'}));
app.use(body_parser.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('public'));


app.use(compress()); 

// Showing stack errors
app.set('showStackError', true);


app.use(helmet());

app.use((err, req, res, next) => {
  if (err.name === 'StatusError') res.send(err.status, err.message);
  else next(err); 
});

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin',  '*');
  // Request methods you wish to allow 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Last-Modified', (new Date()).toUTCString()); 

  // Pass to next layer of middleware
  next();
});


  app.use(error_handler())


app.enable('case sensitive routing');
app.enable('strict routing');

require('./routes')(app);

// Handle errors
require('./error-handler')(app);

module.exports = app;
