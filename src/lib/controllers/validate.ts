import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HTTP_UNPROCESSABLE_ENTITY } from '../../constants/http';

/**
 * Check if there are any validation errors and return HTML response.
 *
 * @param {Request} request
 * @param {Response} response
 * @param {string} view
 * @returns {void}
 */
export const html = (request: Request, response: Response, view: string): void => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(HTTP_UNPROCESSABLE_ENTITY);
        response.render(view, { errors: errors.array() });
    }
};

/**
 * Check if there are any validation errors and return JSON response.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const json = (request: Request, response: Response): void => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(HTTP_UNPROCESSABLE_ENTITY);
        response.json({ errors: errors.array() });
    }
};
