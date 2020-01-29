import Client from '../../types/lib/database/Client';
import Config from '../../types/lib/config/database/mongo/MongoConnection';
import DriverCreators from '../../types/lib/support/DriverCreators';
import MongooseDriver from './mongo/MongooseDriver';
import { MongoDrivers } from '../../types/lib/config/database/mongo';
import { MONGO } from '../../config/database';

/**
 * @class
 * @classdesc A MongoDB specific database connection driver.
 */
class MongoDriver implements Client {
    /**
     * The MongoDB specific database connection config.
     *
     * @var {Config}
     */
    private config: Config;

    /**
     * The MongoDB specific driver.
     *
     * @var {Client}
     */
    private driver: Client;

    /**
     * Create a new MongoDB driver instance.
     *
     * @constructor
     */
    public constructor() {
        this.config = MONGO;
        this.driver = this.createDriver(this.config.OPTIONS.DRIVER);
    }

    /**
     * Establish a database connection.
     *
     * @return {Promise<void>}
     */
    connect(): Promise<void> {
        return this.driver.connect();
    }

    /**
     * Close a database connection.
     *
     * @return {Promise<void>}
     */
    disconnect(): Promise<void> {
        return this.driver.disconnect();
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    private getDriverCreators(): DriverCreators {
        return {
            mongoose: this.createMongooseDriver.bind(this),
        };
    }

    /**
     * Create a new MongoDB specific driver instance.
     *
     * @param {MongoDrivers} driver
     * @returns {Client}
     */
    private createDriver(driver: MongoDrivers): Client {
        return this.getDriverCreators()[driver]();
    }

    /**
     * Create an instance of the Mongoose driver.
     *
     * @returns {MongooseDriver}
     */
    private createMongooseDriver(): Client {
        return new MongooseDriver();
    }
}

export default MongoDriver;
