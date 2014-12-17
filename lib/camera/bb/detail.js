'use strict';

var Ose = require('ose');
var M = Ose.module(module);

// Public
exports.profile = {
  name: {
    place: 'caption',
    required: true
  }
};

exports.displayLayout = function() {
  this.$().append([
    '<br>',
    $('<button>', {'class': 'recommend'}).text('Capture image')
    .on('click', onTapStill.bind(this)),
    //$('<button>').text('Capture video')
    //.on('click', onTapVideo.bind(this)),
    //$('<img src="/ose-rpi/camera.mjpg"/>')
    /*$('<video controls autoplay><source src="/ose-rpi/vid.mp4" type="video/mp4"></video>')*/
  ]);

  this.$().append($('<div>')
    .append(
      $('<img>', {
        id: this.id + 'image',
        'class': 'still'
      })
      .css({
        display: 'block',
        'margin-left': 'auto',
        'margin-right': 'auto'
      })
      .hide()
    )
  );
};

exports.updateState = function(state) {
  var image = $('#' + this.id + 'image');

  if (state.lastStill) {
    image
    .attr('src', state.lastStill)
    .load(function () { // This is probably the wrong way of doing this. There are special plugins for this purpose.
      Ose._.defer(function() {
        image.fadeIn()
      })
    });
  }

  // TODO
  //resizeImage.call(this);
  //$(window).resize(resizeImage.bind(this));
};

function onTapStill() {
  var progress = $('<progress>');

  this.$().append(progress);

  this.action('still', null, function(err, resp) {
    if (err) {
      M.log.unhandled('Camera response error: ', err);
    } else {
      $('img.still')
        .attr('src', resp.uri)
        .show()
      ;

      progress.remove();
    }
  });
};

/*
function onTapVideo() {
//  this.entry.sendAction({'video': {}});

  var el = $('<video controls><source src="/ose-rpi/' + this.entry.id + '.mp4" type="video/mp4"></video>');

  var el0 = this.$('').find('video');

  if (el0.length === 0) {
    this.$('').append(el); 
  } else {
    el0.replaceWith(el);
  }

//  el[0].load();
//  el[0].play();
};
*/

function resizeImage() {
  var image = $('#' + this.id + 'image');
  var mainSection = $('section[role="main"]');
  var availableHeight = mainSection.height();
  var availableWidth = mainSection.width();
  var imageHeight;
  var imageWidth;

  if (availableHeight < availableWidth) {
    imageHeight = 0.75 * availableHeight;
    imageWidth = 0.75 * availableHeight * 1.333;
  } else {
    imageWidth = 0.75 * availableWidth;
    imageHeight = 0.75 * availableWidth * 0.667;
  }

  image
    .attr('width', imageWidth)
    .attr('height', imageHeight)
  ;
};

