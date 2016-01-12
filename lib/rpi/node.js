'use strict';

var O = require('ose').module(module);

var Consts = O.consts('control');
var Gpio = require('onoff').Gpio;

// Public {{{1
exports.homeInit = function(entry) {  // {{{2
  O.new('ose-control/lib/pin/list')
    (entry, Types, Pins, entry.dval.dummy)
  ;
};

// }}}1
// Private {{{1
var Types = {  // {{{2
  din: {
    setup: setupDin,
    release: releaseGpio,
    read: readGpio,
  },
  dout: {
    setup: setupDout,
    release: releaseGpio,
    read: readGpio,
    write: writeGpio,
  }
};

var Pins = {  // {{{2
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

function setupDin(pin, cb) {  // {{{2
  setupGpio(pin, 'in', 'both', function(err, val) {
    if (err) {
      cb(err);
      return;
    }

    watch(pin);
    cb(null, val);
    return;
  });
}

function setupDout(pin, cb) {  // {{{2
  setupGpio(pin, 'out', 'none', cb);
}

function setupGpio(pin, direction, edge, cb) {  // {{{2
  var start = Date.now();

  setup();

  function setup() {  // {{{3
    try {
      pin.gpio = new Gpio(pin.index, direction, edge);
    } catch (err) {
      if ((err.code === 'EACCES') && ((Date.now() - start) < Consts.gpioRetryTime)) {
        setTimeout(setup, Consts.gpioRetryTimeout);
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

    cb(null, val);
    return;
  };

  // }}}3
}

function readGpio(pin, cb) {  // {{{2
  pin.gpio.read(cb);
};

function writeGpio(pin, val, cb) {  // {{{2
//  console.log('RPI GPIO WRITE', pin.index, val);

  pin.gpio.write(val, function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null, val);
    }
  });
};

function watch(pin) {  // {{{2
  pin.gpio.watch(function(err, val) {
    if (err) {
      O.log.error(err);
    } else {
      pin.update(val);
    }
  });
};

function releaseGpio(pin, cb) {  // {{{2
  if (pin.gpio) {
    pin.gpio.unexport();
    delete pin.gpio;
  }

  cb();
};

// }}}1
