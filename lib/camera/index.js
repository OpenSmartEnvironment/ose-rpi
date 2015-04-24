'use strict';

var O = require('ose').object(module, 'ose/lib/kind');
exports = O.append('node').exports;

/** Docs {{{1
 * @module rpi
 */

/**
 * @caption Raspberry Pi camera kind
 *
 * @readme
 * [Entry kind] describing Raspberry Pi cameras. It uses the raspicam
 * npm package to take pictures.
 *
 * @kind raspicam
 * @class rpi.lib.camera
 * @extend ose.lib.kind
 * @type singleton
 */
