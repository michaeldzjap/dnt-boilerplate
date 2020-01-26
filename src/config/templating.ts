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

export const DEFAULT = env('TEMPLATING_ENGINE', 'nunjucks');

/*
|--------------------------------------------------------------------------
| Exchange Drivers
|--------------------------------------------------------------------------
|
| Here you may configure the information for each possible exchange driver
| option.
|
| Engines: "nunjucks"
|
*/

export const ENGINES = {
    NUNJUCKS: {
        DRIVER: 'nunjucks',
        EXTENSION: 'njk',
    },
};
