import Engine from './Engine';

interface Engines {
    /**
     * The shared template engine settings.
     *
     * @var {Engine}
     */
    [ENGINES: string]: Engine;
}

export default Engines;
