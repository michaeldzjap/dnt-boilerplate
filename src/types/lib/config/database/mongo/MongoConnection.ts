import Connection from '../Connection';
import MongoOptions from './MongoOptions';

interface MongoConnection extends Connection {
    /**
     * The MongoDB specific connection options.
     *
     * @var {MongoOptions}
     */
    OPTIONS: MongoOptions;
}

export default MongoConnection;
