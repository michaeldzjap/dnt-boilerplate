import { env } from '../support/helpers';
import { Env } from '../types/support';

export default {
    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | The name of your application.
    |
    */

    NAME: env<string>('APP_NAME', 'DNT Boilerplate'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | The environment your application is currently running in.
    |
    */

    ENV: env<Env>('NODE_ENV', 'development'),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the application whenever it needs a reference to the
    | app URL and no request is available.
    |
    */

    URL: env<string>('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Application HTTP Port
    |--------------------------------------------------------------------------
    |
    | The HTTP port the application will be running on.
    |
    */

    HTTP_PORT: env<number>('HTTP_PORT', 8080),
};
