import Config from '../types/lib/config/templating/Engine';
import { Drivers } from '../types/lib/config/templating';
import { env } from '../lib/support/helpers';

/*
|--------------------------------------------------------------------------
| Default Templating Driver
|--------------------------------------------------------------------------
|
| This option controls the default templating driver that will be used to
| render views.
|
| Supported: "nunjucks"
|
*/

export const DEFAULT = env('TEMPLATING_ENGINE', 'nunjucks') as Drivers;

/*
|--------------------------------------------------------------------------
| Engine Drivers
|--------------------------------------------------------------------------
|
| Here you may configure the information for each possible exchange driver
| option.
|
| Engines: "nunjucks"
|
*/

export const NUNJUCKS: Config = {
    DRIVER: 'nunjucks',
    EXTENSION: 'njk',
};
