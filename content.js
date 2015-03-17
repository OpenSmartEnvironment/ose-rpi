'use strict';

var O = require('ose').object(module, Init, 'ose/lib/http/content');
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
function Init() {  // {{{2
  O.super.call(this);

  this.addModule('lib/index');
  this.addModule('lib/camera/index');
  this.addModule('lib/camera/gaia/detail');
  this.addModule('lib/rpi/index');
  this.addModule('lib/rpi/gaia/detail');
  this.addModule('lib/rpi/gaia/listDetail');
};
