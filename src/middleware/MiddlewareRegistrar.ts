import BaseRegistrar from '../lib/http/middleware/MiddlewareRegistrar';
import LogRequests from '../lib/http/middleware/LogRequests';
import RegisterRoutes from './RegisterRoutes';
import ServeStaticAssets from '../lib/http/middleware/ServeStaticAssets';
import StartSession from '../lib/http/middleware/StartSession';

/**
 * @class
 * @classdesc Register all specified middleware with the application.
 */
class MiddlewareRegistrar extends BaseRegistrar {
    /**
     * The array of middlewares that will be registered with the application.
     *
     * @var {Middleware[]}
     */
    protected middlewares = [new LogRequests(), new ServeStaticAssets(), new StartSession(), new RegisterRoutes()];
}

export default MiddlewareRegistrar;
