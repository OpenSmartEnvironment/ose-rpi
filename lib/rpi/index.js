'use strict';

var O = require('ose').object(module, 'ose/lib/kind');
O.append('node');
exports = O.init('control', 'rpi');

exports.on('ose-control/lib/pin/commands');

/** Docs {{{1
 * @module rpi
 */

/**
 * @caption Raspberry Pi kind
 *
 * @readme
 * [Entry kind] describing Raspberry Pi boards. It is possible to
 * control GPIO pins using the [Pins] component.
 *
 * @kind rpi
 * @class rpi.lib.rpi
 * @extend ose.lib.kind
 * @type singleton
 */

