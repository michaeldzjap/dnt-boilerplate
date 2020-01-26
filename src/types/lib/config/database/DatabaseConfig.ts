import Config from '../Config';
import Connections from './Connections';

interface DatabaseConfig extends Config {
    /**
     * The available database connections.
     *
     * @var {Connections}
     */
    Connections: Connections;
}

export default DatabaseConfig;
