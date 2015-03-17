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

exports.updateState = function(state) {  // {{{2
  if (state.pins) List.updatePins(this, state.pins, this.entry.state.pins);
};

// }}}1
