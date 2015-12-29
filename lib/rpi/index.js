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

// Public {{{1
exports.ddef = O.new('ose/lib/orm/object')()  // {{{2
  .text('alias')  // {{{3
  /**
   * Alias
   *
   * @property dval.alias
   * @type String
   */
    .detail(1)
    .parent

  .text('name')  // {{{3
  /**
   * Name
   *
   * @property dval.name
   * @type String
   */
    .detail('header')
    .parent

  .boolean('dummy')  // {{{3
  /**
   * Dummy emulation
   *
   * @property dval.dummy
   * @type Boolean
   */
    .detail('2')
    .parent

  // }}}3
;

exports.sdef = O.new('ose/lib/orm/object')()  // {{{2
  .map('pins')  // {{{3
  /**
   * States of individual pins connected by client sockets
   *
   * @property sval.pins
   * @type Object
   */
    .detail(3)
    .addChild(O.new('ose-control/lib/pin/orm')()).parent
    .parent

  // }}}3
;

