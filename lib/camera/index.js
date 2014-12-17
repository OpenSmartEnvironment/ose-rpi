'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('node').exports;

/** Docs {{{1
 * @module rpi
 */

/**
 * @caption Raspberry PI camera kind
 *
 * @readme
 * [Entry kind] describing Raspberry PI cameras. It uses the raspicam
 * npm package to take pictures.
 *
 * @class rpi.lib.camera
 * @extend ose.lib.kind
 * @type singleton
 */
