import { Drivers } from '../types/lib/config/session';
import { env } from '../lib/support/helpers';

/*
|------------------------------------------------------------------------------
| Default Session Store Driver
|------------------------------------------------------------------------------
|
| This option controls the default session store "driver" that will be used on
| requests.
|
*/

export const DRIVER = env('SESSION_DRIVER', 'mongo') as Drivers;

/*
|------------------------------------------------------------------------------
| Session Secret
|------------------------------------------------------------------------------
|
| The session secret is used to encrypt the session cookie. It should be set to
| a long, hard to guess string.
|
*/

export const SECRET = env('SESSION_SECRET', 'secret');

/*
|--------------------------------------------------------------------------
| Same-Site Cookies
|--------------------------------------------------------------------------
|
| This option determines how your cookies behave when cross-site requests
| take place, and can be used to mitigate CSRF attacks.
|
| Supported: "none", "lax", "strict"
|
*/

export const SAME_SITE = 'lax';
