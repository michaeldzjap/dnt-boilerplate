import { resolve } from 'path';

import { Env } from '../types/support';

/**
 * Determine if the given value is undefined.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

/**
 * Determine if the given value is null.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Determine if the given value is null or undefined.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};

/**
 * Determine if the given value is a valid number.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isNumeric = (value: any): value is number | string => {
    return !(value instanceof Array) && value - parseFloat(value) + 1 >= 0;
};

export function env(key: string): Env;
export function env(key: string, dflt: Env): Env;
export function env(key: string, dflt?: Env): Env;
export function env(key: string, dflt?: Env): undefined;

export function env(key: string): string;
export function env(key: string, dflt: string): string;
export function env(key: string, dflt?: string): string;
export function env(key: string, dflt?: string): undefined;

export function env(key: string): number;
export function env(key: string, dflt: number): number;
export function env(key: string, dflt?: number): number;
export function env(key: string, dflt?: number): undefined;

export function env(key: string): boolean;
export function env(key: string, dflt: boolean): boolean;
export function env(key: string, dflt?: boolean): boolean;
export function env(key: string, dflt?: boolean): undefined;

export function env(key: string): undefined;
export function env(key: string): null;

/**
 * Get the value of an environment variable.
 *
 * @param {string} key
 * @param {(Env|string|number|boolean|undefined)} dflt
 * @returns {?(Env|string|number|boolean|undefined)}
 */
export function env(
    key: string,
    dflt?: Env | string | number | boolean,
): Env | string | number | boolean | undefined | null {
    const value = process.env[key];

    if (isUndefined(value)) {
        return dflt;
    }

    switch (value.toLowerCase()) {
        case 'true':
        case '(true)':
            return true;
        case 'false':
        case '(false)':
            return false;
        case 'empty':
        case '(empty)':
            return '';
        case 'null':
        case '(null)':
            return null;
        default:
    }

    const { length } = value;

    if (isNumeric(value) as boolean) {
        return Number(value);
    }

    if (
        length > 1 &&
        (value[0] === '"' || value[0] === "'") &&
        (value[length - 1] === '"' || value[length - 1] === "'")
    ) {
        return value.substring(1, length - 1);
    }

    return value;
}

/**
 * Get the path to the view directory
 *
 * @param {string} [path='']
 * @returns {string}
 */
export const viewPath = (path = ''): string => resolve(__dirname, '../views', path);
