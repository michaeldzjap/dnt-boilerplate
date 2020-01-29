import { Application } from 'express';

import DriverCreators from '../../src/types/lib/support/DriverCreators';
import Manager from '../../src/lib/support/Manager';

const DEFAULT = 'dummy';

export type Dummy = any;

/**
 * @class
 * @classdesc A dymmy driver class stub.
 */
export class DummyDriver implements Dummy {}

/**
 * @class
 * @classdesc A dummy manager class stub.
 */
export class DummyManager extends Manager<Dummy> {
    /**
     * Create a new dummy manager instance.
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
     * @returns {Dummy}
     */
    public getDefaultDriver(): Dummy {
        return DEFAULT;
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    protected getDriverCreators(): DriverCreators {
        return {
            dummy: this.createDummyDriver.bind(this),
        };
    }

    /**
     * Create an instance of the dummy driver.
     *
     * @returns {DummyDriver}
     */
    private createDummyDriver(): Dummy {
        return new DummyDriver();
    }
}
