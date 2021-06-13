const User = require('../../models/user.model');

module.exports = async (req, res, next) => {
  // find existing email
  const existingUsername = await User.findOne({
    username: req.body.username,
  });

  // error handling
  if (existingUsername)
    return res
      .status(401)
      .json({ success: false, error: ['Username already exists'] });
  next();
};
