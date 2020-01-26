import { env } from '../lib/support/helpers';

/*
|--------------------------------------------------------------------------
| Application Name
|--------------------------------------------------------------------------
|
| The name of your application.
|
*/

export const NAME = env('APP_NAME', 'DNT Boilerplate');

/*
|--------------------------------------------------------------------------
| Application Environment
|--------------------------------------------------------------------------
|
| The environment your application is currently running in.
|
*/

export const ENV = env('NODE_ENV', 'development');

/*
|--------------------------------------------------------------------------
| Application HTTP Hostname
|--------------------------------------------------------------------------
|
| The HTTP hostname the application will be listening on.
|
*/

export const HTTP_HOSTNAME = env('HTTP_HOSTNAME', '127.0.0.1');

/*
|--------------------------------------------------------------------------
| Application HTTP Port
|--------------------------------------------------------------------------
|
| The HTTP port the application will be listening on.
|
*/

export const HTTP_PORT = env('HTTP_PORT', 8080);
