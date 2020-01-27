import { Server } from 'http';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

import ApplicationContract from '../types/lib/Application';
import DatabaseManager from '../lib/database/DatabaseManager';
import TemplatingManager from '../lib/templating/TemplatingManager';
import web from '../routes/web';
import { isUndefined, environment } from '../lib/support/helpers';
import { HTTP_HOSTNAME, HTTP_PORT } from '../config/app';
import { HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR } from '../constants/http';

/**
 * @class
 * @classdesc A container class for all application services.
 */
class Application implements ApplicationContract {
    /**
     * The Express application instance.
     *
     * @var {Express}
     */
    private application: Express;

    /**
     * The server instance.
     *
     * @var {Server}
     */
    private server!: Server;

    /**
     * The database manager instance.
     *
     * @var {DatabaseManager}
     */
    private database: DatabaseManager;

    /**
     * The templating manager instance.
     *
     * @var {TemplatingManager}
     */
    private templating: TemplatingManager;

    /**
     * Create a new application instance
     *
     * @constructor
     */
    public constructor() {
        this.application = express();

        this.database = new DatabaseManager(this.application);
        this.templating = new TemplatingManager(this.application);
    }

    /**
     * Boot the application.
     *
     * @return {Promise<void>}
     */
    public async boot(): Promise<void> {
        /*
        |------------------------------------------------------------------------------
        | Templating
        |------------------------------------------------------------------------------
        |
        | Configure the default templating engine and register it with the application.
        |
        */

        this.templating.driver().configure();

        /*
        |------------------------------------------------------------------------------
        | Database
        |------------------------------------------------------------------------------
        |
        | Connect to the database.
        |
        */

        await this.database.driver().connect();

        /*
        |------------------------------------------------------------------------------
        | Logging
        |------------------------------------------------------------------------------
        |
        | Enable request logging when in development mode.
        |
        */

        if (environment('development')) {
            this.application.use(morgan('dev'));
        }

        /*
        |------------------------------------------------------------------------------
        | Routes
        |------------------------------------------------------------------------------
        |
        | Register all routes with the application.
        |
        */

        web(this.application);

        this.application.use((request: Request, response: Response): void => {
            response.type('text/plain');
            response.status(HTTP_NOT_FOUND);
            response.send('Not Found');
        });

        this.application.use((error: Error, request: Request, response: Response, next: Function): void => {
            console.error(error.stack);

            response.type('text/plain');
            response.status(HTTP_INTERNAL_SERVER_ERROR);
            response.send('Internal Server Error');
        });

        /*
        |------------------------------------------------------------------------------
        | Server
        |------------------------------------------------------------------------------
        |
        | Lastly, we can start the server.
        |
        */

        this.server = this.application.listen(HTTP_PORT, (): void =>
            console.log(`Server running at http://${HTTP_HOSTNAME}:${HTTP_PORT}/`),
        );
    }

    /**
     * Quit the application.
     *
     * @return {Promise<void>}
     */
    public async quit(): Promise<void> {
        await this.database.driver().disconnect(); // Close the database connection

        try {
            await this.close();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Close the server.
     *
     * @returns {Promise<void>}
     */
    private close(): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.server.close((error?: Error): void => {
                if (isUndefined(error)) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }
}

export default Application;
