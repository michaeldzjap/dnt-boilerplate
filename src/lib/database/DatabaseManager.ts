import { Application } from 'express';

import Client from '../../types/lib/database/Client';
import DriverCreators from '../../types/lib/support/DriverCreators';
import Manager from '../support/Manager';
import MongoDriver from './MongoDriver';
import { DEFAULT } from '../../config/database';

/**
 * @class
 * @classdesc Support class for managing the different database driver options.
 */
class DatabaseManager extends Manager<Client> {
    /**
     * Create a new templating manager instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        super(application, DEFAULT);
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    protected getDriverCreators(): DriverCreators {
        return {
            mongo: this.createMongoDriver.bind(this),
        };
    }

    /**
     * Create an instance of the MongoDB driver.
     *
     * @returns {MongoDriver}
     */
    private createMongoDriver(): Client {
        return new MongoDriver();
    }
}

export default DatabaseManager;
