import Config from '../../../types/lib/config/database/mongo/MongoConnection';
import { MONGO } from '../../../config/database';

/**
 * @class
 * @classdesc Base class for any classes needing to connect to MongoDB.
 */
abstract class MongoClient {
    /**
     * The MongoDB config.
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
     * Generate the full connection URL.
     *
     * @return {string}
     */
    protected url(): string {
        const { USERNAME, PASSWORD, HOST, PORT, DATABASE } = this.config;

        return `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
    }
}

export default MongoClient;
