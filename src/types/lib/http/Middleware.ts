import { Application } from 'express';

interface Middleware {
    /**
     * Handle an incoming request.
     *
     * @param {Application} application
     * @returns {void}
     */
    handle(application: Application): void;
}

export default Middleware;
