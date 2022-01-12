module.exports = (app) => {
  app.use("/", require("../routes/index.route"));
  app.use("/client", require("../routes/client.route"));
  app.use("/provider", require("../routes/provider.route"));
};
