import { Drivers } from './';

interface Engine {
    /**
     * The allowed templating engine driver options.
     *
     * @var {Drivers}
     */
    DRIVER: Drivers;

    /**
     * The view file extension associated with a given engine driver option.
     *
     * @var {string}
     */
    EXTENSION: string;
}

export default Engine;
