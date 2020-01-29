import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { html } from '../lib/controllers/validate';

/**
 * Show the user registration page.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const index = (request: Request, response: Response): void => {
    response.render('auth/register');
};

/**
 * Register a new user.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const store = (request: Request, response: Response): void => {
    html(request, response, 'auth/register');

    console.log(request.body);
    response.send();
};
