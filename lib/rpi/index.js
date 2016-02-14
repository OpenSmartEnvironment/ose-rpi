'use strict';

const O = require('ose')(module)
  .singleton('ose/lib/kind')
  .prepend('node')
;

exports = O.init('control', 'rpi');

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
 * @schema control
 * @class rpi.lib.rpi
 * @extend ose.lib.kind
 * @type singleton
 */

// Public {{{1
exports.role = ['pins'];
exports.on('ose-control/lib/pin/commands');

exports.ddef = O.new('ose/lib/field/object')()  // {{{2
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

exports.sdef = O.new('ose/lib/field/object')()  // {{{2
  .map('pins')  // {{{3
  /**
   * States of individual pins connected by client sockets
   *
   * @property sval.pins
   * @type Object
   */
    .detail(3)
    .addChild(O.new('ose-control/lib/pin/field')()).parent
    .parent

  // }}}3
;

