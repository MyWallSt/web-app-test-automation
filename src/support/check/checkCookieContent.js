"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check the content of a cookie against a given value
 * @param  {String}   name          The name of the cookie
 * @param  {String}   falseCase     Whether or not to check if the value matches
 *                                  or not
 * @param  {String}   expectedValue The value to check against
 */
exports.default = async (name, falseCase, expectedValue) => {
    /**
     * The cookie retrieved from the browser object
     * @type {Object}
     */
    const cookie = (await browser.getCookies(name))[0];
    expect(cookie.name).toBe(name, 
    // @ts-expect-error
    `no cookie found with the name "${name}"`);
    if (falseCase) {
        expect(cookie.value).not.toBe(expectedValue, 
        // @ts-expect-error
        `expected cookie "${name}" not to have value "${expectedValue}"`);
    }
    else {
        expect(cookie.value).toBe(expectedValue, 
        // @ts-expect-error
        `expected cookie "${name}" to have value "${expectedValue}" but got "${cookie.value}"`);
    }
};
