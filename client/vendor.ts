
/*
 * Webpack uses this file as a single entry point to all vendor
 * files for bundling purposes. Dependencies are listed here
 * simply so that Webpack knows which files belong in the vendor
 * bundle vs. our app bundle.
 *
 * Note: Although importing all dependencies here here should be
 * enough to get the app working, we should also place these import
 * statements directly into the module that depends on them to keep
 * everything in the module contained. Webpack will dedupe refs
 */

/* Scripts */
import 'angular';
import 'angular-cache';
import 'angular-filter';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootstrap';

/* sf-components - until it is properly packaged with own dependencies */
import 'angular-bind-html-compile';
import 'array-find';
import 'd3';
import 'ng-csv';
import '../node_modules/sf-components-v2/dist/sf-components.js';

/* Styles */
import 'bootstrap-css-only';
import '../node_modules/font-awesome/less/font-awesome.less';
import '../node_modules/sf-components-v2/dist/sf-components.css';
