const envPath = './config/env/' + process.env.NODE_ENV + '.env';
require('dotenv').config({path: envPath});

const server = require('./server.config'),
  mongo = require('./mongo.config'),
  error = require('./error.config')


module.exports = { 
  env: process.env.NODE_ENV,
  server,
  mongo,
  error,
};
