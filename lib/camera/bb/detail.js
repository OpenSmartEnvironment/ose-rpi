'use strict';

var Ose = require('ose');
var M = Ose.module(module);

var BlobStream = require('blob-stream');

// Public {{{1
exports.profile = {  // {{{2
  name: {
    place: 'caption',
    required: true
  }
};

exports.updateStateKey = function(key, value) {  // {{{2
  switch (key) {
  case 'last':
    displayImage(this, this.entry.state.last);
    break;
  }
};

exports.displayLayout = function() {  // {{{2
  this.$().append([
    '<br>',
    $('<button>', {'class': 'recommend'}).text('Capture image')
    .on('click', onTapStill.bind(this)),
  ]);

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
    .appendTo(this.$())
  ;
};

// }}}1
// Private {{{1
function onTapStill() {  // {{{2
  var that = this;
  var progress = $('<progress>')
    .appendTo(this.$())
  ;

  this.$('image').hide();

  this.post('still', null, function(err, resp) {
    progress.remove();

    if (err) {
      M.log.error(err);
    }
  });
};

function displayImage(that, id) {  // {{{2
  if (! id) {
    return;
  }

  that.entry.shard.findShard(id, function(err, shard) {
    if (err) {
      M.log.error(err);
      return;
    }

    shard.readStream(id.entry, function(err, stream) {
      if (err) {
        M.log.error(err);
        return;
      }

      var bs = new BlobStream();

      stream.on('error', function() {console.log('STREAM ERROR')});
      stream.on('end', function() {
        that.$('image')
          .attr('src', bs.toBlobURL())
          .show()
        ;
      });
      stream.pipe(bs);

      return;
    });
    return;
  });
  return;
};

// }}}1




/* COMMENTS {{{1
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
      Ose._.defer(function() {
        image.fadeIn()
      })
    });
  }

  // TODO
  //resizeImage.call(this);
  //$(window).resize(resizeImage.bind(this));
};

*/
