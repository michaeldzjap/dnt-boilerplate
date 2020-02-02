import mongoose from 'mongoose';

import Client from '../../../types/lib/database/Client';
import MongoClient from './MongoClient';

/**
 * @class
 * @classdesc A Mongoose specific database connection driver.
 */
class MongooseDriver extends MongoClient implements Client {
    /**
     * Establish a database connection.
     *
     * @return {Promise<void>}
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
     * @return {Promise<void>}
     */
    disconnect(): Promise<void> {
        return mongoose.disconnect();
    }
}

export default MongooseDriver;
