'use strict';

var Ose = require('ose');
var List = require('ose-control/lib/pin/bb/list');

// Public
exports.profile = {  // {{{2
  name: {
    place: 'caption',
    required: true
  }
};

exports.updateState = function(state) {  // {{{2
  if (state.pins) List.updatePins(this, state.pins);
};

// }}}1

/*
exports.displayLayout = function() {
  var that = this;

  // TODO: This is a bad approach.
  this.entry.shard.getEntry({id: 'camera0'}, function(err, entry) {
    if (err) {
      M.log.unhandled('Entry error.', err);
    } else {
      that.$('list').append(
        $('<li>').append([
          $('<p>').text('Camera')
        ])
        .on('click', onTapCamera.bind(that))
      );
    }
  });
};

function onTapCamera(ev) {
  Ose.ui.newPage(
    {
      bit: 'detail',
      entry: 'camera0',
      space: this.entry.shard.space.name,
      shard: this.entry.shard.sid,
    },
    null,
    ev.ctrlKey
  );

  console.log('displayLayout: ', this.entry.camera);
}
*/

