import api from '../routes/api';
import Base from '../lib/http/middleware/RegisterRoutes';
import web from '../routes/web';

/**
 * @class
 * @classdesc Register the given routers and routes with the application.
 */
class RegisterRoutes extends Base {
    /**
     * The array of routers that will be registered with the application.
     *
     * @var {Router[]}
     */
    protected routers = [
        { prefix: '/', routes: web },
        { prefix: '/api', routes: api },
    ];
}

export default RegisterRoutes;
