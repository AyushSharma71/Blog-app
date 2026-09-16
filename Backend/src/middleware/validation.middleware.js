import { body, validationResult } from 'express-validator';

function validateResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const userValidation = [
    body('fullname')
        .notEmpty().withMessage('Full name is required')
        .isString().withMessage('Full name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),

    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 128 }).withMessage('Password must be between 8 and 128 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/).withMessage('Password must contain at least one letter and one number'),

    validateResult,
];

export default userValidation;

