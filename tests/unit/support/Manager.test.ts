import { Application } from 'express';

import { DummyManager, DummyDriver, Dummy } from '../../stubs/DummyManager';

const expressMock = ({} as any) as Application;

describe('support:Manager', (): void => {
    it('throws when specifying an unsupported driver', (): void => {
        // eslint-disable-next-line require-jsdoc
        const fn = (): void => {
            new DummyManager(expressMock).driver('undefined');
        };

        expect(fn).toThrow('Driver [undefined] is not supported.');
    });

    it('resolves the default driver', (): void => {
        const dummy = new DummyManager(expressMock).driver();

        expect(dummy).toBeInstanceOf(DummyDriver);
    });

    it('resolves a custom driver', (): void => {
        const manager = new DummyManager(expressMock);

        manager.extend('custom', (): Dummy => new DummyDriver());

        const dummy = manager.driver('custom');

        expect(dummy).toBeInstanceOf(DummyDriver);
    });

    it('returns all of the created drivers', (): void => {
        const manager = new DummyManager(expressMock);
        const drivers = manager.getDrivers();

        expect(drivers.has('dummy')).toBeFalsy();

        const dummy = manager.driver();

        expect(drivers.has('dummy')).toBeTruthy();
        expect(drivers.get('dummy')).toBe(dummy);
    });
});
