const { body } = require('express-validator');

/* ADDRESS VARIABLES VALIDATION */
// create address
const validateCreateAddress = [
    body('street')
        .isString().withMessage('Street must be a string')
        .notEmpty().withMessage('Street is required')
        .isLength({ min: 2, max: 50 }).withMessage('Street must be between 2 and 50 characters'),

    body('number')
        .isInt().withMessage('Number must be an integer')
        .notEmpty().withMessage('Number is required')
        .isLength({ min: 1, max: 10 }).withMessage('Number must be between 1 and 10 characters'),

    body('complement')
        .isString().withMessage('Complement must be a string')
        .notEmpty().withMessage('Complement is required')
        .isLength({ min: 2, max: 100 }).withMessage('Complement must be between 2 and 100 characters'),

    body('city')
        .isString().withMessage('City must be a string')
        .notEmpty().withMessage('City is required')
        .isLength({ min: 2, max: 25 }).withMessage('City must be between 2 and 25 characters'),

    body('state')
    .isString().withMessage('State must be a string')
    .notEmpty().withMessage('State is required')
    .isLength({ min: 2, max: 25 }).withMessage('State must be between 2 and 25 characters'),
        
    body('cep')
        .isString().withMessage('CEP must be a string')
        .notEmpty().withMessage('CEP is required')
        .isLength({ min: 8, max: 9 }).withMessage('CEP must be between 8 and 9 characters'),
];

// update address (optional fields)
const validateUpdateAddress = [
    body('street')
        .optional()
        .isString().withMessage('Street must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Street must be between 2 and 50 characters'),

    body('number')
        .optional()
        .isInt().withMessage('Number must be an integer')
        .isLength({ min: 1, max: 10 }).withMessage('Number must be between 1 and 10 characters'),

    body('complement')
        .optional()
        .isString().withMessage('Complement must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Complement must be between 2 and 100 characters'),

    body('city')
        .optional()
        .isString().withMessage('City must be a string')
        .isLength({ min: 2, max: 25 }).withMessage('City must be between 2 and 25 characters'),

    body('state')
        .optional()
        .isString().withMessage('State must be a string')
        .isLength({ min: 2, max: 25 }).withMessage('State must be between 2 and 25 characters'),

    // missing brazilian cep validation
    body('cep')
        .optional()
        .isString().withMessage('CEP must be a string')
        .isLength({ min: 8, max: 9 }).withMessage('CEP must be between 8 and 9 characters'),
];

module.exports = {
    validateCreateAddress,
    validateUpdateAddress,
};
