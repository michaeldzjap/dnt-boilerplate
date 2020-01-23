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
 * Determine if the given value is a string.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
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

/**
 * Get the value of an environment variable.
 *
 * @param {string} key
 * @param {*} dflt
 * @returns {*}
 */
export const env = <T>(key: string, dflt?: T): T | boolean | string | number | null | undefined => {
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

    if (length > 1 && value[0] === '"' && value[length - 1] === '"') {
        return value.substring(1, length - 1);
    }

    return value;
};
