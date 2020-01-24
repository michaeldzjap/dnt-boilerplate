import { Server } from 'http';
import express, { Request, Response } from 'express';

import TemplatingManager from '../support/templating/TemplatingManager';
import { NAME, HTTP_PORT } from '../config/app';
import { HTTP_OK, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../constants/http';

/**
 * Bootstrap the application.
 *
 * @returns {Server>}
 */
export const bootstrap = (): Server => {
    const app = express();

    /*
    |------------------------------------------------------------------------------
    | Templating
    |------------------------------------------------------------------------------
    |
    | Configure the default templating engine and register it with the application.
    |
    */

    const templating = new TemplatingManager(app);

    templating.driver().configure();

    app.get('/', (request: Request, response: Response): void => {
        response.status(HTTP_OK);
        response.render('welcome', { title: NAME });
    });

    app.use((request: Request, response: Response): void => {
        response.type('text/plain');
        response.status(HTTP_NOT_FOUND);
        response.send('Not Found');
    });

    app.use((error: Error, request: Request, response: Response): void => {
        console.error(error.stack);

        response.type('text/plain');
        response.status(HTTP_INTERNAL_SERVER_ERROR);
        response.send('Internal Server Error');
    });

    return app.listen(HTTP_PORT, (): void => console.log(`App listening on port ${HTTP_PORT}`));
};

/**
 * Quit the application.
 *
 * @param {Server} server
 * @returns {void}
 */
export const quit = (server: Server): void => {
    server.close();
};
