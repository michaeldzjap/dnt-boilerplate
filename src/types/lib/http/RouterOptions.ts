import { Router } from 'express';

interface RouterOptions {
    /**
     * An optional router prefix.
     *
     * @var {(string|undefined)}
     */
    prefix?: string;

    /**
     * The routes that should be registered with the router.
     *
     * @var {Function}
     */
    routes: (router: Router) => void;
}

export default RouterOptions;
