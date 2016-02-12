'use strict';

const O = require('ose')(module)
  .singleton('ose/lib/kind')
  .prepend('node')
;

exports = O.init('control', 'raspicam');

/** Docs {{{1
 * @module rpi
 */

/**
 * @caption Raspberry Pi camera kind
 *
 * @readme
 * [Entry kind] describing Raspberry Pi cameras. It uses the raspicam
 * npm package to take pictures.
 *
 * @kind raspicam
 * @class rpi.lib.camera
 * @extend ose.lib.kind
 * @type singleton
 */

// Public {{{1
exports.role = ['streamer', 'image', 'camera'];

exports.ddef = O.new('ose/lib/field/object')()  // {{{2
  .text('alias')  // {{{3
    .detail(11)
    .parent

  .text('name')  // {{{3
    .detail('header')
    .parent

  .entry('parent')  // {{{3
    .detail(12)
    .parent

  .integer('camera')  // {{{3
    .detail(13)
    .parent

  .shard('save')  // {{{3
    .detail(14)
    .parent

  // }}}3
;

exports.sdef = O.new('ose/lib/field/object')()  // {{{2
  .text('last')  // {{{3
    .detail(2, lastDetail)
    .parent

  // }}}3
;

// Private {{{1
function lastDetail(view, wrap) {  // {{{2
  view.li().button('text', 'Take picture', function(ev) {
    view.post('still');
    return false;
  });

  view.li().stub('img');

  wrap.on('patch', function(patch) {
    if (! patch) return;

    return view.entry.shard.space.findShard(view.entry.dval.save.shard, function(err, shard) {
      if (err) return O.log.error(err);

      return shard.read(patch, function(err, stream) {
        if (err) return O.log.error(err);

        var bs = O.new('blob-stream')();

        stream.on('error', O.log.bindError(view));
        stream.on('end', function() {
          view.find('li > img')
            .attr('src', bs.toBlobURL())
            .show()
          ;
        });
        return stream.pipe(bs);
      });
    });
  });
}

/* CHECK {{{1
function onTapVideo() {  // {{{2
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

function resizeImage() {  // {{{2
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

exports.updateState = function(state) {  // {{{2
  var image = $('#' + this.id + 'image');

  if (state.lastStill) {
    image
    .attr('src', state.lastStill)
    .load(function () { // This is probably the wrong way of doing this. There are special plugins for this purpose.
      O._.defer(function() {
        image.fadeIn()
      })
    });
  }

  // TODO
  //resizeImage.call(this);
  //$(window).resize(resizeImage.bind(this));
};

}}}1*/
