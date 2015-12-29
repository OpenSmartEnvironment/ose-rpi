'use strict';

var O = require('ose').object(module, 'ose/lib/kind');
O.append('node');
exports = O.init('control', 'raspicam');

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

// Public {{{1
exports.ddef = O.new('ose/lib/orm/object')()  // {{{2
  .text('alias')  // {{{3
    .detail(1)
    .parent
  .text('name')  // {{{3
    .detail('header')
    .parent
  .integer('camera')  // {{{3
    .detail('2')
    .parent
  .shard('save')  // {{{3
    .detail('3')
    .parent

  // }}}3
;

