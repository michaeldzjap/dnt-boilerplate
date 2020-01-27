import { Request, Response } from 'express';

/**
 * Show the welcome page.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const index = (request: Request, response: Response): void => {
    response.render('welcome');
};
