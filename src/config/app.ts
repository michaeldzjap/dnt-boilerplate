import { env } from '../support/helpers';

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
| Application URL
|--------------------------------------------------------------------------
|
| This URL is used by the application whenever it needs a reference to the
| app URL and no request is available.
|
*/

export const URL = env('APP_URL', 'http://localhost');

/*
|--------------------------------------------------------------------------
| Application HTTP Port
|--------------------------------------------------------------------------
|
| The HTTP port the application will be running on.
|
*/

export const HTTP_PORT = env('HTTP_PORT', 8080);
