import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { expectsJson } from '../http/helpers';
import { HTTP_UNPROCESSABLE_ENTITY } from '../../constants/http';

/**
 * Check if there are any validation errors and return HTML response.
 *
 * @param {Request} request
 * @param {Response} response
 * @param {string} view
 * @returns {void}
 */
const html = (request: Request, response: Response): void => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(HTTP_UNPROCESSABLE_ENTITY);
        // response.redirect(request.path);
        // response.render(view, { errors: errors.array() });
    }
};

/**
 * Check if there are any validation errors and return JSON response.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
const json = (request: Request, response: Response): void => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        response.status(HTTP_UNPROCESSABLE_ENTITY);
        response.json({ errors: errors.array() });
    }
};

/**
 * Check if there are any validation errors and return the appropriate error
 * response if there are any.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {void}
 */
export const validate = (request: Request, response: Response): void => {
    if (expectsJson(request)) {
        json(request, response);
    } else {
        html(request, response);
    }
};
