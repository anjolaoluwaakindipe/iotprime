const { check, validationResult } = require('express-validator');

// Validation Results
exports.projectCreationValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
  next();
};

// Validation Schema
exports.projectCreationValidator = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name of Project is required')
    .isLength({ min: 2, max: 24 })
    .withMessage('Name of Project must be 2 to 24 characters long!'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Description of Project must be 2 to 120 characters long!'),
  check('field1')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 1 must be at most 20 characters long!'),
  check('field2')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 2 must be at most 20 characters long!'),
  check('field3')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 3 must be at most 20 characters long!'),
  check('field4')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 4 must be at most 20 characters long!'),
  check('field5')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 5 must be at most 20 characters long!'),
  check('field6')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 6 must be at most 20 characters long!'),
  check('field7')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 7 must be at most 20 characters long!'),
  check('field8')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Field 8 must be at most 20 characters long!'),
];
