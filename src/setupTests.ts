/* eslint-disable @typescript-eslint/no-empty-function */

import '@testing-library/jest-dom';

/*
import * as util from 'util';

// Polyfill TextEncoder and TextDecoder
Object.defineProperty(window, 'TextEncoder', {
    writable: true,
    value: util.TextEncoder,
});
Object.defineProperty(window, 'TextDecoder', {
    writable: true,
    value: util.TextDecoder,
});

// Mock window.location.href to prevent navigation errors
delete (window as any).location;
window.location = { href: '' } as any;

*/

// Suppress console.error and console.warn
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});

