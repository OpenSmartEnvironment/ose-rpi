'use strict';

var Ose = require('ose');
var M = Ose.package(module);
exports = M.init();

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
 * defined by this package to the `"control"` [scope].
 *
 * @class rpi.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

M.content();

M.consts.gpioRetryTimeout = 400;
M.consts.gpioRetryTime = 10000;

M.scope = 'control';
M.kind('./rpi', 'rpi');
M.kind('./camera', 'raspicam');
