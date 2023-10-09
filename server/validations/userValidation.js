const { body } = require('express-validator');
const { User, Address } = require('../models/_relation');

/* USER VARIABLES VALIDATION */
// create user
const validateCreateUser = [
    body('userName').isString().withMessage('User Name must be a string')
        .notEmpty().withMessage('User Name is required')
        .isLength({ min: 3, max: 50 }).withMessage('User Name must be between 3 and 50 characters'),

    body('nickname').isString().withMessage('Nickname must be a string')
        .notEmpty().withMessage('Nickname is required')
        .isLength({ min: 8, max: 50 }).withMessage('Nickname must be between 8 and 50 characters')
        .custom(async (value) => {
            const user = await User.findOne({ where: { nickname: value } });
            if (user) {
                return Promise.reject('Nickname already registered');
            }
        }),

    body('email').isEmail().withMessage('Email must be a valid email')
        .notEmpty().withMessage('Email is required')
        .isLength({ min: 5, max: 50 }).withMessage('Email must be between 5 and 50 characters')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject('Email already registered');
            }
        }),

    body('phone').isString().withMessage('Phone must be a string')
        .notEmpty().withMessage('Phone is required')
        .isLength({ min: 11, max: 25 }).withMessage('Phone must be between 11 and 25 characters'),

    body('userPassword').isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters'),
]

// update user(optional fields)
const validateUpdateUser = [
    body('userName').isString().withMessage('User Name must be a string')
        .optional().isLength({ min: 3, max: 50 }).withMessage('User Name must be between 3 and 50 characters'),

    body('nickname').isString().withMessage('Nickname must be a string')
        .optional().isLength({ min: 8, max: 50 }).withMessage('Nickname must be between 8 and 50 characters')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { nickname: value } });
            if (user && user.id !== req.params.id) {
                return Promise.reject('Nickname already registered');
            }
        }),

    body('email').isEmail().withMessage('Email must be a valid email')
        .optional().isLength({ min: 5, max: 50 }).withMessage('Email must be between 5 and 50 characters')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value } });
            if (user && user.id !== req.params.id) {
                return Promise.reject('Email already registered');
            }
        }),

    body('phone').isString().withMessage('Phone must be a string')
        .optional().isLength({ min: 11, max: 25 }).withMessage('Phone must be between 11 and 25 characters'),

    body('userPassword').isString().withMessage('Password must be a string')
        .optional().isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters'),

    body('address_id').optional().isInt().withMessage('Address ID must be an integer')
        .custom(async (value) => {
            const address = await Address.findByPk(value);
            if (!address) {
                return Promise.reject('Address not found');
            }
        }),
]

module.exports = {
    validateCreateUser,
    validateUpdateUser,
}