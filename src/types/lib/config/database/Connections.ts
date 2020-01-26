import Connection from './Connection';

interface Connections {
    /**
     * The shared database connection settings.
     *
     * @var {Connection}
     */
    [Connections: string]: Connection;
}

export default Connections;
