// installed package imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// mongodb models
const Project = require('./models/project.model');
const Data = require('./models/data.model');
const User = require('./models/user.model');
const Log = require('./models/log.model');

// file imports
const indexRouter = require('./routes/index.route');
const { activateMongoServer } = require('./mongoServer');

// variables
const app = express();
const PORT = process.env.PORT || process.env.NODE_PORT;
const NODE_ENV = process.env.NODE_ENV;
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  branding: {
    comapanyName: 'Prime',
    softwareBrothers: false,
  },
  databases: [mongoose],
  rootPath: '/admin',
  resources: [
    Project,
    Data,
    Log,
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      console.log(user);
      if (matched) {
        if (user.role === 'admin') {
          return user;
        }
      }
    }
    return false;
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

// http and socket.io handlers
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

// middleware
app.use(adminBro.options.rootPath, router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: 'Auth-Token' }));
app.set('socketio', io);

// start database connection
activateMongoServer();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../../build')));

// routes
app.use('/anj', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../build/index.html'));
});

// middleware for url not found error handling
app.use((req, res) => {
  res.status(404).json({ message: 'URL not found' });
});

io.on('connection', (socket) => {
  console.log('User connected:' + socket.id);
});

// environment handling
if (NODE_ENV === 'production') {
  console.log('production');
  server.listen(PORT);
}
if (NODE_ENV === 'development') {
  console.log('development');
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
