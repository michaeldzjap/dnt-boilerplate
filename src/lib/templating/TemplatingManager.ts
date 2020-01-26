import { Application } from 'express';

import DriverCreators from '../../types/lib/support/DriverCreators';
import Manager from '../support/Manager';
import NunjucksDriver from './NunjucksDriver';
import TemplatingEngine from '../../types/lib/templating/TemplatingEngine';
import { DEFAULT } from '../../config/templating';

/**
 * @class
 * @classdesc Support class for managing the different templating driver options.
 */
class TemplatingManager extends Manager<TemplatingEngine> {
    /**
     * Create a new templating manager instance.
     *
     * @constructor
     * @param {Application} application
     */
    public constructor(application: Application) {
        super(application, DEFAULT);
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    protected getDriverCreators(): DriverCreators {
        return {
            nunjucks: this.createNunjucksDriver.bind(this),
        };
    }

    /**
     * Create an instance of the Nunjucks driver.
     *
     * @returns {NunjucksDriver}
     */
    private createNunjucksDriver(): TemplatingEngine {
        return new NunjucksDriver(this.application);
    }
}

export default TemplatingManager;
