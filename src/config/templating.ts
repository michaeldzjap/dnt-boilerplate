import { env } from '../support/helpers';
import { options } from '../types/support/templating';

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

export const DEFAULT = env('TEMPLATING_ENGINE', 'nunjucks') as options;

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
        DRIVER: 'nunjucks' as options,
        EXTENSION: 'njk',
    },
};
