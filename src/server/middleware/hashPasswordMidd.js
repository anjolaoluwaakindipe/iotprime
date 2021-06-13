const bcrypt = require('bcrypt');

const hashPasswordMiddleware = async (req, res, next) => {
  const passwordSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);
  req.body.password = hashedPassword;
  next();
};

module.exports = hashPasswordMiddleware;
