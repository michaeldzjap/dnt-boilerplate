import { Application } from 'express';

import Middleware from '../../../types/lib/http/Middleware';

/**
 * @class
 * @classdesc Register all specified middleware with the application.
 */
abstract class MiddlewareRegistrar {
    /**
     * The array of middlewares that will be registered with the application.
     *
     * @var {Middleware[]}
     */
    protected middlewares: Middleware[] = [];

    /**
     * The Express application instance.
     *
     * @var {Application}
     */
    private application: Application;

    /**
     * Create a new middleware registrar instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        this.application = application;
    }

    /**
     * Register all middleware with the application.
     *
     * @returns {void}
     */
    public register(): void {
        this.middlewares.forEach((middleware: Middleware): void => {
            middleware.handle(this.application);
        });
    }
}

export default MiddlewareRegistrar;
