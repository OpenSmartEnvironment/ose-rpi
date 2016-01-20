'use strict';

const O = require('ose')(module)
  .singleton('ose/lib/http/content')
;

exports = O.init();

/** Docs  {{{1
 * @module rpi
 */

/**
 * @caption Raspberry content
 *
 * @readme
 * Provides files of [ose-rpi] package to the browser.
 *
 * @class rpi.content
 * @type singleton
 * @extends ose.lib.http.content
 */

// Public {{{1
exports.addModule('lib/index');
exports.addModule('lib/camera/index');
exports.addModule('lib/rpi/index');

