'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('node').exports;

/** Docs {{{1
 * @module rpi
 */

/**
 * @caption Raspberry PI kind
 *
 * @readme
 * [Entry kind] describing Raspberry PI boards. It is possible to
 * control GPIO pins using the [Pins] class.
 *
 * @class rpi.lib.rpi
 * @extend ose.lib.kind
 * @type singleton
 */

// Public
exports.init = function() {
  this.on('ose-control/lib/pin/commands');
};
