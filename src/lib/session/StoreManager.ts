import { Application } from 'express';
import { Store } from 'express-session';

import DriverCreators from '../../types/lib/support/DriverCreators';
import Manager from '../support/Manager';
import MongoFactory from './MongoFactory';
import { Drivers } from '../../types/lib/config/session';
import { DRIVER } from '../../config/session';

/**
 * @class
 * @classdesc Support class for managing the different session store driver options.
 */
class StoreManager extends Manager<Store> {
    /**
     * Create a new templating manager instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        super(application);
    }

    /**
     * Get the default driver name.
     *
     * @returns {Drivers}
     */
    public getDefaultDriver(): Drivers {
        return DRIVER;
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    protected getDriverCreators(): DriverCreators {
        return {
            mongo: this.createMongoDriver.bind(this),
        };
    }

    /**
     * Create an instance of the MongoDB store driver.
     *
     * @returns {MongoDbStore}
     */
    private createMongoDriver(): Store {
        return MongoFactory.getInstance().make();
    }
}

export default StoreManager;
