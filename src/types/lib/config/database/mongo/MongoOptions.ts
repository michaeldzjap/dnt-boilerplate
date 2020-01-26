import { MongoDrivers } from './';

interface MongoOptions {
    /**
     * The allowed MongoDB connection driver options.
     *
     * @var {MongoDrivers}
     */
    DRIVER: MongoDrivers;
}

export default MongoOptions;
