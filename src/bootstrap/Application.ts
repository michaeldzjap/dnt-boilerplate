import { Server } from 'http';
import express, { Express } from 'express';

import ApplicationContract from '../types/lib/Application';
import DatabaseManager from '../lib/database/DatabaseManager';
import MiddlewareRegistrar from '../middleware/MiddlewareRegistrar';
import TemplatingManager from '../lib/templating/TemplatingManager';
import { isUndefined } from '../lib/support/helpers';
import { HTTP_HOSTNAME, HTTP_PORT } from '../config/app';

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
     * The middleware registrar instance.
     *
     * @var {MiddlewareRegistrar}
     */
    private registrar: MiddlewareRegistrar;

    /**
     * Create a new application instance
     *
     * @constructor
     */
    public constructor() {
        this.application = express();

        this.database = new DatabaseManager(this.application);
        this.templating = new TemplatingManager(this.application);
        this.registrar = new MiddlewareRegistrar(this.application);
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
        | Middleware
        |------------------------------------------------------------------------------
        |
        | Register all app specific middleware with the application.
        |
        */

        this.registrar.register();

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
