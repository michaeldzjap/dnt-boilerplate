import mongoose from 'mongoose';

import Client from '../../../types/lib/database/Client';
import Config from '../../../types/lib/config/database/mongo/MongoConnection';
import { MONGO } from '../../../config/database';

/**
 * @class
 * @classdesc A Mongoose specific database connection driver.
 */
class MongooseDriver implements Client {
    /**
     * The Mongoose config.
     *
     * @var {Config}
     */
    private config: Config;

    /**
     * Create a new Mongoose driver instance.
     *
     * @constructor
     */
    public constructor() {
        this.config = MONGO;
    }

    /**
     * Establish a database connection.
     *
     * @return {void}
     */
    async connect(): Promise<void> {
        try {
            await mongoose.connect(this.url(), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            this.handleError();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Handle errors after an initial connection was established.
     *
     * @return {void}
     */
    private handleError(): void {
        mongoose.connection.on('error', (error): void => console.error(error));
    }

    /**
     * Close a database connection.
     *
     * @return {void}
     */
    disconnect(): Promise<void> {
        return mongoose.disconnect();
    }

    /**
     * Generate the full connection URL.
     *
     * @return {string}
     */
    private url(): string {
        const { USERNAME, PASSWORD, HOST, PORT, DATABASE } = this.config;

        return `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
    }
}

export default MongooseDriver;
