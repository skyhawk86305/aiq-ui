/*
 * Karma uses this file as a single entry point
 * to all test files for bundling purposes.
 */
let tests = require.context('.', true, /.spec.ts$/);
tests.keys().forEach(tests);