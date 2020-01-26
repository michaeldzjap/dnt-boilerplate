import { env } from '../lib/support/helpers';

/*
|--------------------------------------------------------------------------
| Default Database Connection Name
|--------------------------------------------------------------------------
|
| Here you may specify which of the database connections below you wish
| to use as your default connection for all database work.
|
*/

export const DEFAULT = env('DATABASE_CONNECTION', 'mongo');

/*
|--------------------------------------------------------------------------
| Database Connections
|--------------------------------------------------------------------------
|
| Here are each of the database connections setup for your application.
|
*/

export const CONNECTIONS = {
    MONGO: {
        DRIVER: 'mongo',
        HOST: env('MONGODB_HOST', 'localhost'),
        PORT: env('MONGODB_PORT', 27017),
        DATABASE: env('MONGO_INITDB_DATABASE', 'dnt'),
        USERNAME: env('MONGO_INITDB_USERNAME', 'dnt'),
        PASSWORD: env('MONGO_INITDB_PASSWORD', 'secret'),
        OPTIONS: {
            DRIVER: 'mongoose',
        },
    },
};
