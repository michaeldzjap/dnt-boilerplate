import { Drivers } from './';

interface Connection {
    /**
     * The allowed database connection driver options.
     *
     * @var {Drivers}
     */
    DRIVER: Drivers;

    /**
     * The host part of the connection URL.
     *
     * @var {string}
     */
    HOST: string;

    /**
     * The port part of the connection URL.
     *
     * @var {number}
     */
    PORT: number;

    /**
     * The name of the database.
     *
     * @var {string}
     */
    DATABASE: string;

    /**
     * The database user.
     *
     * @var {string}
     */
    USERNAME: string;

    /**
     * The database password.
     *
     * @var {string}
     */
    PASSWORD: string;
}

export default Connection;
