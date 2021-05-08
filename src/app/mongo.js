

const mongoose = require('mongoose');


module.exports = mongoConfig => {
  return mongoose.connect(
          mongoConfig.connection.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true   
    });
};
