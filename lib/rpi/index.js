'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('node').exports;

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
 * @class rpi.lib.rpi
 * @extend ose.lib.kind
 * @type singleton
 */

// Public
exports.init = function() {
  this.on('ose-control/lib/pin/commands');
};
