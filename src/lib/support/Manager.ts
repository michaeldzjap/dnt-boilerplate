import { Application } from 'express';

import DriverCreators from '../../types/lib/support/DriverCreators';
import { isUndefined } from './helpers';

/**
 * @class
 * @classdesc Support class that may be used to manage different driver options.
 */
abstract class Manager<T> {
    /**
     * The application instance.
     *
     * @var {Application}
     */
    protected application: Application;

    /**
     * The registered custom driver creators.
     *
     * @var {Map<string,Function>}
     */
    protected customCreators: Map<string, Function> = new Map();

    /**
     * The map with available driver instances.
     *
     * @var {Map<string,*>}
     */
    protected drivers: Map<string, T> = new Map();

    /**
     * Create a new manager instance.
     *
     * @constructor
     * @param {Application} application
     * @param {string} dflt
     */
    public constructor(application: Application) {
        this.application = application;
    }

    /**
     * Get the default driver name.
     *
     * @returns {string}
     */
    public abstract getDefaultDriver(): string;

    /**
     * Get the given driver instance.
     *
     * @param {(string|undefined)} driver
     * @returns {*}
     *
     * @throws {Error}
     */
    public driver(driver?: string): T {
        driver = driver || this.getDefaultDriver();

        if (isUndefined(driver)) {
            throw new Error('Unable to resolve undefined driver.');
        }

        if (!this.drivers.has(driver)) {
            this.drivers.set(driver, this.createDriver(driver));
        }

        return this.drivers.get(driver) as T;
    }

    /**
     * Register a custom driver creator closure.
     *
     * @param {string} driver
     * @param {Function} callback
     * @returns {this}
     */
    public extend(driver: string, callback: Function): this {
        this.customCreators.set(driver, callback);

        return this;
    }

    /**
     * Get all of the created drivers.
     *
     * @returns {Map<string,*>}
     */
    public getDrivers(): Map<string, T> {
        return this.drivers;
    }

    /**
     * Get all the driver creators.
     *
     * @returns {DriverCreators}
     */
    protected abstract getDriverCreators(): DriverCreators;

    /**
     * Create a new driver insance.
     *
     * @param {string} driver
     * @returns {*}
     *
     * @throws {Error}
     */
    protected createDriver(driver: string): T {
        if (this.customCreators.has(driver)) {
            return this.callCustomCreator(driver);
        }

        const creators = this.getDriverCreators();

        if (Object.prototype.hasOwnProperty.call(creators, driver)) {
            return creators[driver]();
        }

        throw new Error(`Driver [${driver}] is not supported.`);
    }

    /**
     * Call a custom driver instance.
     *
     * @param {string} driver
     * @returns {*}
     */
    private callCustomCreator(driver: string): T {
        return (this.customCreators.get(driver) as Function)(this.application);
    }
}

export default Manager;
