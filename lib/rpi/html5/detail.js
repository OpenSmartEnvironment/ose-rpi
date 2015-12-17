'use strict';

var O = require('ose');
var List = require('ose-control/lib/pin/html5/list');

exports.profile = {
  name: {
    place: 'caption',
    required: true
  },
};

exports.updateState = function(patch) {
  if (patch.pins) List.updatePins(this, patch.pins, this.entry.sval.pins);
};

