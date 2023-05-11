const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validateAnswerInput = [
  check('text')
    .exists({ checkFalsy: true })
    .isLength({ min: 5})
    .withMessage('An answer should be at least 5 characters'),
  handleValidationErrors
];

module.exports = validateAnswerInput;