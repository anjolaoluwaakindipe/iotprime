// installed libraries
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// models
const Users = require('../models/user.model');
const Project = require('../models/project.model');
const Data = require('../models/data.model');
const Log = require('../models/log.model');

// middleware
const hashPasswordMidd = require('../middleware/hashPasswordMidd');
const tokenVerificationMidd = require('../middleware/tokenVerificationMidd');
const emailCheckerVal = require('../middleware/validators/emailCheckerVal');
const usernameCheckerVal = require('../middleware/validators/usernameCheckerVal');
const {
  registrationValidator,
  registrationValidationResult,
} = require('../middleware/validators/registrationVal');
const {
  loginValidator,
  loginValidationResult,
} = require('../middleware/validators/loginVal');

// controllers
const { userRegisterController } = require('../controllers/user.controller');

// variables
const router = express.Router();

// routes
router.post(
  '/register',
  [
    emailCheckerVal,
    usernameCheckerVal,
    registrationValidator,
    registrationValidationResult,
    hashPasswordMidd,
  ],
  userRegisterController
);

router.post(
  '/login',
  [loginValidator, loginValidationResult],
  async (req, res) => {
    // variables
    const TOKEN_SECRET = process.env.LOGIN_TOKEN_SECRET;

    // request destructuring
    const { email, password } = req.body;

    // email validation
    const user = await Users.findOne({ email: email }).catch((err) =>
      console.log(err)
    );
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: 'Email or Password is incorrect' });
    }

    // password validation
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({
        success: false,
        message: 'Email or Password is incorrect',
      });

    // Create and send token
    const token = await jwt.sign({ _id: user._id }, TOKEN_SECRET, {});

    // response
    return res
      .header('Auth-Token', token)
      .status(200)
      .json({ success: true, message: 'Login succesful!' });
  }
);

// get info about user
router.get('/home', tokenVerificationMidd, async (req, res) => {
  // user id validation from middleware
  const user = await Users.findOne({ _id: req.userID._id }).catch((err) =>
    console.log(err)
  );

  // successful data response
  res.status(200).json({ success: true, data: user });
});

// check if username is already in use
router.get('/usernamecheck/:username', async (req, res) => {
  // check length of username
  if (req.params.username.length < 3 || req.params.username.length > 20) {
    return res.status(401).json({
      success: false,
      message: 'Username must be between 3 to 20 characters',
    });
  }

  // check if username already exists
  const existingUsername = await Users.findOne({
    username: req.params.username,
  }).catch((err) => console.log(err));
  if (existingUsername) {
    return res
      .status(401)
      .json({ success: false, message: 'Username already exists' });
  }
  return res
    .status(200)
    .json({ success: true, message: 'Username is available' });
});

// delete user
router.delete('/:userID', tokenVerificationMidd, async (req, res) => {
  await Users.deleteMany({ _id: req.params.userID });
  await Project.deleteMany({ userID: req.params.userID });
  await Data.deleteMany({ userID: req.params.userID });
  await Log.deleteMany({ userID: req.params.userID });
  return;
});

module.exports = router;
