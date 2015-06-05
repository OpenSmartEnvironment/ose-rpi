'use strict';

var O = require('ose');
var List = require('ose-control/lib/pin/gaia/list');

// Public
exports.profile = {  // {{{2
  name: {
    place: 'caption',
    required: true
  }
};

exports.updateState = function(patch) {  // {{{2
  if (patch.pins) List.updatePins(this, patch.pins, this.entry.sval.pins);
};

// }}}1
