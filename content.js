'use strict';

exports = require('ose')
  .singleton(module, 'ose/lib/http/content')
  .exports
;

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
exports.addFiles = function() {
  this.addModule('lib/index');
  this.addModule('lib/rpi/index');
  this.addModule('lib/camera/index');
  this.addModule('lib/camera/bb/detail');
  this.addModule('lib/rpi/bb/detail');
  this.addModule('lib/rpi/bb/listDetail');
};
