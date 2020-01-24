import Config from '../Config';
import Engines from './Engines';

interface TemplatingConfig extends Config {
    /**
     * The available templating engines.
     *
     * @var {Engines}
     */
    ENGINES: Engines;
}

export default TemplatingConfig;
