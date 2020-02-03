import { check } from 'express-validator';

export default [
    check('name')
        .isString()
        .withMessage('The name must be a string.')
        .isLength({ min: 2, max: 255 })
        .withMessage('The name must be between 2 and 255.'),
    check('email')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('The email may not be greater than 255.')
        .isEmail()
        .withMessage('The email must be a valid email address.'),
    check('password')
        .isString()
        .withMessage('The password must be a string.')
        .isLength({ min: 8 })
        .withMessage('The password must be at least 8.'),
];
