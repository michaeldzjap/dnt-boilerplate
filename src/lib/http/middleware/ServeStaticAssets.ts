import express, { Application } from 'express';

import Middleware from '../../../types/lib/http/Middleware';

/**
 * @class
 * @classdesc Serve all static assets in the public folder.
 */
class ServeStaticAssets implements Middleware {
    /**
     * Serve all static assets in the public folder.
     *
     * @param {Application} application
     * @returns {void}
     */
    public handle(application: Application): void {
        application.use(express.static('public'));
    }
}

export default ServeStaticAssets;
