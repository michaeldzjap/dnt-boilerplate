import express, { Application, Request, Response, NextFunction } from 'express';

import Middleware from '../../../types/lib/http/Middleware';
import RouterOptions from '../../../types/lib/http/RouterOptions';
import { isUndefined } from '../../support/helpers';
import { HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../../../constants/http';

/**
 * @class
 * @classdesc Register all routers and routes with the application.
 */
abstract class RegisterRoutes implements Middleware {
    /**
     * The array of routers that will be registered with the application.
     *
     * @var {RouterOptions[]}
     */
    protected routers: RouterOptions[] = [];

    /**
     * Register all routers and routes with the application.
     *
     * @param {Application} application
     * @returns {void}
     */
    public handle(application: Application): void {
        this.routers.forEach(({ prefix, routes }: RouterOptions): void => {
            const router = express.Router();

            routes(router);

            if (isUndefined(prefix)) {
                application.use(router);
            } else {
                application.use(prefix, router);
            }
        });

        application.use((request: Request, response: Response): void => {
            response.type('text/plain');
            response.status(HTTP_NOT_FOUND);
            response.send('Not Found');
        });

        application.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
            console.error(error);

            response.type('text/plain');
            response.status(HTTP_INTERNAL_SERVER_ERROR);
            response.send('Internal Server Error');
        });
    }
}

export default RegisterRoutes;
