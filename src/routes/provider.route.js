const express = require('express')
const validator = require('../middlewares/validator.middleware')
const providerRouter = express.Router()
const providerController = require('../controllers/provider.controller');
  
/**
 * Аll routes start with '/provider'
 **/


providerRouter.get('/', /*auth,*/ providerController.getProviders);

providerRouter.post('/', /*auth,*/  providerController.createProvider);



module.exports = providerRouter;
