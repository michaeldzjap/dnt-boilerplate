import { Request, Response } from 'express';

import newUser from '../rules/newUser';
import { validate, pullErrors } from '../lib/http/middleware/validateInput';

/**
 * Show the user registration page.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const index = (request: Request, response: Response): void => {
    response.render('auth/register', { errors: pullErrors(request) });
};

/**
 * Register a new user.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const store = [
    newUser,
    validate,
    (request: Request, response: Response): void => {
        console.log(request.body);

        response.send('User registered');
    },
];
