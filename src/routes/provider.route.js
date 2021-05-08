const express = require('express');
const providerRouter = express.Router();
const providerController = require('../controllers/provider.controller');
  
/**
 * Аll routes start with '/provider'
 **/


providerRouter.get('/', providerController.getProviders);

providerRouter.post('/', providerController.createProvider);

providerRouter.put('/:id',   providerController.updateProvider);

providerRouter.delete('/:id', providerController.deleteProvider);



module.exports = providerRouter;
