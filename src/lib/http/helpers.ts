import { Request } from 'express';

import { isUndefined } from '../support/helpers';

/**
 * Determine if the request is the result of an AJAX call.
 *
 * @returns {boolean}
 */
export const ajax = (request: Request): boolean => request.xhr;

/**
 * Determine if the request is the result of an prefetch call.
 *
 * @returns {boolean}
 */
export const prefetch = (request: Request): boolean => {
    const header = request.header('Purpose');

    return !isUndefined(header) && header.toLowerCase() === 'prefetch';
};

/**
 * Determine if the current request is asking for JSON.
 *
 * @returns {boolean}
 */
export const expectsJson = (request: Request): boolean => {
    return (
        (ajax(request) && isUndefined(request.header('X-PJAX')) && request.accepts('*/*') !== false) ||
        request.accepts('json') !== false
    );
};
