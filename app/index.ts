/*
 * Webpack uses this file as a single entry point to all app
 * files for bundling purposes. We require all scripts, styles
 * and images to ensure our app has everything it needs.
 * This file is only temporary until we modularize the app.
 */
import './app.ts';

let scripts = require.context('.', true, /.ts$/);
scripts.keys().forEach(scripts);

let styles = require.context('.', true, /.less$/);
styles.keys().forEach(styles);

import './images/favicon.ico';
import './images/Logo.png';
import './images/right-drawn-arrow.svg';
import './images/SolidFire-Gotham_WHITE.svg';

