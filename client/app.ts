/*
 * Webpack uses this file as a single entry point to all app
 * files for bundling purposes. We require all scripts, styles
 * and images to ensure our app has everything it needs.
 * This file is only temporary until we modularize the app.
 */
import './app/app.module.ts';

let scripts = require.context('./app', true, /(?!\.spec)[\w-]{5}\.ts$/);
scripts.keys().forEach(scripts);

let styles = require.context('./app', true, /\.less$/);
styles.keys().forEach(styles);

import './app/images/favicon.ico';
import './app/images/SolidFire-Gotham_WHITE.svg';

