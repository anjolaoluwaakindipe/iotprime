const mongoose = require('mongoose');

let DB_URL;

const activateMongoServer = async () => {
  if (process.env.NODE_ENV === 'development') {
    DB_URL = process.env.DB_URL_DEVELOPMENT;
  } else {
    DB_URL = process.env.DB_URL_PRODDUCTION;
  }
  try {
    await mongoose.connect(
      DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log('connected to a mongodb server');
      }
    );
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });
};

module.exports = {
  activateMongoServer,
};
