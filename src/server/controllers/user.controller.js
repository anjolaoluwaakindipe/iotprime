const Users = require('../models/user.model');

exports.userRegisterController = async (req, res) => {
  // request destructuring
  const { username, email, password, lastName, firstName } = req.body;

  try {
    // create new user
    const newUser = new Users({
      username,
      email,
      password,
      lastName,
      firstName,
    });

    // save new user
    await newUser
      .save()
      .then(() => {
        res.json({
          success: true,
          message: 'Your account has been created',
        });
      })
      .catch((err) => {
        res.status(201).json({
          success: false,
          message: err,
        });
      });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};
