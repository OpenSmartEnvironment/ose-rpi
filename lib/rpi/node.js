'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var Pins = M.class('ose-control/lib/pin/list');
var Gpio = require('onoff').Gpio;

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.data.pins = RpiPins;

  entry.pins = new Pins(entry, PinTypes, RpiPins);
};

// }}}1
// Private {{{1
var PinTypes = {  // {{{2
  din: {
    read: readDigital,
    setup: setupDin,
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
  pin.gpio.read(function(err, val) {
    if (err) {
      M.log.error(err);
    } else {
      pin.send(val);
    }
  });
};

function setupDin(pin, req, state, resp, cb) {  // {{{2
  pin.gpio = new Gpio(pin.index, 'in', 'both');

  pin.gpio.read(function(err, val) {
    if (err) {
      cb(err);
      return;
    }

    pin.send(val);

    watch(pin);

    cb(null);
    return;
  });
};

function watch(pin) {  // {{{2
  pin.gpio.watch(function(err, val) {
    if (err) {
      M.log.error(err);
    } else {
      pin.send(val);
    }
  });
};

function setupDout(pin, req, state, resp, cb) {  // {{{2
  pin.gpio = new Gpio(pin.index, 'out');

  cb();
};

function writeDout(pin, value) {  // {{{2
  pin.gpio.write(value, function(err) {
    if (err) {
      M.log.error(err);
    } else {
      pin.send(value);
    }
  });

  return;
};

// }}}1
