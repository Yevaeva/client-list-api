const express = require('express')
const validator = require('../middlewares/validator.middleware')
const clientRouter = express.Router()
const clientController = require('../controllers/client.controller');
  
/**
 * Аll routes start with '/client'
 **/


clientRouter.get('/', /*auth,*/ clientController.getClients);

clientRouter.post('/', /*auth,*/  clientController.create);



module.exports = clientRouter;
