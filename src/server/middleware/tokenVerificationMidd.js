const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const TOKEN_SECRET = process.env.LOGIN_TOKEN_SECRET;

const tokenVerification = async (req, res, next) => {
  const token = req.header('Auth-Token');

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: 'Access Denied Please Log In' });
  }
  try {
    const verified = await jwt.verify(token, TOKEN_SECRET);
    req.userID = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
};

module.exports = tokenVerification;
