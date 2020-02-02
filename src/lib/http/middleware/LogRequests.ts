import { Application } from 'express';
import morgan from 'morgan';

import Middleware from '../../../types/lib/http/Middleware';
import { environment } from '../../../lib/support/helpers';

/**
 * @class
 * @classdesc Log all incoming requests.
 */
class LogRequests implements Middleware {
    /**
     * Log all incoming requests when in "development" mode.
     *
     * @param {Application} application
     * @returns {void}
     */
    public handle(application: Application): void {
        if (environment('development')) {
            application.use(morgan('dev'));
        }
    }
}

export default LogRequests;
