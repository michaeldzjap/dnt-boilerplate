import { check } from 'express-validator';

export default (): Function[] => {
    return [
        check('name')
            .isString()
            .isLength({ min: 2, max: 255 }),
        check('email')
            .normalizeEmail()
            .isLength({ max: 255 })
            .isEmail(),
        check('password')
            .isString()
            .isLength({ min: 8 }),
    ];
};
