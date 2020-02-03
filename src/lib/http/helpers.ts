import { Request, Response } from 'express';

import { isUndefined } from '../support/helpers';

/**
 * Determine if the request is the result of an AJAX call.
 *
 * @returns {boolean}
 */
export const ajax = (request: Request): boolean => request.xhr;

/**
 * Determine if the request is the result of an PJAX call.
 *
 * @returns {boolean}
 */
export const pjax = (request: Request): boolean => !isUndefined(request.header('X-PJAX'));

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
 * Determine if the current request accepts any content type.
 *
 * @returns {boolean}
 */
export const acceptsAnyContentType = (request: Request): boolean => {
    const acceptable = request.header('Accept');

    if (isUndefined(acceptable)) return true;

    const types = acceptable.split(',');

    return types.length === 0 || types[0] === '*/*' || types[0] === '*';
};

/**
 * Determine if the current request is asking for JSON.
 *
 * @param {Request} request
 * @returns {boolean}
 */
export const wantsJson = (request: Request): boolean => {
    const acceptable = request.header('Accept');

    if (isUndefined(acceptable)) return false;

    const result = acceptable.split(',').find((type: string): boolean => {
        return type.includes('/json') || type.includes('+json');
    });

    return !isUndefined(result);
};

/**
 * Determine if the current request is asking for JSON.
 *
 * @returns {boolean}
 */
export const expectsJson = (request: Request): boolean => {
    return (ajax(request) && !pjax(request) && acceptsAnyContentType(request)) || wantsJson(request);
};

/**
 * Get the previous URL from the session if possible.
 *
 * @param {Request} request
 * @returns {(string|undefined)}
 */
export const previousUrl = (request: Request): string | undefined => {
    const session = request.session;

    if (session) {
        return session.previousUrl;
    }
};

/**
 * Redirect back to the previous location.
 *
 * @param {Request} request
 * @param {number} [status=302]
 * @returns {void}
 */
export const back = (request: Request, response: Response, status = 302): void => {
    const referrer = request.header('Referer');

    const url = referrer || previousUrl(request);

    response.redirect(status, url || '/');
};
