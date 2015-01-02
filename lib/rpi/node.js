'use strict';

var Ose = require('ose');
var M = Ose.module(module);
var C = M.consts;

var Pins = M.class('ose-control/lib/pin/list');
var Gpio = require('onoff').Gpio;

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  entry.data.pins = RpiPins;

  entry.pins = new Pins(entry, PinTypes, RpiPins);
  entry.on('remove', onRemove.bind(entry));
};

// }}}1
// Private {{{1
var PinTypes = {  // {{{2
  din: {
    read: readGpio,
    setup: setupDin,
    release: releaseGpio,
  },
  dout: {
    read: readGpio,
    write: writeDout,
    setup: setupDout,
    release: releaseGpio,
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

function readGpio(pin) {  // {{{2
  pin.gpio.read(function(err, val) {
    if (err) {
      M.log.error(err);
    } else {
      pin.send(val);
    }
  });
};

function setupDin(pin, req, state, resp, cb) {  // {{{2
  var start = new Date().getTime();

  setup();

  function setup() {  // {{{3
    try {
      pin.gpio = new Gpio(pin.index, 'in', 'both');
    } catch (err) {
      if ((err.code === 'EACCES') && ((new Date().getTime() - start) < C.gpioRetryTime)) {
        setTimeout(setup(), C.gpioRetryTimeout);
        return;
      }

      cb(err);
      return;
    }

    pin.gpio.read(read);
    return;
  }

  function read(err, val) {  // {{{3
    if (err) {
      cb(err);
      return;
    }

    pin.send(val);

    watch(pin);

    cb();
    return;
  };

  // }}}3
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
  var start = new Date().getTime();

  setup();

  function setup() {
    try {
      pin.gpio = new Gpio(pin.index, 'out');
    } catch (err) {
      if ((err.code === 'EACCES') && ((new Date().getTime() - start) < C.gpioRetryTime)) {
        setTimeout(setup(), C.gpioRetryTimeout);
        return;
      }

      cb(err);
      return;
    }

    cb();
    return;
  }
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

function onRemove() {  // {{{2
  // `this` is bound to entry

  if (this.pins) {
    var p = this.pins;
    delete this.pins;
    p.removeAll();
  }
};

function releaseGpio(pin) {  // {{{2
  pin.gpio.unexport;
  delete pin.gpio;
};

// }}}1
