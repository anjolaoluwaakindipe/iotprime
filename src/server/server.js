// installed package imports
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// file imports
const indexRouter = require('./routes/index.route');
const { activateMongoServer } = require('./mongoServer');

// variables
const app = express();
const PORT = process.env.NODE_PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: 'Auth-Token' }));

// database connection
activateMongoServer();

// routes
app.use('/anj', indexRouter);

// middleware for url not found error handling
app.use((req, res) => {
  res.status(404).json({ message: 'URL not found' });
});

// http and socket.io handlers
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});

io.on('connection', (socket) => {});

// environment handling
if (NODE_ENV === 'production') {
  console.log('production');
  server.listen(PORT);
}
if (NODE_ENV === 'development') {
  console.log('development');
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
