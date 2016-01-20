'use strict';

const O = require('ose')(module)
  .setPackage('ose-rpi')
;

/** Docs {{{1
 * @caption Raspberry Pi
 *
 * @readme
 * This package contains [entry kinds] for integrating hardware from
 * the Raspberry Pi Foundation into OSE.
 *
 * See [Raspberry Pi example].
 *
 * @planned
 * - Support PWM outputs on Raspberry Pi GPIO pins
 * - Access to GPIO without root access
 *   https://github.com/jimfenton/raspberry-gpio-daemon
 * - PWM
 *   https://github.com/sarfata/pi-blaster
 *
 * @aliases raspberry raspberryPi raspberryCamera
 * @module rpi
 * @main rpi
 */

/**
 * @caption Raspberry core
 *
 * @readme
 * Core singleton of [ose-rpi] npm package. Registers [entry kinds]
 * defined by this package to the `"control"` [schema].
 *
 * @class rpi.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

exports.config = function(name, val, deps) {
  var consts = O.consts('control');
  consts.gpioRetryTimeout = 400;
  consts.gpioRetryTime = 10000;

  require('./rpi');
  require('./camera');

  O.content('../content');
};

