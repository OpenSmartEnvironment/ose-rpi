'use strict';

const O = require('ose')(module);

var Kind = require('./index');

var Path = require('path');
var Process = require('child_process');
var Raspicam = require('raspicam');

// Public {{{1
Kind.on('still', function(req, socket) {  // {{{2
  var e = this.entry;

  if (! e.save) {
    O.link.error(socket, O.error(e, 'Save path was not specified.'));
    return;
  }

  var file = 'raspistill_' + Date.now() + '.png'

  var camera = new Raspicam({
    mode: 'photo',
    e: 'png',
    vf: true,
    hf: true,
    output: e.save.root + e.save.path + file,
  });

  camera.on('read', function onStill(err, ts, filename) {
    if (filename === file) {
      var id = e.save.path + '/' + file;

      e.setState({last: id});

      if (socket && O.link.canClose(socket)) {
        O.link.close(socket, {img: id});
      }
      socket = null;
    }
  });

  camera.on('error', function(err) {
    if (socket) {
      if (O.link.canClose(socket)) {
        O.link.error(socket, err);
      }
      socket = null;
    } else {
      O.log.error(err);
    }
  });

  camera.start();
  return;
});

exports.homeInit = function(entry) {  // {{{2
  if (entry.dval.save) {
    entry.shard.afterHome(function() {
      setupPaths(entry);
    });
  }
};

// Private {{{1
function setupPaths(entry) {  // {{{2
  if (! entry.dval.save.shard) {
    return done(entry.dval.save.root, entry.dval.save.root);
  }

  return entry.shard.space.findShard(entry.dval.save.shard, function(err, shard) {
    if (err) {
      O.log.error(err);
      return;
    }

    done(
      entry.dval.save.root || shard.root,
      entry.dval.save.path,
      shard
    );
    return;
  });

  function done(root, path, shard) {  // {{{3
    if (root) {
      if (root.charAt(root.length - 1) !== '/') {
        root += '/';
      }
    } else {
      root = '/';
    }

    entry.save = {root: root};

    if (shard) {
      entry.save.shard = shard;
    }

    if (path) {
      path = Path.normalize(path).split('/');
      while (path.length && ! path[0]) {
        path.shift();
      }
      while (path.length && ! path[path.length - 1]) {
        path.pop();
      }
      path.push('');
      entry.save.path = path.join;
    } else {
      entry.save.path = '';
    }
  }

  // }}}3
};

/* CHECK {{{1
function onVideo(req, resp, params) {  // {{{2
  var that = this;

  console.log('REQUEST', req.method, req.headers);

  resp.writeHead(200, {'Content-type': 'video/mp4'});

  if (req.method !== 'GET') {
    return;
  }

  readCam(this, function(err, stream) {
    if (err) {
      O.log.unhandled('READ CAMERA ERROR', err);
      return;
    }

    console.log('STREAMING ....');
    stream.pipe(resp);

    new Transcoder(stream)
//      .maxSize(320, 240)
      .videoCodec('h264')
      .videoBitrate(800 * 1000)
      .fps(25)
//      .audioCodec('libfaac')
//      .sampleRate(44100)
//      .channels(2)
//      .audioBitrate(128 * 1000)
      .format('mp4')
      .on('error', O.log.bind('error', 'Transcoder error'))
      .on('finish', function() {
        console.log('TRANSCODER FINISHED', arguments);
//          next();
      })
      .stream().pipe(resp)
    ;

    resp.on('close', function() {
      console.log('RESPONSE CLOSED');
      stream.unpipe(resp);
      resp.end();

      that.camPs && that.camPs.kill();
    });
    return;
  });

  return;
}

function onMjpg(req, resp, params) {  // {{{2
  resp.writeHead(200, {'Content-type': 'multipart/x-mixed-replace'/*'image/jpg'* /});

  if (req.method !== 'GET') {
    return;
  }

  readCam(this, function(err, stream) {
    if (err) {
      O.log.unhandled('READ CAMERA ERROR', err);
      return;
    }

    stream.pipe(resp);

    return;
  })

  return;
};

function readCam(that, cb) {  // {{{2
  if (! that.camPs) {
    var args = [
      '--timeout', 15000,
      '--width', 320,
      '--height', 240,
      '--bitrate', 800 * 1000,
      '--framerate', 25,
      '--vflip',
//      '-o', '/tmp/fifo.h264',
      '-o', '-'
    ];

    console.log('SPAWNING raspivid', args.join(' '));
    that.camPs = Process.spawn('raspivid', args);

    that.camPs.stderr.setEncoding('utf8');
    that.camPs.stderr.on('data', function() {
      console.log('STDERR raspivid', arguments);
    });

    that.camPs.on('exit', function() {
      console.log('... raspivid DONE')
      delete that.camPs;
    });

    args = [  // MP4
      'y',
      '-i', '/tmp/fifo.h264',
      '-vcodec', 'copy',
      '-an',
      '-f', 'mp4'
      //Output
    ];

    args = [  // MPEG-TS
      '-i', 'pipe:0',
      '-vcodec', 'copy',
      '-f', 'mpegts',
      'pipe:1'
    ];

    args = [  // MJPG
      '-i', 'pipe:0',
//      '-vcodec', 'copy',
      '-qscale', '1',
      '-f', 'mjpeg',
      'pipe:1'
    ];

    console.log('SPAWNING ffmpeg', args.join(' '));
    that.ffPs = Process.spawn(
      'ffmpeg',
      args,
      {
        env: {
          LD_LIBRARY_PATH: '/usr/local/lib'
        }
      }
    );

    that.ffPs.stderr.setEncoding('utf8');
    that.ffPs.stderr.on('data', function() {
      console.log('STDERR ffmpeg', arguments);
    });

    that.ffPs.on('exit', function() {
      console.log('... ffmpeg DONE')
      delete that.ffPs;
    });

    that.camPs.stdout.pipe(that.ffPs.stdin);

    cb(null, that.ffPs.stdout);
  } else {
    cb(null, that.camPs.stdout);
  }
};

function readCam2(that, cb) {  // {{{2
  if (! that.camPs) {
    var args = [
      '--timeout', 15000,
      '--width', 320,
      '--height', 240,
      '--bitrate', 800 * 1000,
      '--framerate', 25,
      '-o', '/tmp/fifo.h264',
  //    '-o -',
    ];

    console.log('SPAWNING raspivid', args.join(' '));
    that.camPs = Process.spawn('raspivid', args);

    that.camPs.stderr.setEncoding('utf8');
    that.camPs.stderr.on('data', function() {
      console.log('STDERR', arguments);
    });

    that.camPs.on('exit', function() {
      console.log('... raspivid DONE')
      delete that.camPs;
    });

    setTimeout(function() {
      args = [  // MP4
        '-i', '/tmp/fifo.h264',
        '-vcodec', 'copy',
        '-an',
        '-f', 'mp4',
        'pipe:1'
      ];

      args = [  // MPEG-TS
        '-i', '/tmp/fifo.h264',
        '-vcodec', 'copy',
        '-f', 'mpegts',
        'pipe:1'
      ];

      console.log('SPAWNING ffmpeg', args.join(' '));
      that.ffPs = Process.spawn(
        'ffmpeg',
        args,
        {
          env: {
            LD_LIBRARY_PATH: '/usr/local/lib'
          }
        }
      );

      that.ffPs.stderr.setEncoding('utf8');
      that.ffPs.stderr.on('data', function() {
        console.log('STDERR', arguments);
      });

      that.ffPs.on('exit', function() {
        console.log('... ffmpeg DONE')
        delete that.ffPs;
      });

      cb(null, that.ffPs.stdout);
    }, 5000);
  } else {
    cb(null, that.camPs.stdout);
  }
};

}}}1 */
