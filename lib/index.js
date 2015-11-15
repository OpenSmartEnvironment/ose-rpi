'use strict';

var O = require('ose').module(module);
O.package = 'ose-rpi';
O.scope = 'control';
exports = O.init();

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
 * @scope control
 * @module rpi
 * @main rpi
 */

/**
 * @caption Raspberry core
 *
 * @readme
 * Core singleton of [ose-rpi] npm package. Registers [entry kinds]
 * defined by this package to the `"control"` [scope].
 *
 * @class rpi.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

exports.config = function(name, val, deps) {  // {{{2
  O.scope = 'control';
//  O.scope.maps.rpis = mapRpis;

  O.consts.gpioRetryTimeout = 400;
  O.consts.gpioRetryTime = 10000;

  O.kind('./rpi', 'rpi', deps);
  O.kind('./camera', 'raspicam', deps);

  O.content('../content');
};

/*
function mapRpis(entry, cb) {
//  console.log('MAP RPI', arguments, entry.id, entry.dval);

  if (entry.kind.name === 'rpi') {
    cb(entry.dval.name, entry.id);
  }
}
*/

// }}}1
