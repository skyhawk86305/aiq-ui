
/*
 * Webpack uses this file as a single entry point to all polyfills
 * for bundling purposes. Separating these out into a separate
 * bundle speeds up the re-building process as it can check if any
 * of these files have changed...which they shouldn't unless we update
 * dependencies or edit this file.
 */
import 'array-find';
