import { options } from './';

interface Engine {
    /**
     * The allowed templating engine driver options.
     *
     * @var {options}
     */
    DRIVER: options;

    /**
     * The view file extension associated with a given engine driver option.
     *
     * @var {string}
     */
    EXTENSION: string;
}

export default Engine;
