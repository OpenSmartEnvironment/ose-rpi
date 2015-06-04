'use strict';

var O = require('ose');

exports.displayLayout = function() {
/*
  this.$().append([
    $('<aside>').append(
      $('<img>', {
        class: 'icon',
        alt: 'logo',
        src: 'ose-control/lib/rpi/bb/Raspberry_Pi_Logo.jpg'
      })
    ),
    $('<p>').text(this.entry.dval.name)
  ]);

  this.entry.sendAction({getSystemInfo: 'uptime'});
*/
};

exports.updateState = function(state) {
/*
  if (! this.$().find('p.state').length) {
    this.$().append(
      $('<p>', {'class': 'state'})
    );
  }

  var p = this.$(' p.state');

  for (var key in state) {
    switch(key) {
      case 'uptime':
        p.text(state[key]);
        break;
    }
  }
*/
}
