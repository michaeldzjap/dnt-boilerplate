import session, { Store } from 'express-session';
import store from 'connect-mongodb-session';

import Factory from '../../types/lib/support/Factory';
import MongoClient from '../database/mongo/MongoClient';
import { isUndefined } from '../support/helpers';

/**
 * @class
 * @classdesc Factory class that returns an instance of a MongoDB store.
 */
class MongoFactory extends MongoClient implements Factory<Store> {
    /**
     * The current Mongo factory singleton.
     *
     * @var {(MongoFactory|undefined)}
     */
    private static instance?: MongoFactory;

    /**
     * Set the globally available instance of the Mongo factory.
     *
     * @returns {MongoFactory}
     */
    public static getInstance(): MongoFactory {
        if (isUndefined(MongoFactory.instance)) {
            MongoFactory.instance = new MongoFactory();
        }

        return MongoFactory.instance;
    }

    /**
     * Set the shared instance of the Mongo factory.
     *
     * @param {(MongoFactory|undefined)} instance
     * @returns {(MongoFactory|undefined)}
     */
    public static setInstance(instance?: MongoFactory): MongoFactory | undefined {
        return (MongoFactory.instance = instance);
    }

    /**
     * Create a new MongoDB store instance.
     *
     * @returns {MongoDbStore}
     */
    public make(): Store {
        const MongoDbStore = store(session);

        const instance = new MongoDbStore(
            {
                uri: this.url(),
                collection: 'sessions',
            },
            (error: Error): void => console.error(error),
        );

        instance.on('error', (error: Error): void => console.error(error));

        return instance;
    }
}

export default MongoFactory;
