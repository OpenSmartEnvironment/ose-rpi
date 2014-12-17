'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var Pins = M.class('ose-control/lib/pin/list');
var Exec = require('child_process').exec;
var Gpio = require('onoff').Gpio;

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.data.pinTypes = PinTypes;
  entry.data.pins = RpiPins;

  entry.pins = new Pins(entry, PinTypes, RpiPins);
};

// }}}1
// Private {{{1
var PinTypes = {  // {{{2
  din: {
    read: readDigital
  },
  dout: {
    read: readDigital,
    write: writeDout,
    setup: setupDout,
  }
};

var RpiPins = {  // {{{2
  '0': {
    din: true,
    dout: true,
  },
  '1': {
    din: true,
    dout: true,
  },
  '2': {
    din: true,
    dout: true,
  },
  '3': {
    din: true,
    dout: true,
  },
  '4': {
    din: true,
    dout: true,
  },
  '5': {
    din: true,
    dout: true,
  },
  '6': {
    din: true,
    dout: true,
  },
  '7': {
    din: true,
    dout: true,
  },
  '8': {
    din: true,
    dout: true,
  },
  '9': {
    din: true,
    dout: true,
  },
  '10': {
    din: true,
    dout: true,
  },
  '11': {
    din: true,
    dout: true,
  },
  '12': {
    din: true,
    dout: true,
  },
  '13': {
    din: true,
    dout: true,
  },
  '14': {
    din: true,
    dout: true,
  },
  '15': {
    din: true,
    dout: true,
  },
  '16': {
    din: true,
    dout: true,
  },
  '17': {
    din: true,
    dout: true,
  },
  '18': {
    din: true,
    dout: true,
  },
  '19': {
    din: true,
    dout: true,
  },
  '20': {
    din: true,
    dout: true,
  },
  '21': {
    din: true,
    dout: true,
  },
  '22': {
    din: true,
    dout: true,
  },
  '23': {
    din: true,
    dout: true,
  },
  '24': {
    din: true,
    dout: true,
  },
  '25': {
    din: true,
    dout: true,
  },
  '26': {
    din: true,
    dout: true,
  },
  '27': {
    din: true,
    dout: true,
  },
  '28': {
    din: true,
    dout: true,
  },
  '29': {
    din: true,
    dout: true,
  },
  '30': {
    din: true,
    dout: true,
  },
  '31': {
    din: true,
    dout: true,
  },
  '32': {
    din: true,
    dout: true,
  },
  '33': {
    din: true,
    dout: true,
  },
  '34': {
    din: true,
    dout: true,
  },
  '35': {
    din: true,
    dout: true,
  },
  '36': {
    din: true,
    dout: true,
  },
  '37': {
    din: true,
    dout: true,
  },
  '38': {
    din: true,
    dout: true,
  },
  '39': {
    din: true,
    dout: true,
  },
  '40': {
    din: true,
    dout: true,
  },
  '41': {
    din: true,
    dout: true,
  },
  '42': {
    din: true,
    dout: true,
  },
  '43': {
    din: true,
    dout: true,
  },
  '44': {
    din: true,
    dout: true,
  },
  '45': {
    din: true,
    dout: true,
  },
  '46': {
    din: true,
    dout: true,
  },
  '47': {
    din: true,
    dout: true,
  },
};

function readDigital(pin) {  // {{{2
  Loggger.todo('RPI READ DIGITAL', pin.index);
};

function setupDout(pin) {  // {{{2
  console.log('RPI SETUP DOUT', pin.index);

  pin.gpio = new Gpio(pin.index, 'out');
  //  result.gpio.watch(onUpdate.bind(this, result));
};

function writeDout(pin, value) {  // {{{2
  console.log('RPI WRITE DOUT', pin.index, value);

  pin.gpio.write(value, function(err, val) {
    if (err || (val !== value)) {
      M.log.unhandled('GPIO write error!', {rpi: pin.pins.master.identify(), pin: pin.index, value: value});
    } else {
      M.log.missing('Listen to pin state changes.');
//      pin.onChange(pin.pinsthat, pin, val);
//      deviceDigital(that, pin.index, val);
    }
  });

  return;
};

// }}}1
/* OBSOLETE {{{1
exports.registerDout = function(index, slave, onChange) {  // {{{2
  console.log('RPI REGISTER DOUT', index, slave.identify());

  var result = this.pins.register(index, onChange);
  result.entry = slave;
  result.gpio = new Gpio(index, 'out');
  //  result.gpio.watch(onUpdate.bind(this, result));
  result.write = writeDout.bind(null, this, result);

  var state = {};
  state[index] = {
    type: 'dout',
    slave: slave.identify(),
  };
  this.setState({pins: state});

//  result.gpio.read();
//  TODO M.log.unhandled('read pin state and write it to "rpi.state.pins"');

  return result;
};

exports.registerDin = function(pin, slave, params) {  // {{{2
  // @pin: Index of GPIO pin, integer (0 - 47)

  var result = this.pins.get(pin);
  result.gpio = new Gpio(data.index, 'in');

  return result;
  // TODO: read pin state and write it to "rpi.state.pins".
};

// }}}1 */
