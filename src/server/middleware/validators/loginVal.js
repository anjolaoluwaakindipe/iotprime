const { check, validationResult } = require('express-validator');

// Validation Results
exports.loginValidationResult = (req, res, next) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.json({ success: false, error: error });
  }
  next();
};

// Validation schema
exports.loginValidator = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a proper email!')
    .normalizeEmail(),
  check('password').trim().not().isEmpty().withMessage('Password is required'),
];
