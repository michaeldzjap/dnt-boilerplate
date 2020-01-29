import { resolve } from 'path';

import {
    isUndefined,
    isNull,
    isNullOrUndefined,
    isNumeric,
    env,
    environment,
    viewPath,
} from '../../../src/lib/support/helpers';

describe('helpers:isUndefined', (): void => {
    it('confirms a given value is undefined', (): void => {
        expect(isUndefined(undefined)).toBeTruthy();
    });

    it('confirms a given value is not undefined', (): void => {
        expect(isUndefined(null)).toBeFalsy();
        expect(isUndefined('foo')).toBeFalsy();
    });
});

describe('helpers:isNull', (): void => {
    it('confirms a given value is null', (): void => {
        expect(isNull(null)).toBeTruthy();
    });

    it('confirms a given value is not null', (): void => {
        expect(isNull(undefined)).toBeFalsy();
        expect(isNull('foo')).toBeFalsy();
    });
});

describe('helpers:isNullOrUndefined', (): void => {
    it('confirms a given value is null or undefined', (): void => {
        expect(isNullOrUndefined(undefined)).toBeTruthy();
        expect(isNullOrUndefined(null)).toBeTruthy();
    });

    it('confirms a given value is not null or undefined', (): void => {
        expect(isNullOrUndefined('foo')).toBeFalsy();
    });
});

describe('helpers:isNumeric', (): void => {
    it('confirms a given value represents a valid numeric quantity', (): void => {
        expect(isNumeric(0)).toBeTruthy();
        expect(isNumeric(0.0)).toBeTruthy();
        expect(isNumeric('0')).toBeTruthy();
        expect(isNumeric('0.0')).toBeTruthy();
    });

    it('confirms a given value does not represent a valid numeric quantity', (): void => {
        expect(isNumeric(true)).toBeFalsy();
        expect(isNumeric([])).toBeFalsy();
        expect(isNumeric({})).toBeFalsy();
        expect(isNumeric('foo')).toBeFalsy();
        expect(isNumeric(Infinity)).toBeFalsy();
        expect(isNumeric(NaN)).toBeFalsy();
    });
});

describe('helpers:env', (): void => {
    afterEach((): void => {
        delete process.env.foo;
    });

    it('returns the value for the given key', (): void => {
        process.env.foo = 'bar';
        expect(env('foo')).toBe('bar');
    });

    it('returns the default value when the key does not exist', (): void => {
        expect(env('foo', 'bar')).toBe('bar');
    });

    it('strips the quotes of a value', (): void => {
        process.env.foo = '"bar"';
        expect(env('foo')).toBe('bar');

        process.env.foo = "'bar'";
        expect(env('foo')).toBe('bar');
    });

    it('parses a boolean correctly', (): void => {
        process.env.foo = 'true';
        expect(env('foo')).toBeTruthy();

        process.env.foo = '(true)';
        expect(env('foo')).toBeTruthy();

        process.env.foo = 'false';
        expect(env('foo')).toBeFalsy();

        process.env.foo = '(false)';
        expect(env('foo')).toBeFalsy();
    });

    it('parses an empty value correctly', (): void => {
        process.env.foo = '';
        expect(env('foo')).toBe('');

        process.env.foo = 'empty';
        expect(env('foo')).toBe('');

        process.env.foo = '(empty)';
        expect(env('foo')).toBe('');
    });

    it('parses a null value correctly', (): void => {
        process.env.foo = 'null';
        expect(env('foo')).toBeNull();

        process.env.foo = '(null)';
        expect(env('foo')).toBeNull();
    });

    it('parses a numeric value correctly', (): void => {
        process.env.foo = '0';
        expect(env('foo')).toBe(0);
    });
});

describe('helpers:environment', (): void => {
    it('returns the correct environment', (): void => {
        expect(environment('test')).toBeTruthy();
    });
});

describe('helpers:viewPath', (): void => {
    it('returns the correct view path', (): void => {
        expect(viewPath()).toBe(resolve(__dirname, '../../../src/assets/views'));
        expect(viewPath('layouts')).toBe(resolve(__dirname, '../../../src/assets/views/layouts'));
    });
});
