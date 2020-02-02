import { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';

import Middleware from '../../../types/lib/http/Middleware';
import StoreManager from '../../session/StoreManager';
import { ajax, prefetch } from '../helpers';
import { isUndefined } from '../../support/helpers';
import { SECRET, SAME_SITE } from '../../../config/session';

/**
 * @class
 * @classdesc Start the session and store the current URL.
 */
class StartSession implements Middleware {
    /**
     * Start the session and store the current URL in the session.
     *
     * @param {Application} application
     * @returns {void}
     */
    public handle(application: Application): void {
        const store = new StoreManager(application).driver();

        application.use(
            session({
                secret: SECRET,
                resave: false,
                saveUninitialized: false,
                store,
                cookie: {
                    path: '/',
                    httpOnly: true,
                    secure: false,
                    sameSite: SAME_SITE,
                },
            }),
        );

        application.use(this.handler.bind(this));
    }

    /**
     * Store the current URL in the session.
     *
     * @param {Request} request
     * @param {Response} response
     * @param {NextFunction} next
     * @returns {void}
     */
    private handler(request: Request, response: Response, next: NextFunction): void {
        const session = request.session;

        if (!isUndefined(session) && request.method === 'GET' && !ajax(request) && !prefetch(request)) {
            session.previousUrl = request.originalUrl;
        }

        next();
    }
}

export default StartSession;
