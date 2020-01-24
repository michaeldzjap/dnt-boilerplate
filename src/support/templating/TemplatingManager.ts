import { Application } from 'express';

import DriverCreators from '../../types/support/DriverCreators';
import Manager from '../Manager';
import NunjucksDriver from './NunjucksDriver';
import Templating from '../../types/support/templating/Templating';
import { DEFAULT } from '../../config/templating';

/**
 * @class
 * @classdesc Support class for managing the different templating driver options.
 */
class TemplatingManager extends Manager<Templating> {
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
    private createNunjucksDriver(): Templating {
        return new NunjucksDriver(this.application);
    }
}

export default TemplatingManager;
