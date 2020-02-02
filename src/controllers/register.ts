import { Request, Response } from 'express';

// import { html } from '../lib/controllers/validate';
import { expectsJson } from '../lib/http/helpers';

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
    // html(request, response);

    console.log(expectsJson(request));
    // console.log(request.body);
    response.json('Hey now!');
};
