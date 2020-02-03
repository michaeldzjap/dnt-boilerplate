import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { cloneDeep } from 'lodash';

import { isUndefined } from '../support/helpers';
import { expectsJson, back } from '../http/helpers';
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

        const session = request.session;

        if (!isUndefined(session)) {
            session.errors = errors.array();
        }

        back(request, response);
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

/**
 * Pull any validation errors out of the session if there are any.
 *
 * @param {Request} request
 * @returns {(ValidationError[]|undefined)}
 */
export const pullErrors = (request: Request): ValidationError[] | undefined => {
    const session = request.session;

    if (isUndefined(session) || isUndefined(session.errors)) return;

    const errors = cloneDeep<ValidationError[]>(session.errors);

    delete session.errors;

    // Index the errors by parameter name, makes it easier to handle them in the view
    return errors.reduce((acc: any, error: ValidationError): any => {
        acc[error.param] = {
            message: error.msg,
            value: error.value,
        };

        return acc;
    }, {});
};
