const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const activateMongoServer = async () => {
  let DB_URL;
  if (process.env.NODE_ENV === 'development') {
    DB_URL = process.env.DB_URL_DEVELOPMENT;
  }
  if (process.env.NODE_ENV === 'production') {
    DB_URL = process.env.DB_URL_PRODUCTION;
  }

  mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('connected to a mongodb server');
    }
  );

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });
};

module.exports = activateMongoServer;
