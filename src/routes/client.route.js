const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/client.controller");

/**
 * Аll routes start with '/client'
 **/

clientRouter.get("/", clientController.getClients);

clientRouter.post("/", clientController.create);

clientRouter.put("/:id", clientController.update);

clientRouter.delete("/:id", clientController.delete);

module.exports = clientRouter;
