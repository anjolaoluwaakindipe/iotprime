const { check, validationResult } = require('express-validator');

// Validation Results
exports.registrationValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    return res.status(400).json({ success: false, error: error });
  }
  next();
};

// Validation Schema
exports.registrationValidator = [
  check('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('UserName is required')
    .isAlphanumeric()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3 to 20 characters long!'),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a proper email!')
    .normalizeEmail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long!'),
  check('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First name is required!')
    .isAlphanumeric()
    .isLength({ min: 2, max: 30 })
    .withMessage('First name must be 2 to 30 characters long!'),
  check('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name is required!')
    .isAlphanumeric()
    .isLength({ min: 2, max: 30 })
    .withMessage('Last name must be 2 to 30 characters long!'),
];
